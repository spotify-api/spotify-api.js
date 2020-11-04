/**
 * User lib file
 */
import Spotify from "../Spotify";
/**
 * Class of all methods related to users
 */
declare class User extends Spotify {
    /**
     * @param id Id of the user
     *
     * **Example:**
     * ```js
     * const user = await spotify.users.get("id"); // Returns the user details by id...
     * ```
     */
    get(id: string): Promise<any>;
    getPlaylists(id: string): Promise<any>;
}
export default User;
