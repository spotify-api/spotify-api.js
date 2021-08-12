import type { Client } from "../Client";
import type { SearchOptions } from "../Interface";
import type { Episode } from "../structures/Episode";
import { Cache, createCacheStruct, createCacheStructArray } from "../Cache";

/**
 * A manager to perform actions which belongs to the spotify episode web api.
 */
export class EpisodeManager {

    /**
     * A manager to perform actions which belongs to the spotify episode web api.
     * 
     * @param client The spotify api client.
     * @example const episodes = new EpisodeManager(client);
     */
    public constructor(public client: Client) {}

    /**
     * Search for spotify episodes with query.
     * 
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.episodes.search('some search');
     */
    async search(query: string, options: SearchOptions = {}): Promise<Episode[]> {
        const fetchedData = await this.client.fetch('/search', {
            params: {
                q: query,
                type: 'episode',
                market: options.market || 'US',
                limit: options.limit,
                offset: options.offset,
                include_external: options.includeExternalAudio ? 'audio' : undefined
            }
        });

        return fetchedData ? createCacheStructArray('episodes', this.client, fetchedData.episodes.items) : [];
    }

    /**
     * Get a spotify episode information by spotify id!
     * 
     * @param id The spotify episode id.
     * @param market Only episodes that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const episode = await client.episodes.get('id');
     */
    async get(id: string, market = 'US', force = !this.client.cacheSettings.episodes): Promise<Episode | null> {
        if (!force && Cache.episodes.has(id)) return Cache.episodes.get(id)!;
        const fetchedData = await this.client.fetch(`/episodes/${id}`, { params: { market } });
        return fetchedData ? createCacheStruct('episodes', this.client, fetchedData) : null;
    }

    /**
     * Get multiple spotify episodes in one fetch!
     * 
     * @param ids An array of spotify ids.
     * @param market Only episodes that are available in that market will be returned.
     * @example const episodes = await client.episodes.getMultiple('id1', 'id2');
     */
    async getMultiple(
        options: {
            ids: string[], 
            market?: string
        }
    ): Promise<Episode[]> {
        const fetchedData = await this.client.fetch('/episodes', {
            params: { 
                ids: options.ids.join(','), 
                market: options.market || 'US'
            }
        });

        return fetchedData ? createCacheStructArray('episodes', this.client, fetchedData.episodes) : [];
    }

}