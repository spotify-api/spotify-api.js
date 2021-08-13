import type { Client } from "../Client";
import type { Album } from "../structures/Album";
import type { Playlist } from "../structures/Playlist";
import type { FeaturedPlaylistContent, Recommendations } from "../Interface";
import type { Category, RecommendationQuery } from "api-types";
import { createCacheStructArray } from "../Cache";

/**
 * A manager to perform actions which belongs to the spotify browse web api.
 */
export class BrowseManager {

    /**
     * A manager to perform actions which belongs to the spotify browse web api.
     * 
     * @param client The spotify api client.
     * @example const browse = new BrowseManager(client);
     */
    public constructor(public client: Client) {}

    /**
     * Get all the new album releases.
     * 
     * @param options The country, offset, limit query parameters options.
     * @example const albums = await browse.getNewReleases();
     */
    public async getNewReleases(
        options?: {
            country?: string,
            offset?: number,
            limit?: number
        }
    ): Promise<Album[]> {
        const fetchedData = await this.client.fetch('/browse/new-releases', { params: options });
        return fetchedData ? createCacheStructArray('albums', this.client, fetchedData.albums.items) : [];
    }

    /**
     * Get the featured playlists.
     * 
     * @param options The country, locale, timestamp, offset, limit query parameters options.
     * @example const playlists = await browse.getFeaturedPlaylists();
     */
    public async getFeaturedPlaylists(
        options?: {
            country?: string,
            locale?: string,
            timestamp?: string,
            offset?: number,
            limit?: number
        }
    ): Promise<FeaturedPlaylistContent | null> {
        const fetchedData = await this.client.fetch('/browse/featured-playlists', { params: options });
        return fetchedData ? {
            message: fetchedData.message,
            playlists: createCacheStructArray('playlists', this.client, fetchedData.playlists.items)
        } : null;
    }

    /**
     * Get an array of all categories.
     * 
     * @param options The country, locale, offset, limit query parameters options.
     * @example const categories = await browse.getCategories();
     */
    public async getCategories(
        options?: {
            country?: string,
            locale?: string,
            offset?: number,
            limit?: number
        }
    ): Promise<Category[]> {
        const fetchedData = await this.client.fetch('/browse/categories', { params: options });
        return fetchedData ? fetchedData.categories.items : [];
    }

    /**
     * Get the brief information about a paticular category.
     * 
     * @param id The category id.
     * @param options The country, locale query parameters options.
     * @example const category = await browse.getCategory('party');
     */
    public getCategory(
        id: string,
        options?: {
            country?: string,
            locale?: string
        }
    ): Promise<Category | null> {
        return this.client.fetch(`/browse/categories/${id}`, { params: options });
    }

    /**
     * Get the playlists of a paticular category.
     * 
     * @param id The spotify category id.
     * @param options The country, offset, limit query parameters options.
     * @example const playlists = await browse.getCategoryPlaylists('party');
     */
    public async getCategoryPlaylists(
        id: string,
        options?: {
            country?: string,
            offset?: number,
            limit?: number
        }
    ): Promise<Playlist[]> {
        const fetchedData = await this.client.fetch(`/browse/categories/${id}/playlists`, { params: options });
        return fetchedData ? createCacheStructArray('playlists', this.client, fetchedData.playlists.items) : [];
    }

    /**
     * Get all the recommendations from the api sorted by the [RecommendationQuery] structure.
     * 
     * @param options The [RecommendationQuery] options structure which will be sent as query paramaters.
     * @example 
     * const genres = await browse.getRecommendations({
     *     seed_artists: 'artists_id',
     *     seed_genre: 'genre',
     *     seed_tracks: 'tracks
     * });
     */
    public async getRecommendations(options: RecommendationQuery): Promise<Recommendations | null> {
        const fetchedData = await this.client.fetch('/recommendations', { params: options });
        return fetchedData ? {
            seeds: fetchedData.seeds,
            tracks: createCacheStructArray('tracks', this.client, fetchedData.tracks)
        } : null;
    }

    /**
     * Get all the recommendation genres.
     * 
     * @example const genres = await browse.getRecommendationGenreSeeds();
     */
    public getRecommendationGenreSeeds(): Promise<Record<'genres', string[]>> {
        return this.client.fetch('/recommendations/available-genre-seeds');
    }

}