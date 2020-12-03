import Spotify from "../Spotify";
import ShowStructure from "../structures/Show";
import SimplifiedEpisode from "../structures/SimplifiedEpisode";
import SimplifiedShow from "../structures/SimplifiedShow";
/**
 * Class of all methods related to episode enpoints
 */
declare class Show extends Spotify {
    /**
     * **Example:**
     * ```js
     * const [show] = await spotify.shows.search("search", { limit: 1 }); // Returns the very first search
     * ```
     *
     * @param q Your query
     * @param options Options such as limit, advanced and params
     */
    search(q: string, options?: {
        limit?: number;
        advanced?: boolean;
        params?: any;
    }): Promise<SimplifiedShow[]>;
    /**
     * **Example:**
     * ```js
     * const show = await spotify.shows.get('id'); // Returns show information by id
     * ```
     *
     * @param id Id of the show
     * @param options Options such as advanced
     */
    get(id: string, options?: {
        advanced?: boolean;
    }): Promise<ShowStructure>;
    /**
     * **Example:**
     * ```js
     * const episode = await spotify.shows.getEpisodes('id'); // Returns all episodes of show by id
     * ```
     *
     * @param id Id of the show
     * @param options Options such as limit, advanced and params
     */
    getEpisodes(id: string, options?: {
        limit?: number;
        advanced?: boolean;
        params?: any;
    }): Promise<SimplifiedEpisode[]>;
}
export default Show;
