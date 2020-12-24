/**
 * Public User Structure
 */
import { Image } from "./Interface";
import Client from '../Client';
import Playlist from './Playlist';
/**
 * Public User Class
 */
export default class User {
    readonly data: any;
    readonly client: Client;
    name: string;
    externalUrls: any;
    href: string;
    id: string;
    type: string;
    uri: string;
    images: Image[];
    playlists: Playlist[];
    codeImage: string;
    totalFollowers?: number;
    /**
     * **Example:**
     *
     * ```js
     * const user = new PublicUser(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     * @param client Main client
     */
    constructor(data: any, client: Client);
    /**
     * Fetches tracks
     */
    fetch(): Promise<User>;
    /**
     * Returns you the user playlists
     *
     * @param force If true will directly fetch and return else will return you from cache
     * @param limit Limit of results
     */
    getPlaylists(force?: boolean, limit?: number): Promise<Playlist[]>;
    /**
     * Verify if this user is followed by the current user but only if you have the required scopes
     * This method uses the client.user.followsUser
     */
    follows(): Promise<boolean>;
    /**
     * Follow this user
     */
    follow(): Promise<void>;
    /**
     * Unfollows a user
     */
    unfollow(): Promise<void>;
}
