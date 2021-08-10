import type { Client } from "../Client";
import { SearchOptions } from "../Interface";
import { Artist } from "../structures/Artist";
import * as Cache from "../Cache";

/**
 * A manager to perform actions with belongs to to the spotify artist web api.
 */
export class ArtistManager {

    /**
     * A manager to perform actions with belongs to to the spotify artist web api.
     * 
     * @param client The spotify api client.
     * @example const artists = new ArtistManager(client);
     */
    public constructor(public client: Client) {}

    /**
     * Search for spotify artists with query.
     * 
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.artists.search('some search');
     */
    async search(query: string, options: SearchOptions = {}): Promise<Artist[]> {
        const fetchedData = await this.client.fetch('/search', {
            params: {
                q: query,
                type: 'artist',
                market: options.market,
                limit: options.limit,
                offset: options.offset,
                include_external: options.includeExternalAudio ? 'audio' : undefined
            }
        });

        return fetchedData ? fetchedData.artists.items.map(x => new Artist(this.client, x)) : [];
    }

    /**
     * Get a spotify artist information by spotify id!
     * 
     * @param id The spotify user id.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example await client.artists.get('id');
     */
    async get(id: string, force = !this.client.cacheSettings.artists): Promise<Artist | null> {
        if (!force && Cache.artists.has(id)) return new Artist(this.client, Cache.artists.get(id)!);
        const fetchedData = await this.client.fetch(`/artists/${id}`);
        return fetchedData ? new Artist(this.client, fetchedData) : null;
    }

    /**
     * Get multiple spotify artists in one fetch!
     * 
     * @param ids An array of spotify ids.
     * @example const artists = await client.artists.getMultiple('id1', 'id2');
     */
    async getMultiple(...ids: string[]): Promise<Artist[]> {
        const fetchedData = await this.client.fetch('/artists', { params: { ids: ids.join(',') } });
        return fetchedData ? fetchedData.artists.map(x => new Artist(this.client, x)) : [];
    }

}