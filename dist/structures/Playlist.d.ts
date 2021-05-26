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
export interface PlaylistTrackType {
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
export declare function PlaylistTrack(data: any, client: Client): PlaylistTrackType;
/**
 * Spotify Api's Playlist Object
 */
export default class Playlist {
    readonly data: any;
    readonly client: Client;
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
    constructor(data: any, client: Client);
    /**
     * Returns the Spotify User who created the playlist!
     * @readonly
     */
    get owner(): User;
    /**
     * Returns the total tracks of playlist in the form of array of PlaylistTracks!
     * Will return an PlaylistTrackRef object if a simplified playlist has been supplied!
     * @readonly
     */
    get tracks(): Paging<PlaylistTrackType> | PlaylistTracksRef;
    /**
     * Fetches playlist and refreshes the cache!
     *
     * @example playlist.fetch();
     */
    fetch(): Promise<Playlist>;
    /**
     * Returns the images of the playlist!
     *
     * @example playlist.getImages();
     */
    getImages(): Promise<Image[]>;
    /**
     * Returns all the tracks of the playlist!
     *
     * @param options Options such as limit and offset
     * @example playlist.getTracks()
     */
    getTracks(options?: PagingOptions): Promise<Paging<PlaylistTrackType>>;
    /**
     * Returns a code image of the Playlist!
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Follow a playlist inshort words add the playlist to your library!
     *
     * @param options Options such as public
     * @example await playlist.follow();
     */
    follow(options?: {
        public?: boolean;
    }): Promise<boolean>;
    /**
     * Unfollow a playlist!
     *
     * @example await playlist.unfollow();
     */
    unfollow(): Promise<boolean>;
    /**
     * Verify if many or some user follows a playlist!
     *
     * @param playlistID Spotify playlist id
     * @example const follows = await client.playlists.userFollows('userid1', 'userid2');
     */
    userFollows(...ids: string[]): Promise<boolean>;
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
    edit(options?: Omit<CreatePlaylist, 'userID'>): Promise<this | false>;
    /**
     * Add items to the playlist!
     *
     * @param items Array of uris of the spotify episodes or spotify tracks to add to the playlist
     * @param options Options containing position field
     * @example await playlists.add(['spotify:track:id']);
     */
    add(items: SpotifyURI[], options?: {
        position?: number;
    }): Promise<string | null>;
    /**
     * Reorder items of the playlist!
     *
     * @param options ReorderOptions of spotify playlist!
     * @example await playlist.reorder(['spotify:track:id'], {
     *     insertBefore: 10
     * })
     */
    reorder(items: SpotifyURI[], options?: ReorderOptions): Promise<string | null>;
    /**
     * Remove items from the playlist!
     *
     * @param items Array of spotify uris of tracks and episodes to remove from the playlist!
     * @param snapshotID The playlist’s snapshot ID against which you want to make the changes.
     * @example await playlist.remove(['spotify:track:id']);
     */
    remove(items: SpotifyURI[], snapshotID?: string): Promise<string | null>;
    /**
     * Upload a custom image to the playlist!
     *
     * @param image Image data url of image/jpeg to upload!
     * @example await client.playlists.uploadImage('id', imageDataUri); // Make sure the URI isn't prepended by 'data:image/jpeg;base64,'
     */
    uploadImage(image: string): Promise<boolean>;
}
