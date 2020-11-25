/**
 * Browsing lib file
 */
import Spotify from "../Spotify";
import SimplifiedPlaylist from "../structures/SimplifiedPlaylist";
import { Category, FeaturedPlaylistReturn } from "../structures/Interface";
import SimplifiedAlbum from "../structures/SimplifiedAlbum";
/**
 * Class of all methods related to browse enpoints
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
     * @param limit Limit of your results
     */
    categories(options?: {
        limit?: number;
        params?: any;
    }): Promise<Category[]>;
    /**
     * Get list of all featured playlists
     * @param limit Limit of results
     */
    featuredPlaylists(options?: {
        limit?: number;
        advanced?: boolean;
        params?: any;
    }): Promise<FeaturedPlaylistReturn>;
    /**
     * Get list of all new releases
     * @param limit Limit of results
     */
    newReleases(options?: {
        limit?: number;
        advanced?: boolean;
        params?: any;
    }): Promise<SimplifiedAlbum[]>;
}
export default Browse;
