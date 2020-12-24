/**
 * Playlist lib file
 */
import Spotify from "../Spotify";
import Client from "../Client";
import { Image } from "../structures/Interface";
import PlaylistStructure, { PlaylistTrack } from "../structures/Playlist";
/**
 * Class of all methods related to playlists
 */
declare class Playlist extends Spotify {
    client: Client;
    constructor(token: string, client: Client);
    /**
     * **Example:**
     * ```js
     * const playlist = await spotify.playlists.get("id"); // Get playlist data by id
     * ```
     *
     * @param id Id of the playlist
     * @param force If true then will fetch directly instead of searching cache
     */
    get(id: string, force?: boolean): Promise<PlaylistStructure>;
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
        params?: any;
    }): Promise<PlaylistTrack[]>;
    /**
     * **Example:**
     * ```js
     * const [coverImage] = await spotify.playlists.getCoverImage('id') // Get cover image of the playlist by id
     * ```
     *
     * @param id Playlist id
     */
    getImages(id: string): Promise<Image[]>;
    /**
     * Follow a playlist by id
     *
     * @param id Id of the playlist
     */
    follow(id: string): Promise<void>;
}
export default Playlist;
