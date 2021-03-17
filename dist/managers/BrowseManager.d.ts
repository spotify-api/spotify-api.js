import { Category } from "../Types";
import Playlist from "../structures/Playlist";
import BaseManager from "./BaseManager";
/**
 * Return object structure by BrowseManager.getFeatured();
 */
export interface FeaturedPlaylists {
    readonly playlists: Playlist[];
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
     * @example client.browse.getCategories()
     */
    getCategories(): Promise<Category[]>;
    /**
     * Returns an array of playlists of the category!
     *
     * @param id Spotify id of the category
     * @param options Options such as limit and offset
     * @example client.browse.getCategoryPlaylists('party');
     */
    getCategoryPlaylists(id: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<Playlist[]>;
    /**
     * Returns the featured playlists of the spotify
     * @param options Options such as limit and offset
     * @example client.browse.getFeaturedPlaylists();
     */
    getFeaturedPlaylists(options?: {
        limit?: number;
        offset?: number;
    }): Promise<FeaturedPlaylists | null>;
}
export type { Category };
