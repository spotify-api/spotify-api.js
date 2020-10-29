/**
 * Album lib file
 */
import Spotify from "../Spotify";
/**
 * Class of all methods related to albums
 */
declare class Album extends Spotify {
    /**
     * @param q Your query
     * @param options Your options such as limit, advanced, etc
     *
     * **Example:**
     * ```js
     * const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album. Has advanced option too...
     * ```
     */
    search(q: string, options?: {
        limit?: string | null | number;
        advanced?: boolean;
    }): Promise<any>;
    /**
     * @param id Id of the album
     *
     * **Example:**
     * ```js
     * const album = await spotify.albums.get("album id"); // Get album by id...
     * ```
     */
    get(id: string): Promise<any>;
    /**
     * @param id Id of the song
     * @param options Options such as limit and advanced
     *
     * **Example:**
     * ```js
     * const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album. Has advanced option too...
     * ```
     */
    getTracks(id: string, options?: {
        limit?: string | null | number;
        advanced?: boolean;
    }): Promise<any>;
}
export default Album;
