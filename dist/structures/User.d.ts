/**
 * Public User Structure
 */
import { Image, RawObject } from "./Interface";
import Client from '../Client';
import Playlist from './Playlist';
/**
 * Spotify Api's User object!
 */
export default class User {
    readonly data: any;
    readonly client: Client;
    name: string;
    externalUrls: RawObject;
    href: string;
    id: string;
    uri: string;
    images: Image[];
    playlists: Playlist[];
    type: string;
    totalFollowers?: number;
    /**
     * The Spotify Api's User object!
     *
     * @param data The raw spotify user data!
     * @param client The spotify client
     * @example const user = new PublicUser(data, client);
     */
    constructor(data: any, client: Client);
    /**
     * Fetches tracks and refreshes the cach!
     *
     * @example user.fetch();
     */
    fetch(): Promise<User>;
    /**
     * Returns a code image
     *
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Returns the user's saved playlists!
     *
     * @param limit Limit of results
     * @param force If true will directly fetch and return else will return you from cache
     */
    getPlaylists(limit?: number, force?: boolean): Promise<Playlist[]>;
    /**
     * Verify if this user is followed by the current user but only if you have the required scopes
     * This method uses the client.user.followsUser
     */
    follows(): Promise<boolean>;
    /**
     * Follow this user!
     */
    follow(): Promise<void>;
    /**
     * Unfollow this user!
     */
    unfollow(): Promise<void>;
}
