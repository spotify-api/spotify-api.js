/**
 * Playlist Related Structures
 */
import { Image } from "./Interface";
import User from "./User";
import Track from "./Track";
import Episode from "./Episode";
import Client from "../Client";
/**
 * Spotify Api's Playlist Track Object
 * This is a extended form object used in playlist's tracks!
 */
export declare class PlaylistTrack {
    readonly data: any;
    readonly client: Client;
    addedAt: string | null;
    local: boolean;
    /**
     * **Example:**
     *
     * ```js
     * const track = new PlaylistTrack(data, client);
     * ```
     *
     * @param data Received raw data from the spotify api
     * @param client Spotify Client
     */
    constructor(data: any, client: Client);
    /**
     * Returns a Spotify User who added this track to the playlist! If no one did, will return null!
     * @readonly
     */
    get addedBy(): User | null;
    /**
     * Full info of the track!
     * @readonly
     */
    get track(): Track | Episode;
}
/**
 * Spotify Api's Playlist Object
 */
export default class Playlist {
    readonly data: any;
    readonly client: Client;
    collaborative: boolean;
    description: string;
    externalUrls: any;
    totalFollowers?: number;
    href: string;
    id: string;
    images: Image[];
    name: string;
    public: boolean | null;
    snapshotId: string;
    type: string;
    uri: string;
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
     * @readonly
     */
    get tracks(): PlaylistTrack[];
    /**
     * Returns a code image of the Playlist!
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Refetches the playlist and returns you the new one and updates the cache too!
     */
    fetch(): Promise<Playlist>;
    /**
     * Follows this playlist!
     * Will work only if you have a current user token!
     */
    follow(): Promise<void>;
    /**
     * Unfollows this playlist!
     * Will work only if you have a current user token!
     */
    unfollow(): Promise<void>;
}
