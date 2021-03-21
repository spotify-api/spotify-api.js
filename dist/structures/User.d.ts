import { Image, Paging, PagingOptions, RawObject } from "../Types";
import Playlist from "./Playlist";
import Client from "../Client";
import { CreatePlaylist } from "../UserClient";
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
    type: string;
    totalFollowers?: number;
    /**
     * The Spotify Api's User object!
     *
     * @param data The raw spotify user data!
     * @param client The spotify client
     * @example const user = new Spotify.User(data, client);
     */
    constructor(data: any, client: Client);
    /**
     * Fetches user and refreshes the cache!
     * @example user.fetch();
     */
    fetch(): Promise<User>;
    /**
     * Returns the saved playlist of the user!
     *
     * @param options Options containing the offset and limit!
     * @example await user.getPlaylists();
     */
    getPlaylists(options?: PagingOptions): Promise<Paging<Playlist>>;
    /**
     * Verify if the user follow a playlist by its id
     *
     * @param id Spotify playlist id
     * @example const follows = await user.followsPlaylist('id');
     */
    followsPlaylist(id: string): Promise<boolean>;
    /**
     * Follow this user!
     * @example await user.follow();
     */
    follow(): Promise<boolean>;
    /**
     * Unfollow this user!
     * @example await user.unfollow();
     */
    unfollow(): Promise<boolean>;
    /**
     * Verify if the current user follows this user!
     * @example const follows = await users.follows();
     */
    follows(): Promise<boolean>;
    /**
     * Create a spotify playlist for this user!
     *
     * @param options Options to create a playlist except userID field
     * @example await client.user.createPlaylist({
     *     name: 'Funky playlist',
     *     description: 'My own cool playlist created by spotify-api.js',
     *     public: true,
     *     collaborative: false
     * });
     */
    createPlaylist(options: Omit<CreatePlaylist, 'userID'>): Promise<Playlist | null>;
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
}
