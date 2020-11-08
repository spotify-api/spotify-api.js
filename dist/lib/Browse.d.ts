/**
 * Browsing lib file
 */
import Spotify from "../Spotify";
/**
 * Class of all methods related to browse enpoints
 */
declare class Browse extends Spotify {
    /**
     * Get information about a category by id
     * @param id category id
     */
    getCategory(id: string): Promise<any>;
    /**
     * Returns all playlists of the category by id
     * @param id Id of the category
     * @param limit Limit of results
     */
    getCategoryPlaylists(id: string, limit?: number): Promise<any>;
    /**
     * Get list of all categories
     * @param limit Limit of your results
     */
    categories(limit?: number): Promise<any>;
    /**
     * Get list of all featured playlists
     * @param limit Limit of results
     */
    featuredPlaylists(limit?: number): Promise<any>;
    /**
     * Get list of all new releases
     * @param limit Limit of results
     */
    newReleases(limit?: number): Promise<any>;
}
export default Browse;
