/**
 * Album lib file
 */
import Spotify from "../Spotify";
import Client from "../Client";
import AlbumStructure from '../structures/Album';
import Track from "../structures/Track";
/**
 * Class of all methods related to albums
 */
declare class Album extends Spotify {
    client: Client;
    constructor(token: string, client: Client);
    /**
     * **Example:**
     * ```js
     * const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album. Has advanced option too...
     * ```
     *
     * @param q Your query
     * @param options Options such as limit, advanced and params
     */
    search(q: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Album[]>;
    /**
     * **Example:**
     * ```js
     * const album = await spotify.albums.get("album id"); // Get album by id...
     * ```
     *
     * @param id Id of the album
     * @param force If true then will directly fetch instead of searching cache
     */
    get(id: string, force?: boolean): Promise<AlbumStructure>;
    /**
     * **Example:**
     * ```js
     * const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album. Has advanced option too...
     * ```
     *
     * @param id Id of the song
     * @param options Options such as limit, advanced and params
     */
    getTracks(id: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Track[]>;
}
export default Album;
