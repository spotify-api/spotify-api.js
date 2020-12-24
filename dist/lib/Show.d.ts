import Spotify from "../Spotify";
import Client from "../Client";
import ShowStructure from "../structures/Show";
import Episode from "../structures/Episode";
/**
 * Class of all methods related to episode enpoints
 */
declare class Show extends Spotify {
    client: Client;
    constructor(token: string, client: Client);
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
        params?: any;
    }): Promise<ShowStructure[]>;
    /**
     * **Example:**
     * ```js
     * const show = await spotify.shows.get('id'); // Returns show information by id
     * ```
     *
     * @param id Id of the show
     * @param force If true will fetch instead of search cache
     */
    get(id: string, force?: boolean): Promise<ShowStructure>;
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
        params?: any;
    }): Promise<Episode[]>;
    /**
     * This method uses client.user.deleteShow
     * This method deletes the show from your saved list
     *
     * @param ids Id of the show or shows
     */
    delete(ids: string | string[]): Promise<void>;
    /**
     * This method uses client.user.addShow
     * This method adds the show to your saved list
     *
     * @param ids Id of the show or shows
     */
    add(ids: string | string[]): Promise<void>;
}
export default Show;
