import Episode from "../structures/Episode";
import { GetMultipleOptions, SearchOptions } from "../Types";
import BaseManager from "./BaseManager";
/**
 * A class which manages the episodes
 */
export default class EpisodeManager extends BaseManager {
    /**
     * Search episodes!
     *
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.episodes.search('some query');
     */
    search(query: string, options: Omit<SearchOptions, 'type'>): Promise<Episode[]>;
    /**
     * Get a spotify episode information by spotify id!
     *
     * @param id Spotify episode id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where we need to fetch the details!
     * @example await client.episodes.get('id');
     */
    get(id: string, force?: boolean, market?: string): Promise<Episode | null>;
    /**
     * Get multiple episodes at one fetch!
     *
     * @param options Basic GetMultipleOptions
     * @example await client.episodes.getMultiple({
     *     ids: ['123456789']
     * })
     */
    getMultiple(options: GetMultipleOptions): Promise<Episode[]>;
}
export type { Episode };
