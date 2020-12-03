/**
 * Playlist lib file
 */
import Spotify from "../Spotify";
import { Image } from "../structures/Interface";
import PlaylistStructure from "../structures/Playlist";
import { PlaylistTrack } from "../structures/PlaylistUtils";
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
    get(id: string): Promise<PlaylistStructure>;
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
        limit?: number;
        advanced?: boolean;
        params?: any;
    }): Promise<PlaylistTrack[]>;
    /**
     * **Example:**
     * ```js
     * const coverImage = await spotify.playlists.getCoverImage('id') // Get cover image of the playlist by id
     * ```
     *
     * @param id Playlist id
     */
    getCoverImage(id: string): Promise<Image[]>;
}
export default Playlist;
