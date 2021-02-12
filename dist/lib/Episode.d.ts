import Spotify from "../Spotify";
import Client from "../Client";
import Episode from "../structures/Episode";
/**
 * Class of all Spotify Api Methods related to episodes!
 */
export default class EpisodeManager extends Spotify {
    client: Client;
    /**
     * Class of all Spotify Api Methods related to episodes!
     *
     * @param client Your Spotify Client
     */
    constructor(client: Client);
    /**
     * Search episodes efficiently!
     *
     * @param q Your query
     * @param options Options such as limit and params
     * @example const [episode] = await spotify.episodes.search("search", { limit: 1 }); // Returns the very first search
     */
    search(q: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Episode[]>;
    /**
     * Returns the information of the Spotify Episode by its id!
     *
     * @param id Id of the episode
     * @param force If true, will force fetch else will search first in cache!
     * @example const episode = await spotify.episodes.get('id'); // Returns the episode information by id
     */
    get(id: string, force?: boolean): Promise<Episode>;
}
