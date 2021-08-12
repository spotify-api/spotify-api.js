import type { Client } from "../Client";
import type { Playlist } from "../structures/Playlist";
import type { CreatePlaylistQuery } from "api-types";
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
     * Get a spotify playlist information by spotify id!
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
     * Create a playlist for a user.
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
    public edit(id: string, playlist: Partial<CreatePlaylistQuery>): Promise<void> {
        return this.client.fetch(`/playlists/${id}`, {
            method: 'PUT',
            params: playlist
        });
    }

}