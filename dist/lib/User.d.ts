/**
 * User lib file
 */
import Spotify from "../Spotify";
/**
 * Class of all methods related to users
 */
declare class User extends Spotify {
    /**
     * **Example:**
     * ```js
     * const user = await spotify.users.get("id"); // Returns the user details by id...
     * ```
     *
     * @param id Id of the user
     */
    get(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const playlists = await spotify.users.getPlaylists("id"); // Returns the user playlists by id...
     * ```
     *
     * @param id Id of the user
     */
    getPlaylists(id: string): Promise<any>;
}
export default User;
