/**
 * Browsing lib file
 */
import { Category, FeaturedPlaylistReturn } from "../structures/Interface";
import Spotify from "../Spotify";
import Client from "../Client";
import Playlist from "../structures/Playlist";
import Album from "../structures/Album";
/**
 * Class of all methods related to browse endpoints
 */
export default class BrowseManager extends Spotify {
    client: Client;
    /**
     * Class of all methods related to browse endpoints
     *
     * @param client Your Spotify Client
     */
    constructor(client: Client);
    /**
     * Get information about a category by id
     *
     * @param id ID of the catrgory
     * @param force If true, will fetch else will try to fetch from cache!
     */
    getCategory(id: string, force?: boolean): Promise<Category>;
    /**
     * Returns all playlists of the category by id!
     *
     * @param id Id of the category
     * @param options Options such as limit and params!
     */
    getCategoryPlaylists(id: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Playlist[]>;
    /**
     * Get list of all categories
     *
     * @param options option object such as limit and params
     */
    categories(options?: {
        limit?: number;
        params?: any;
    }): Promise<Category[]>;
    /**
     * Get list of all featured playlists
     *
     * @param options Option object such as limit and params
     */
    featuredPlaylists(options?: {
        limit?: number;
        params?: any;
    }): Promise<FeaturedPlaylistReturn>;
    /**
     * Get list of all new album releases
     *
     * @param options options object such as limit and params
     */
    newReleases(options?: {
        limit?: number;
        params?: any;
    }): Promise<Album[]>;
}
