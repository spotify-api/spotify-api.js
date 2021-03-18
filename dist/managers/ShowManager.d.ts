import Show from "../structures/Show";
import { GetMultipleOptions, PagingOptions, SearchOptions } from "../Types";
import BaseManager from "./BaseManager";
import Episode from "../structures/Episode";
/**
 * A class which manages the shows
 */
export default class ShowManager extends BaseManager {
    /**
     * Search shows!
     *
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.shows.search('some query');
     */
    search(query: string, options: Omit<SearchOptions, 'type'>): Promise<Show[]>;
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
     * Get multiple shows at one fetch!
     *
     * @param options Basic GetMultipleOptions
     * @example await client.shows.getMultiple({
     *     ids: ['123456789']
     * })
     */
    getMultiple(options: GetMultipleOptions): Promise<Show[]>;
    /**
     * Returns the episodes of the show by id!
     *
     * @param id Spotify show id
     * @param options Basic PagingOptions
     * @example client.shows.getEpisodes('id');
     */
    getEpisodes(id: string, options?: PagingOptions): Promise<Episode[]>;
}
export type { Show };
