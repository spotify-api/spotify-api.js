import { Category, Paging, PagingOptions } from "../Types";
import Playlist from "../structures/Playlist";
import Album from "../structures/Album";
import BaseManager from "./BaseManager";
/**
 * Return object structure by BrowseManager.getFeatured();
 */
export interface FeaturedPlaylists {
    readonly playlists: Paging<Playlist>;
    message: string;
}
/**
 * All browse api endpoint methods!
 */
export default class BrowseManager extends BaseManager {
    /**
     * Returns the spotify category by id
     *
     * @param id ID of the spotify category
     * @param force If true, it will attempt to search cache if available
     * @example await client.browse.getCategory('party');
     */
    getCategory(id: string, force?: boolean): Promise<Category | null>;
    /**
     * Returns an array of spotify categories
     *
     * @param options Basic PagingOptions
     * @example client.browse.getCategories()
     */
    getCategories(options?: PagingOptions): Promise<Paging<Category>>;
    /**
     * Returns an array of playlists of the category!
     *
     * @param id Spotify id of the category
     * @param options Options such as limit and offset
     * @example client.browse.getCategoryPlaylists('party');
     */
    getCategoryPlaylists(id: string, options?: PagingOptions): Promise<Paging<Playlist>>;
    /**
     * Returns the featured playlists of the spotify
     *
     * @param options Options such as limit and offset
     * @example client.browse.getFeaturedPlaylists();
     */
    getFeaturedPlaylists(options?: PagingOptions): Promise<FeaturedPlaylists | null>;
    /**
     * Returns new releases of albums on spotify
     *
     * @param options Basic PagingOptions
     * @example await client.browse.getNewReleases();
     */
    getNewReleases(options?: PagingOptions): Promise<Paging<Album>>;
    /**
     * Returns all markets present in spotify!
     *
     * @example await client.browse.getAllMarkets();
     */
    getMarkets(): Promise<string[]>;
    /**
     * Returns recommended genres!
     *
     * @example await client.browse.getRecommendedGenres();
     */
    getRecommendedGenres(): Promise<string[]>;
}
export type { Category };
