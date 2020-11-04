/**
 * Browsing lib file
 */
import Spotify from "../Spotify";
declare class Browse extends Spotify {
    getCategory(id: string): Promise<any>;
    getCategoryPlaylists(id: string, limit?: number): Promise<any>;
    categories(limit?: number): Promise<any>;
    featuredPlaylists(limit?: number): Promise<any>;
    newReleases(limit?: number): Promise<any>;
}
export default Browse;
