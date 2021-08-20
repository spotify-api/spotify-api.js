import type { Client } from "../Client";
import type { SearchOptions } from "../Interface";
import type { Show } from "../structures/Show";
import type { Episode } from "../structures/Episode";
import { Cache, createCacheStruct, createCacheStructArray } from "../Cache";

/**
 * A manager to perform actions which belongs to the spotify show web api.
 */
export class ShowManager {

    /**
     * A manager to perform actions which belongs to the spotify show web api.
     * 
     * @param client The spotify api client.
     * @example const shows = new ShowManager(client);
     */
    public constructor(public client: Client) {}

    /**
     * Search for spotify shows with query.
     * 
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.shows.search('some search');
     */
    public async search(query: string, options: SearchOptions = {}): Promise<Show[]> {
        const fetchedData = await this.client.fetch('/search', {
            params: {
                q: query,
                type: 'show',
                market: options.market || 'US',
                limit: options.limit,
                offset: options.offset,
                include_external: options.includeExternalAudio ? 'audio' : undefined
            }
        });

        return fetchedData ? createCacheStructArray('shows', this.client, fetchedData.shows.items) : [];
    }

    /**
     * Get an show's information.
     * 
     * @param id The spotify show id.
     * @param market Only shows that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const show = await client.shows.get('id');
     */
    public async get(id: string, market = 'US', force = !this.client.cacheSettings.shows): Promise<Show | null> {
        if (!force && Cache.shows.has(id)) return Cache.shows.get(id)!;
        const fetchedData = await this.client.fetch(`/shows/${id}`, { params: { market } });
        return fetchedData ? createCacheStruct('shows', this.client, fetchedData) : null;
    }

    /**
     * Get the information of multiple spotify shows in one fetch.
     * 
     * @param ids An array of spotify ids.
     * @param market Only shows that are available in that market will be returned.
     * @example const shows = await client.shows.getMultiple(['id1', 'id2']);
     */
    public async getMultiple(ids: string[], market = 'US'): Promise<Show[]> {
        const fetchedData = await this.client.fetch('/shows', {
            params: { ids: ids.join(','), market }
        });

        return fetchedData ? createCacheStructArray('shows', this.client, fetchedData.shows) : [];
    }

    /**
     * Get the information of the episodes of the show.
     * 
     * @param id The spotify show id.
     * @param options The limit, offset, market query paramater options.
     * @example const episodes = await client.shows.getEpisodes('id');
     */
    public async getEpisodes(
        id: string,
        options: {
            limit?: number,
            offset?: number,
            market?: string
        } = {}
    ): Promise<Episode[]> {
        const fetchedData = await this.client.fetch(`/shows/${id}/episodes`, {
            params: {
                market: 'US',
                ...options
            }
        });

        return fetchedData ? createCacheStructArray('episodes', this.client, fetchedData.items) : [];
    }

}