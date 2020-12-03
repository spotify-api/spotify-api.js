/**
 * Playlist Utility Structures
 */
import Track from "./Track";
import PublicUser from "./PublicUser";
import Episode from "./Episode";
import { CodeImageReturn } from "./Interface";
/**
 * PlaylistTrack class
 */
export declare class PlaylistTrack {
    data: any;
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
     */
    constructor(data: any);
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
 * Public User Class
 */
export declare class PlaylistOwner {
    data: any;
    displayName: string;
    externalUrls: any;
    href: string;
    id: string;
    type: string;
    uri: string;
    codeImage: string;
    /**
     * **Example:**
     *
     * ```js
     * const user = new PlaylistOwner(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data: any);
    /**
     * Returns the code image with dominant color
     */
    getCodeImage(): Promise<CodeImageReturn>;
    /**
     * Returns the uri data
     */
    getURIData(): Promise<any>;
}
