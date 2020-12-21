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
declare class Browse extends Spotify {
    client: Client;
    constructor(token: string, client: Client);
    /**
     * Get information about a category by id
     *
     * @param id category id
     * @param force If true, will fetch else will try to fetch from cache!
     */
    getCategory(id: string, force?: boolean): Promise<Category>;
    /**
     * Returns all playlists of the category by id
     * @param id Id of the category
     * @param limit Limit of results
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
     * @param options Option object such as limit, advanced and params
     */
    featuredPlaylists(options?: {
        limit?: number;
        params?: any;
    }): Promise<FeaturedPlaylistReturn>;
    /**
     * Get list of all new releases
     * @param options options object such as limit advanced and params
     */
    newReleases(options?: {
        limit?: number;
        params?: any;
    }): Promise<Album[]>;
}
export default Browse;
