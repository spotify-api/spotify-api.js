import Show from "../structures/Show";
import BaseManager from "./BaseManager";
import Episode from "../structures/Episode";
/**
 * A class which manages the shows
 */
export default class ShowManager extends BaseManager {
    /**
     * Get a spotify show information by spotify id!
     *
     * @param id Spotify show id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where we need to fetch the details!
     * @example await client.shows.get('id');
     */
    get(id: string, force?: boolean, market?: string): Promise<Show | null>;
    /**
     * Returns the episodes of the show by id!
     *
     * @param id Spotify show id
     * @param options Options such as limit, offset and market!
     * @example client.shows.getEpisodes('id');
     */
    getEpisodes(id: string, options?: {
        limit?: number;
        offset?: number;
        market?: string;
    }): Promise<Episode[]>;
}
export type { Show };
