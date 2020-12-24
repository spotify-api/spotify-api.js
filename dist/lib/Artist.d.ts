/**
 * Artist lib file
 */
import Track from "../structures/Track";
import Client from "../Client";
import Spotify from "../Spotify";
import ArtistStructure from "../structures/Artist";
import Album from "../structures/Album";
/**
 * Class of all methods related to artists
 */
declare class Artist extends Spotify {
    client: Client;
    constructor(token: string, client: Client);
    /**
     * **Example:**
     * ```js
     * const artist = await spotify.artists.search("alec benjamin", { limit: 1 }); // Searches for the artist with a default limit as 1...
     * ```
     *
     * @param q Your search query
     * @param options Options such as limit and params
     */
    search(q: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<ArtistStructure[]>;
    /**
     * **Example:**
     * ```js
     * const artist = await spotify.artists.get("artist id"); // Get artists by id
     * ```
     *
     * @param id Id of the artist
     * @param force If true will directly fetch else will search cache
     */
    get(id: string, force?: boolean): Promise<ArtistStructure>;
    /**
     * **Example:**
     * ```js
     * const albums = await spotify.artists.getAlbums("artist id"); // Get albums of the artists by id. Has advanced and limit option too...
     * ```
     * @param id Id of the artist
     * @param options Options to configure your search
     */
    getAlbums(id: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Album[]>;
    /**
     * **Example:**
     * ```js
     * const topTracks = await spotify.artists.topTracks("artist id"); // Returns top tracks of the artist. Has advanced and limit option too...
     * ```
     *
     * @param id Id of the artist
     * @param options Options to configure your search
     */
    topTracks(id: string, options?: {
        params?: any;
    }): Promise<Track[]>;
    /**
     * **Example:**
     * ```js
     * const relatedArtists = await spotify.artists.relatedArtists("artist id"); // Returns related artists. Has advanced and limit option too...
     * ```
     *
     * @param id Id of the artist
     * @param options Options to configure your search
     */
    relatedArtists(id: string, options?: {
        params?: any;
    }): Promise<ArtistStructure[]>;
    /**
     * Verify if you follow the artists by ids but only if you have the required scopes
     *
     * @param ids Ids of the artist or artists
     */
    follows(...ids: string[]): Promise<boolean[]>;
    /**
     * Follows the artists
     *
     * @param ids Ids of the artist or artists
     */
    follow(...ids: string[]): Promise<void>;
}
export default Artist;
