/**
 * SimplifiedPlaylist Structure
 */
import { DominantColor, Image } from "./Interface";
import PlaylistTrack from "./PlaylistTrack";
import PlaylistOwner from "./PlaylistOwner";
/**
 * SimplifiedPlaylist class
 */
declare class SimplifiedPlaylist {
    data: any;
    collaborative: boolean;
    description: string | null;
    externalUrls: any;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: PlaylistOwner;
    primaryColor: any;
    public: boolean | null;
    snapshotId: string;
    type: string;
    uri: string;
    totalTracks: number;
    codeImage?: string;
    dominantColor?: DominantColor;
    /**
     * **Example:**
     *
     * ```js
     * const playlist = new SimplifiedPlaylist(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data: any);
    /**
     * Returns an array of simplified tracks
     * @readonly
     */
    get tracks(): PlaylistTrack[];
}
export default SimplifiedPlaylist;
