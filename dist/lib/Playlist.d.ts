/**
 * Playlist lib file
 */
import Spotify from "../Spotify";
/**
 * Class of all methods related to playlists
 */
declare class Playlist extends Spotify {
    /**
     * **Example:**
     * ```js
     * const playlist = await spotify.playlists.get("id"); // Get playlist data by id
     * ```
     *
     * @param id Id of the playlist
     */
    get(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const tracks = await spotify.playlists.getTracks("id", { limit: 1 }); // Get all tracks in an album by id. Has advanced option too...
     * ```
     *
     * @param id Id of the playlist
     * @param options Options to configure your search
     */
    getTracks(id: string, options?: {
        limit?: null | string | number;
        advanced?: boolean;
    }): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const coverImage = await spotify.playlists.getCoverImage('id') // Get cover image of the playlist by id
     * ```
     *
     * @param id Playlist id
     */
    getCoverImage(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const follows = await spotify.playlists.follows('playlistId', 'userId') // Check if a user or users follow a playlist
     * ```
     *
     * @param id Id of the playlist
     * @param userIds List of user id
     */
    follows(id: string, userIds: string[] | string): Promise<any>;
}
export default Playlist;
