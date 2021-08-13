import type { Client } from "../Client";
import type { SearchOptions } from "../Interface";
import type { Album } from "../structures/Album";
import type { Track } from "../structures/Track";
import { Cache, createCacheStruct, createCacheStructArray } from "../Cache";

/**
 * A manager to perform actions which belongs to the spotify album web api.
 */
export class AlbumManager {

    /**
     * A manager to perform actions which belongs to the spotify album web api.
     * 
     * @param client The spotify api client.
     * @example const albums = new AlbumManager(client);
     */
    public constructor(public client: Client) {}

    /**
     * Search for spotify albums with query.
     * 
     * @param query The query to search.
     * @param options Some search options to make the search more efficient.
     * @example const results = await client.albums.search('some search');
     */
    async search(query: string, options: SearchOptions = {}): Promise<Album[]> {
        const fetchedData = await this.client.fetch('/search', {
            params: {
                q: query,
                type: 'album',
                market: options.market,
                limit: options.limit,
                offset: options.offset,
                include_external: options.includeExternalAudio ? 'audio' : undefined
            }
        });

        return fetchedData ? createCacheStructArray('albums', this.client, fetchedData.albums.items) : [];
    }

    /**
     * Get an album's information.
     * 
     * @param id The spotify album id.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const album = await client.albums.get('id');
     */
    async get(id: string, force = !this.client.cacheSettings.albums): Promise<Album | null> {
        if (!force && Cache.albums.has(id)) return Cache.albums.get(id)!;
        const fetchedData = await this.client.fetch(`/albums/${id}`);
        return fetchedData ? createCacheStruct('albums', this.client, fetchedData) : null;
    }

    /**
     * Get the information of multiple albums in one fetch.
     * 
     * @param ids An array of spotify ids.
     * @example const albums = await client.albums.getMultiple('id1', 'id2');
     */
    async getMultiple(...ids: string[]): Promise<Album[]> {
        const fetchedData = await this.client.fetch('/albums', { params: { ids: ids.join(',') } });
        return fetchedData ? createCacheStructArray('albums', this.client, fetchedData.albums) : [];
    }

    /**
     * Get the information about the album's tracks.
     * 
     * @param id The spotify album id.
     * @example const tracks = await client.albums.getTracks('id');
     */
    async getTracks(id: string): Promise<Track[]> {
        const fetchedData = await this.client.fetch(`/albums/${id}/tracks`);
        return fetchedData ? createCacheStructArray('tracks', this.client, fetchedData.items) : [];
    }

}