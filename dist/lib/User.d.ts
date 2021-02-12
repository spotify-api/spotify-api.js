/**
 * User Manager file
 */
import Spotify from "../Spotify";
import Client from "../Client";
import User from "../structures/User";
import Playlist from "../structures/Playlist";
/**
 * Class of all Spotify Api Methods related to users
 */
export default class UserManager extends Spotify {
    client: Client;
    /**
     * Class of all Spotify Api Methods related to users!
     *
     * @param client Your spotify client!
     */
    constructor(client: Client);
    /**
     * Returns the spotify user information by its id!
     *
     * @param id Spotify id of the user
     * @param force If true, will forcefully fetch data else will search for cache!
     * @example const user = await spotify.users.get("id"); // Returns the user details by id...
     */
    get(id: string, force?: boolean): Promise<User>;
    /**
     * Get a spotify user's playlists by the user's id!
     *
     * @param id Id of the user
     * @param options Options to make your data collection better!
     * @example const playlists = await spotify.users.getPlaylists("id"); // Returns the user playlists by id...
     */
    getPlaylists(id: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Playlist[]>;
    /**
     * Verify if current user follows this user!
     * Will only work if you have a current user token!
     *
     * @param ids Ids of the user or users
     */
    follows(...ids: string[]): Promise<boolean[]>;
    /**
     * Follow a user by id!
     * Will only work if you have a current user token!
     *
     * @param ids Ids of the user or users
     */
    follow(...ids: string[]): Promise<void>;
    /**
     * Unfollow a user by id!
     * Will only work if you have a current user token!
     *
     * @param ids Ids of the user or users
     */
    unfollow(...ids: string[]): Promise<void>;
}
