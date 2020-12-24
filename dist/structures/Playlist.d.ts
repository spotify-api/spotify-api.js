/**
 * Playlist class
 */
import { Image } from "./Interface";
import PublicUser from "./PublicUser";
import Track from "./Track";
import Episode from "./Episode";
import Client from "../Client";
export declare class PlaylistTrack {
    readonly data: any;
    readonly client: Client;
    addedAt: string | null;
    local: boolean;
    /**
     * **Example:**
     *
     * ```js
     * const track = new PlaylistTrack(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     * @param client Spotify Client
     */
    constructor(data: any, client: Client);
    /**
     * Added by user object
     * @readonly
     */
    get addedBy(): PublicUser | null;
    /**
     * Full info of the track
     * @readonly
     */
    get track(): Track | Episode;
}
/**
 * Playlist structure
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
    codeImage: string;
    /**
     * **Example:**
     *
     * ```js
     * const playlist = new Playlist(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data: any, client: Client);
    /**
     * Owner user object
     * @readonly
     */
    get owner(): PublicUser;
    /**
     * Returns the array of playlist tracks
     * @readonly
     */
    get tracks(): PlaylistTrack[];
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Returns a fresh playlist without searching in the cache!
     */
    fetch(): Promise<Playlist>;
    /**
     * Follows this playlist
     */
    follow(): Promise<void>;
    /**
     * Unfollows a playlist
     */
    unfollow(): Promise<void>;
}
