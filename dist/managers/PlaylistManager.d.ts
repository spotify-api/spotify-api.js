import Playlist, { PlaylistTrackType } from "../structures/Playlist";
import { Image, Paging, PagingOptions, SearchOptions, SpotifyURI } from "../Types";
import { CreatePlaylist } from "../UserClient";
import BaseManager from "./BaseManager";
/**
 * Object structure to reorder items in a playlist!
 */
export interface ReorderOptions {
    rangeStart?: number;
    insertBefore?: number;
    rangeLength?: number;
    snapshotID?: string;
}
/**
 * A class which manages the playlists
 */
export default class PlaylistManager extends BaseManager {
    /**
     * Search playlists!
     *
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.playlists.search('some query');
     */
    search(query: string, options?: Omit<SearchOptions, 'type'>): Promise<Paging<Playlist>>;
    /**
     * Get a spotify playlist information by spotify id!
     *
     * @param id Spotify playlist id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where the data needs to be fetched from
     * @example await client.playlists.get('id');
     */
    get(id: string, force?: boolean, market?: string): Promise<Playlist | null>;
    /**
     * Return all the tracks of the spotify playlist!
     *
     * @param id The id of the playlist
     * @param options Basic PagingOptions
     * @example await client.playlists.getTracks('id');
     */
    getTracks(id: string, options?: PagingOptions): Promise<Paging<PlaylistTrackType>>;
    /**
     * Returns the images of the playlists!
     *
     * @param id ID of the playlist
     * @example client.playlists.getImages(id);
     */
    getImages(id: string): Promise<Image[]>;
    /**
     * Verify if many or some user follows a playlist!
     *
     * @param playlistID Spotify playlist id
     * @param ids Array of user ids to verify
     * @example const [firstUserFollows, secondUserFollows] = await client.playlists.userFollows('playlist_id', 'userid1', 'userid2');
     */
    userFollows(playlistID: string, ...ids: string[]): Promise<boolean[]>;
    /**
     * Follow a playlist!
     *
     * @param id ID of the spotify playlist
     * @param options Options consisting of public field
     * @example await client.playlists.follow('id');
     */
    follow(id: string, options?: {
        public?: boolean;
    }): Promise<boolean>;
    /**
     * Unfollow a playlist!
     *
     * @param id ID of the spotify playlist
     * @example await client.playlists.unfollow('id');
     */
    unfollow(id: string): Promise<boolean>;
    /**
     * Verify if the current user follows a playlist
     *
     * @param id ID of the spotify playlist
     * @example const followsPlaylist = await client.playlists.follows('id');
     */
    follows(id: string): Promise<boolean>;
    /**
     * Create a spotify playlist for yourself or for the current user!
     *
     * @param options Options to create a playlist!
     * @example await client.playlists.create({
     *     name: 'Funky playlist',
     *     description: 'My own cool playlist created by spotify-api.js',
     *     public: true,
     *     collaborative: false,
     *     userID: client.user.id // By default will be the current user id!
     * });
     */
    create(options: CreatePlaylist): Promise<Playlist | null>;
    /**
     * Edit a spotify playlist using id
     *
     * @param id ID of the spotify playlist
     * @param options CreatePlaylist object but userID field should not be provided!
     * @example await client.playlists.edit('id', {
     *     description: 'Edited new description'
     * });
     */
    edit(id: string, options: Omit<CreatePlaylist, 'userID'>): Promise<boolean>;
    /**
     * Add items to the playlist!
     *
     * @param id ID pf the spotify playlist
     * @param items Array of uris of the spotify episodes or spotify tracks to add to the playlist
     * @param options Options containing position field
     * @example await client.playlists.addItems('id', ['spotify:track:id']);
     */
    addItems(id: string, items: SpotifyURI[], options?: {
        position?: number;
    }): Promise<string | null>;
    /**
     * Reorder items of the playlist!
     *
     * @param id ID of the spotify playlist
     * @param options ReorderOptions of spotify playlist!
     * @example await client.playlists.reorderItems('id', ['spotify:track:id'], {
     *     insertBefore: 10
     * })
     */
    reorderItems(id: string, items: SpotifyURI[], options?: ReorderOptions): Promise<string | null>;
    /**
     * Remove items from the playlist!
     *
     * @param id ID of the spotify playlist
     * @param items Array of spotify uris of tracks and episodes to remove from the playlist!
     * @param snapshotID The playlist’s snapshot ID against which you want to make the changes.
     * @example await client.playlists.removeItems('id', ['spotify:track:id']);
     */
    removeItems(id: string, items: SpotifyURI[], snapshotID?: string): Promise<string | null>;
    /**
     * Upload a custom image to the playlist!
     *
     * @param id ID of the spotify playlist
     * @param image Image data url of image/jpeg to upload!
     * @example await client.playlists.uploadImage('id', 'data:image/jpeg;base64,/......');
     */
    uploadImage(id: string, image: string): Promise<boolean>;
}
export type { Playlist };
