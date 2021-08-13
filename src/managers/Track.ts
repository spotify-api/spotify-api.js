import type { Client } from "../Client";
import type { SearchOptions } from "../Interface";
import type { Track } from "../structures/Track";
import { Cache, createCacheStruct, createCacheStructArray } from "../Cache";

/**
 * A manager to perform actions which belongs to the spotify track web api.
 */
export class TrackManager {

    /**
     * A manager to perform actions which belongs to the spotify track web api.
     * 
     * @param client The spotify api client.
     * @example const tracks = new TrackManager(client);
     */
    public constructor(public client: Client) {}

    /**
     * Search for spotify tracks with query.
     * 
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.tracks.search('some search');
     */
    public async search(query: string, options: SearchOptions = {}): Promise<Track[]> {
        const fetchedData = await this.client.fetch('/search', {
            params: {
                q: query,
                type: 'track',
                market: options.market || 'US',
                limit: options.limit,
                offset: options.offset,
                include_external: options.includeExternalAudio ? 'audio' : undefined
            }
        });

        return fetchedData ? createCacheStructArray('tracks', this.client, fetchedData.tracks.items) : [];
    }

    /**
     * Get an track's information.
     * 
     * @param id The spotify track id.
     * @param market Only tracks that are available in that market will be returned.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const track = await client.tracks.get('id');
     */
    public async get(id: string, market = 'US', force = !this.client.cacheSettings.tracks): Promise<Track | null> {
        if (!force && Cache.tracks.has(id)) return Cache.tracks.get(id)!;
        const fetchedData = await this.client.fetch(`/tracks/${id}`, { params: { market } });
        return fetchedData ? createCacheStruct('tracks', this.client, fetchedData) : null;
    }

    /**
     * Get the information of multiple spotify tracks in one fetch.
     * 
     * @param ids An array of spotify ids.
     * @param market Only tracks that are available in that market will be returned.
     * @example const tracks = await client.tracks.getMultiple(['id1', 'id2']);
     */
    public async getMultiple(ids: string[], market = 'US'): Promise<Track[]> {
        const fetchedData = await this.client.fetch('/tracks', {
            params: { ids: ids.join(','), market }
        });

        return fetchedData ? createCacheStructArray('tracks', this.client, fetchedData.tracks) : [];
    }

}