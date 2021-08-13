import type { Client } from "../Client";
import type { Artist } from "../structures/Artist";
import type { Track } from "../structures/Track";
import type { Album } from "../structures/Album";
import type { SearchOptions } from "../Interface";
import type { AlbumGroup } from "api-types";
import { Cache, createCacheStruct, createCacheStructArray } from "../Cache";

/**
 * A manager to perform actions which belongs to the spotify artist web api.
 */
export class ArtistManager {

    /**
     * A manager to perform actions which belongs to the spotify artist web api.
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
    public async search(query: string, options: SearchOptions = {}): Promise<Artist[]> {
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
     * Get an artist's information.
     * 
     * @param id The spotify artist id.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const artist = await client.artists.get('id');
     */
    public async get(id: string, force = !this.client.cacheSettings.artists): Promise<Artist | null> {
        if (!force && Cache.artists.has(id)) return Cache.artists.get(id)!;
        const fetchedData = await this.client.fetch(`/artists/${id}`);
        return fetchedData ? createCacheStruct('artists', this.client, fetchedData) : null;
    }

    /**
     * Get the information of multiple spotify artists in one fetch.
     * 
     * @param ids An array of spotify ids.
     * @example const artists = await client.artists.getMultiple(['id1', 'id2']);
     */
    public async getMultiple(ids: string[]): Promise<Artist[]> {
        const fetchedData = await this.client.fetch('/artists', { params: { ids: ids.join(',') } });
        return fetchedData ? createCacheStructArray('artists', this.client, fetchedData.artists) : [];
    }


    /**
     * Get the information of top tracks from the spotify artist.
     * 
     * @param id The spotify artist id.
     * @param market The market query option.
     * @example const topTracks = await client.artists.getTopTracks('id');
     */
    public async getTopTracks(id: string, market: string = 'US'): Promise<Track[]> {
        const fetchedData = await this.client.fetch(`/artists/${id}/top-tracks`, { params: { market } });
        return fetchedData ? createCacheStructArray('tracks', this.client, fetchedData.tracks) : [];
    }

    /**
     * Get the information of the artists who are related to a paticular artist.
     * 
     * @param id The spotify artist id.
     * @example const relatedArtists = await client.artists.getRelatedArtists('id');
     */
    public async getRelatedArtists(id: string): Promise<Artist[]> {
        const fetchedData = await this.client.fetch(`/artists/${id}/related-artists`);
        return fetchedData ? createCacheStructArray('artists', this.client, fetchedData.artists) : [];
    }

    /**
     * Get the informations of albums of the artist.
     * 
     * @param id The spotify artist id.
     * @param options The options necessary to get the albums in a sorted way.
     * @example const albums = await client.artists.getAlbums('id');
     */
    public async getAlbums(
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