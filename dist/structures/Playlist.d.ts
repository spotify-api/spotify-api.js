/**
 * Playlist class
 */
import { PlaylistTrack } from "./PlaylistUtils";
import { CodeImageReturn } from "./Interface";
import PublicUser from "./PublicUser";
/**
 * Playlist structure
 */
export default class Playlist {
    data: any;
    collaborative: boolean;
    description: string;
    externalUrls: any;
    totalFollowers: number;
    href: string;
    id: string;
    images: any[];
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
    constructor(data: any);
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
     * Returns the code image with dominant color
     */
    getCodeImage(): Promise<CodeImageReturn>;
    /**
     * Returns the uri data
     */
    getURIData(): Promise<any>;
}
