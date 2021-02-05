import Spotify from "../Spotify";
import Client from "../Client";
import Show from "../structures/Show";
import Episode from "../structures/Episode";
/**
 * Class of all Spotify Api Methods related to shows
 */
export default class ShowManager extends Spotify {
    client: Client;
    /**
     * Class of all Spotify Api Methods related to shows
     *
     * @param client Your Spotify Client
     */
    constructor(client: Client);
    /**
     * Search shows efficiently!
     *
     * @param q Your query
     * @param options Options such as limit and params
     * @example const [show] = await spotify.shows.search("search", { limit: 1 }); // Returns the very first search
     */
    search(q: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Show[]>;
    /**
     * Returns a Spotify Show Information by its Id!
     *
     * @param id Id of the show
     * @param force If true will fetch instead of search cache
     * @example const show = await spotify.shows.get('id'); // Returns show information by id
     */
    get(id: string, force?: boolean): Promise<Show>;
    /**
     * Returns the episodes of the show by the episode id!
     *
     * @param id Id of the show
     * @param options Options such as limit and params
     * @example const episode = await spotify.shows.getEpisodes('id'); // Returns all episodes of show by id
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
    delete(...ids: string[]): Promise<void>;
    /**
     * This method uses client.user.addShow
     * This method adds the show to your saved list
     *
     * @param ids Id of the show or shows
     */
    add(...ids: string[]): Promise<void>;
}
