import Spotify from "../Spotify";
import EpisodeStructure from "../structures/Episode";
import SimplifiedEpisode from "../structures/SimplifiedEpisode";
/**
 * Class of all methods related to episode enpoints
 */
declare class Episode extends Spotify {
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
        advanced?: boolean;
        params?: any;
    }): Promise<SimplifiedEpisode[]>;
    /**
     * **Example:**
     * ```js
     * const episode = await spotify.episodes.get('id'); // Returns the episode information by id
     * ```
     *
     * @param id Id of the episode
     * @param options Advanced option
     */
    get(id: string, options?: {
        advanced?: boolean;
    }): Promise<EpisodeStructure>;
}
export default Episode;
