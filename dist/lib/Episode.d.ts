import Spotify from "../Spotify";
import Client from "../Client";
import EpisodeStructure from "../structures/Episode";
/**
 * Class of all methods related to episode enpoints
 */
declare class Episode extends Spotify {
    client: Client;
    constructor(token: string, client: Client);
    /**
     * **Example:**
     * ```js
     * const [episode] = await spotify.episodes.search("search", { limit: 1 }); // Returns the very first search
     * ```
     *
     * @param q Your query
     * @param options Options such as limit, advanced and params
     */
    search(q: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<EpisodeStructure[]>;
    /**
     * **Example:**
     * ```js
     * const episode = await spotify.episodes.get('id'); // Returns the episode information by id
     * ```
     *
     * @param id Id of the episode
     * @param options Advanced option
     */
    get(id: string, force?: boolean): Promise<EpisodeStructure>;
}
export default Episode;
