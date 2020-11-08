/**
 * Artist lib file
 */
import Spotify from "../Spotify";
/**
 * Class of all methods related to artists
 */
declare class Artist extends Spotify {
    /**
     * **Example:**
     * ```js
     * const artist = await spotify.artists.search("alec benjamin", { limit: 1 }); // Searches for the artist with a default limit as 1...
       const advanced = await spotify.artists.search("alec benjamin", {
           limit: 1,
           advanced: true,
       }); // Returns a `dominantColor` and `codeImage` key with the response..
     * ```
     *
     * @param q Your search query
     * @param options Options to configure your search
     */
    search(q: string, options?: {
        limit?: null | string | number;
        advanced?: boolean;
    }): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const artist = await spotify.artists.get("artist id"); // Get artists by id. Has advanced option too...
     * ```
     *
     * @param id Id of the artist
     */
    get(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const albums = await spotify.artists.getAlbums("artist id"); // Get albums of the artists by id. Has advanced and limit option too...
     * ```
     * @param id Id of the artist
     * @param options Options to configure your search
     */
    getAlbums(id: string, options?: {
        limit?: null | string | number;
        advanced?: boolean;
    }): Promise<any>;
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
        limit?: null | string | number;
        advanced?: boolean;
    }): Promise<any>;
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
        advanced?: boolean;
    }): Promise<any>;
}
export default Artist;
