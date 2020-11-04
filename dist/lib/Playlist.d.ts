/**
 * Playlist lib file
 */
import Spotify from "../Spotify";
/**
 * Class of all methods related to playlists
 */
declare class Playlist extends Spotify {
    /**
     * @param id Id of the playlist
     *
     * **Example:**
     * ```js
     * const playlist = await spotify.playlists.get("id"); // Get playlist data by id
     * ```
     */
    get(id: string): Promise<any>;
    /**
     * @param id Id of the playlist
     * @param options Options to configure your search
     *
     * **Example:**
     * ```js
     * const tracks = await spotify.playlists.getTracks("id", { limit: 1 }); // Get all tracks in an album by id. Has advanced option too...
     * ```
     */
    getTracks(id: string, options?: {
        limit?: null | string | number;
        advanced?: boolean;
    }): Promise<any>;
    getCoverImage(id: string): Promise<any>;
    follows(id: string, userIds: string[]): Promise<any>;
}
export default Playlist;
