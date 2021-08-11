import type { Client } from "../Client";
import type { Artist } from "../structures/Artist";
import type { Track } from "../structures/Track";
import type { Album } from "../structures/Album";
import type { SearchOptions } from "../Interface";
import { Cache, createCacheStruct, createCacheStructArray } from "../Cache";
import { AlbumGroup } from "../../apiTypes/typings";

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

        return fetchedData ? createCacheStructArray('artists', this.client, fetchedData.artists.items) : [];
    }

    /**
     * Get a spotify artist information by spotify id!
     * 
     * @param id The spotify user id.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example await client.artists.get('id');
     */
    async get(id: string, force = !this.client.cacheSettings.artists): Promise<Artist | null> {
        if (!force && Cache.artists.has(id)) return Cache.artists.get(id)!;
        const fetchedData = await this.client.fetch(`/artists/${id}`);
        return fetchedData ? createCacheStruct('artists', this.client, fetchedData) : null;
    }

    /**
     * Get multiple spotify artists in one fetch!
     * 
     * @param ids An array of spotify ids.
     * @example const artists = await client.artists.getMultiple('id1', 'id2');
     */
    async getMultiple(...ids: string[]): Promise<Artist[]> {
        const fetchedData = await this.client.fetch('/artists', { params: { ids: ids.join(',') } });
        return fetchedData ? createCacheStructArray('artists', this.client, fetchedData.artists) : [];
    }


    /**
     * Get a spotify artist's top tracks by artist's spotify id!
     * 
     * @param id The spotify user id.
     * @param market The market query option.
     * @example const topTracks = await client.artists.getTopTracks('id');
     */
    async getTopTracks(id: string, market?: string): Promise<Track[]> {
        const fetchedData = await this.client.fetch(`/artists/${id}/top-tracks`, { params: { market } });
        return fetchedData ? createCacheStructArray('tracks', this.client, fetchedData.tracks) : [];
    }

    /**
     * Get the artists who are related to a paticular artist by the artist's spotify id!
     * 
     * @param id The spotify user id.
     * @example const relatedArtists = await client.artists.getRelatedArtists('id');
     */
    async getRelatedArtists(id: string): Promise<Artist[]> {
        const fetchedData = await this.client.fetch(`/artists/${id}/related-artists`);
        return fetchedData ? createCacheStructArray('artists', this.client, fetchedData.artists) : [];
    }

    /**
     * Get the albums of the spotify artist by the artist's spotify id!
     * 
     * @param id The spotify user id.
     * @param options The options necessary to get the albums in a sorted way.
     * @example const albums = await client.artists.getAlbums('id');
     */
    async getAlbums(
        id: string,
        options: {
            includeGroups?: AlbumGroup,
            market?: string,
            limit?: number,
            offset?: number
        } = {}
    ): Promise<Album[]> {
        const fetchedData = await this.client.fetch(`/artists/${id}/albums`, {
            params: {
                include_groups: options.includeGroups,
                market: options.market,
                limit: options.limit,
                offset: options.offset
            }
        });

        return fetchedData ? createCacheStructArray('albums', this.client, fetchedData.items) : [];
    }

}