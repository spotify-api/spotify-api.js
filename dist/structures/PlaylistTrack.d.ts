/**
 * PlaylistTrack structure
 */
import Track from "./Track";
import PublicUser from "./PublicUser";
import Episode from "./Episode";
/**
 * PlaylistTrack class
 */
declare class PlaylistTrack {
    data: any;
    addedAt: string;
    addedBy: PublicUser;
    local: boolean;
    track: Track | Episode;
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
}
export default PlaylistTrack;
