/**
 * User lib file
 */
import Spotify from "../Spotify";
import Client from "../Client";
import PublicUser from "../structures/PublicUser";
import Playlist from "../structures/Playlist";
/**
 * Class of all methods related to users
 */
declare class User extends Spotify {
    client: Client;
    constructor(token: string, client: Client);
    /**
     * **Example:**
     * ```js
     * const user = await spotify.users.get("id"); // Returns the user details by id...
     * ```
     *
     * @param id Id of the user
     */
    get(id: string, force?: boolean): Promise<PublicUser>;
    /**
     * **Example:**
     * ```js
     * const playlists = await spotify.users.getPlaylists("id"); // Returns the user playlists by id...
     * ```
     *
     * @param id Id of the user
     */
    getPlaylists(id: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Playlist[]>;
}
export default User;
