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
    addedAt: string | null;
    addedBy: PublicUser | null;
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
     * Full info of the track
     * @readonly
     */
    get track(): Track | Episode;
}
export default PlaylistTrack;
