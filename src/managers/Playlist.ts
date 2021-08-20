import type { Client } from "../Client";
import type { PlaylistTrack, PlaylistReorderOptions } from "../Interface";
import type { CreatePlaylistQuery, Image } from "api-types";
import { Playlist, createPlaylistTracks } from "../structures/Playlist";
import { Cache, createCacheStruct } from "../Cache";

/**
 * A manager to perform actions which belongs to the spotify playlist web api.
 */
export class PlaylistManager {

    /**
     * A manager to perform actions which belongs to the spotify playlist web api.
     * 
     * @param client The spotify api client.
     * @example const playlists = new PlaylistManager(client);
     */
    public constructor(public client: Client) {}

    /**
     * Get a playlist's information.
     * 
     * @param id The spotify playlist id.
     * @param market Only playlists that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const playlist = await client.playlists.get('id');
     */
    public async get(id: string, market = 'US', force = !this.client.cacheSettings.playlists): Promise<Playlist | null> {
        if (!force && Cache.playlists.has(id)) return Cache.playlists.get(id)!;
        const fetchedData = await this.client.fetch(`/playlists/${id}`, { params: { market } });
        return fetchedData ? createCacheStruct('playlists', this.client, fetchedData) : null;
    }

    /**
     * Get the information of the tracks in the playlist.
     * 
     * @param id The spotify playlist id.
     * @param options The market, limit, offset query paramaters.
     * @example const tracks = await client.playlists.getTracks('id');
     */
    public async getTracks(
        id: string, 
        options: {
            market?: string,
            limit?: number,
            offset?: number
        } = {}
    ): Promise<PlaylistTrack[]> {
        const fetchedData = await this.client.fetch(`/playlists/${id}/tracks`, { params: options });
        return fetchedData ? createPlaylistTracks(this.client, fetchedData.items) : [];
    }

    /**
     * Get the information of the images of the playlist.
     * 
     * @param id The spotify playlist id.
     * @example const images = await client.playlists.getImages('id');
     */
    public async getImages(id: string): Promise<Image[]> {
        return await this.client.fetch(`/playlists/${id}/images`) || [];
    }

    /**
     * Create a playlist for a paticular user.
     * This method requires an user authorized token.
     * 
     * @param userID The spotify user id.
     * @param playlist The playlist details.
     * @example const playlist = await client.playlists.create('id', { name: 'My Playlist' });
     */
    public async create(userID: string, playlist: CreatePlaylistQuery): Promise<Playlist | null> {
        const fetchedData = await this.client.fetch(`/users/${userID}/playlists`, {
            method: 'POST',
            params: playlist
        });

        return fetchedData ? createCacheStruct('playlists', this.client, fetchedData) : null;
    }

    /**
     * Edit a playlist.
     * This method requires an user authorized token.
     * 
     * @param id The playlist id.
     * @param playlist The details of the playlist to edit.
     * @example const playlist = await client.playlists.edit('id', { name: 'Edited playlist' });
     */
    public edit(id: string, playlist: Partial<CreatePlaylistQuery>): Promise<boolean> {
        return this.client.fetch(`/playlists/${id}`, {
            method: 'PUT',
            params: playlist
        }).then(x => x != null);
    }

    /**
     * Add items to the playlist.
     * This method requires an user authorized token.
     * 
     * @param id The spotify playlist id.
     * @param uris The array of track or episodes uris to add.
     * @param position The index position to add those items else will append it at the end of the playlist.
     * @example 
     * const snapshotID = await client.playlists.addItems('playlist id', [myTrack.uri, myAnotherTrack.uri, 'spotify:track:id']);
     */
    public async addItems(id: string, uris: string[], position?: number): Promise<string> {
        const fetchedData = await this.client.fetch(`/playlists/${id}/tracks`, {
            method: 'POST',
            params: { uris: uris.join(','), position }
        });

        return fetchedData ? fetchedData.snapshot_id : '';
    }

    /**
     * Reorder items in the playlist.
     * This method requires an user authorized token.
     * 
     * @param id The spotify playlist id.
     * @param options The options required to reorder items in the playlist.
     * @example 
     * const snapshotID = await client.playlists.reorderItems('playlist id', {
     *     uris: ['spotify:uri:id'],
     *     insertBefore: 2
     * });
     */
    public async reorderItems(id: string, options: PlaylistReorderOptions): Promise<string> {
        const fetchedData = await this.client.fetch(`/playlists/${id}/tracks`, {
            method: 'PUT',
            params: {
                uris: options.uris?.join(','),
                range_start: options.rangeStart,
                range_length: options.rangeLength,
                insert_before: options.insertBefore,
                snapshot_id: options.snapshotID
            }
        });

        return fetchedData ? fetchedData.snapshot_id : '';
    }

    /**
     * Remove items from the playlist.
     * This method requires an user authorized token.
     * 
     * @param id The spotify playlist id.
     * @param uris The array of spotify uris of either track or episodes to remove
     * @param snapshotID The playlist’s snapshot ID against which you want to make the changes.
     * @example const snapshotID = await client.playlists.removeItems('playlist id', { uris: ['spotify:uri:id']  });
     */
    public async removeItems(id: string, uris: string[], snapshotID?: string): Promise<string> {
        const body = {} as any;

        if (snapshotID) body.snapshot_id = snapshotID;
        if (uris) body.uris = uris.map(uri => ({ uri }));

        const fetchedData = await this.client.fetch(`/playlists/${id}/tracks`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body
        });

        return fetchedData ? fetchedData.snapshot_id : '';
    }

    /**
     * Upload custom images to the playlist.
     * This method requires an user authorized token.
     * 
     * @param id The spotify playlist id.
     * @param imageData The imageData should contain a Base64 encoded JPEG image data, maximum payload size is 256 KB.
     * @example await client.playlists.uploadImage('id', 'data:image/jpeg;....');
     */
    public uploadImage(id: string, imageData: string): Promise<boolean> {
        return this.client.fetch(`/playlists/${id}/images`, {
            method: 'PUT',
            headers: { "Content-Type": "image/jpeg" },
            body: imageData as any
        }).then(x => x != null);
    }

    /**
     * Follow the playlist.
     * This method requires an user authorized token.
     * 
     * @param id The spotify playlist id.
     * @param publicly If true, the playlist will be in your list publicly.
     * @example await client.playlists.follow('id');
     */
    public follow(id: string, publicly = true): Promise<boolean> {
        return this.client.fetch(`/playlists/${id}/followers`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: { public: publicly }
        }).then(x => x != null);
    }

    /**
     * Unfollow the playlist.
     * This method requires an user authorized token.
     * 
     * @param id The spotify playlist id.
     * @example await client.playlists.unfollow('id');
     */
    public unfollow(id: string): Promise<boolean> {
        return this.client.fetch(`/playlists/${id}/followers`, { method: 'DELETE' }).then(x => x != null);
    }

}