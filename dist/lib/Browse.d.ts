/**
 * Browsing lib file
 */
import Spotify from "../Spotify";
import SimplifiedPlaylist from "../structures/SimplifiedPlaylist";
import { Category, FeaturedPlaylistReturn } from "../structures/Interface";
import SimplifiedAlbum from "../structures/SimplifiedAlbum";
/**
 * Class of all methods related to browse endpoints
 */
declare class Browse extends Spotify {
    /**
     * Get information about a category by id
     * @param id category id
     */
    getCategory(id: string): Promise<Category>;
    /**
     * Returns all playlists of the category by id
     * @param id Id of the category
     * @param limit Limit of results
     */
    getCategoryPlaylists(id: string, options?: {
        limit?: number;
        advanced?: boolean;
        params?: any;
    }): Promise<SimplifiedPlaylist[]>;
    /**
     * Get list of all categories
     * @param options option object such as limit and params
     */
    categories(options?: {
        limit?: number;
        params?: any;
    }): Promise<Category[]>;
    /**
     * Get list of all featured playlists
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
        advanced?: boolean;
        params?: any;
    }): Promise<SimplifiedAlbum[]>;
}
export default Browse;
