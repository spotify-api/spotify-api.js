import User from './User';
import Track from './Track';
import Episode from './Episode';
import { Image, Paging, PagingOptions, PlaylistTracksRef, RawObject, SpotifyTypes, SpotifyURI } from '../Types';
import Client from '../Client';
import { CreatePlaylist } from '../UserClient';
import { ReorderOptions } from '../managers/PlaylistManager';

/**
 * Return object by PlaylistTrack function!
 */
export interface PlaylistTrackType{
    addedAt: string | null;
    local: boolean;
    readonly addedBy: User | null;
    readonly track: Track | Episode;
}

/**
 * Creates a playlist track object using spotify api data and spotify client!
 * 
 * @param data Raw data from spotify api
 * @param client Your spotify client!
 * @example Spotify.PlaylistTrack(data, client);
 */
export function PlaylistTrack(data, client: Client): PlaylistTrackType {

    return {
        addedAt: data.added_at,
        local: data.is_local,
        get addedBy(): User | null {
            return data.added_by ? new User(data.added_by, client) : null;
        },
        get track(): Track | Episode {
            return data.track.type == 'track' ? new Track(data.track, client) : new Episode(data.track, client);
        }
    }

}

/**
 * Spotify Api's Playlist Object
 */
 export default class Playlist {

    readonly data: any;
    readonly client!: Client;

    collaborative: boolean;
    description: string;
    externalUrls: RawObject;
    href: string;
    id: string;
    images: Image[];
    name: string;
    public: boolean | null;
    snapshotID: string;
    type: SpotifyTypes;
    uri: SpotifyURI;

    totalFollowers?: number;

    /**
     * Spotify Api's Playlist Object
     * 
     * @param data Received raw data from the spotify api
     * @param client Your Spotify Client!
     * @example const playlist = new Playlist(data, client);
     */
    constructor(data: any, client: Client){

        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = data.external_urls;
        this.totalFollowers = data.followers?.total;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.public = data.public;
        this.snapshotID = data.snapshot_id;
        this.type = data.type;
        this.uri = data.uri;

    };

    /**
     * Returns the Spotify User who created the playlist!
     * @readonly
     */
    get owner(): User {
        return new User(this.data.owner, this.client);
    };

    /**
     * Returns the total tracks of playlist in the form of array of PlaylistTracks!
     * Will return an PlaylistTrackRef object if a simplified playlist has been supplied!
     * @readonly
     */
    get tracks(): Paging<PlaylistTrackType> | PlaylistTracksRef {
        return this.data.tracks.items ? {
            limit: this.data.tracks.limit,
            total: this.data.tracks.total,
            offset: this.data.tracks.offset,
            items: this.data.tracks.items.map(x => PlaylistTrack(x, this.client))
        } : this.data.tracks;
    };

    /**
     * Fetches playlist and refreshes the cache!
     * 
     * @example playlist.fetch();
     */
    async fetch(): Promise<Playlist> {
        return await this.client.playlists.get(this.id, true) as Playlist;
    }
    
    /**
     * Returns the images of the playlist!
     * 
     * @example playlist.getImages();
     */
    async getImages(): Promise<Image[]> {
        return await this.client.playlists.getImages(this.id);
    }

    /**
     * Returns all the tracks of the playlist!
     * 
     * @param options Options such as limit and offset
     * @example playlist.getTracks()
     */
    async getTracks(options?: PagingOptions): Promise<Paging<PlaylistTrackType>> {
        return await this.client.playlists.getTracks(this.id, options);
    }

    /**
     * Returns a code image of the Playlist!
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Follow a playlist inshort words add the playlist to your library!
     * 
     * @param options Options such as public
     * @example await playlist.follow();
     */
    async follow(options?: { public?: boolean }): Promise<boolean> {
        return await this.client.user.followPlaylist(this.id, options);
    }

    /**
     * Unfollow a playlist!
     * 
     * @example await playlist.unfollow();
     */
    async unfollow(): Promise<boolean> {
        return await this.client.user.unfollowPlaylist(this.id);
    }

    /**
     * Verify if many or some user follows a playlist!
     * 
     * @param playlistID Spotify playlist id
     * @example const follows = await client.playlists.userFollows('userid1', 'userid2');
     */
    async userFollows(...ids: string[]): Promise<boolean> {
        return (await this.client.playlists.userFollows(this.id, ...ids))[0] || false;
    }

    /**
     * Edit this playlist!
     * 
     * @param options CreatePlaylist options except the userID field.
     * @example
     * // One way to edit
     * playlist.description = "Edited Description";
     * await playlist.edit();
     * 
     * // Another way to edit
     * await playlist.edit({ description: "Edited Description" });
     */
    async edit(options?: Omit<CreatePlaylist, 'userID'>): Promise<this | false> {
        const opts: Required<Omit<CreatePlaylist, 'userID'>> = {
            name: this.name,
            public: this.public || true,
            collaborative: this.collaborative,
            description: this.description
        }

        Object.assign(opts, options || {});
        const success = await this.client.user.editPlaylist(this.id, opts);

        if(success){
            this.name = opts.name;
            this.public = opts.public;
            this.collaborative = opts.collaborative;
            this.description = opts.description;
        } else return false;

        return this;
    }

    /**
     * Add items to the playlist!
     * 
     * @param items Array of uris of the spotify episodes or spotify tracks to add to the playlist
     * @param options Options containing position field
     * @example await playlists.add(['spotify:track:id']);
     */
    async add(items: SpotifyURI[], options?: { position?: number }): Promise<string | null> {
        return await this.client.playlists.addItems(this.id, items, options);
    }

    /**
     * Reorder items of the playlist!
     * 
     * @param options ReorderOptions of spotify playlist!
     * @example await playlist.reorder(['spotify:track:id'], {
     *     insertBefore: 10
     * })
     */
    async reorder(items: SpotifyURI[], options?: ReorderOptions): Promise<string | null> {
        return await this.client.playlists.reorderItems(this.id, items, options);
    }

    /**
     * Remove items from the playlist!
     * 
     * @param items Array of spotify uris of tracks and episodes to remove from the playlist!
     * @param snapshotID The playlist’s snapshot ID against which you want to make the changes.
     * @example await playlist.remove(['spotify:track:id']);
     */
    async remove(items: SpotifyURI[], snapshotID?: string): Promise<string | null> {
        return await this.client.playlists.removeItems(this.id, items, snapshotID);
    }

    /**
     * Upload a custom image to the playlist!
     * 
     * @param image Image data url of image/jpeg to upload!
     * @example await client.playlists.uploadImage('id', imageDataUri); // Make sure the URI isn't prepended by 'data:image/jpeg;base64,'
     */
    async uploadImage(image: string): Promise<boolean> {
        return await this.client.playlists.uploadImage(this.id, image);
    }

};