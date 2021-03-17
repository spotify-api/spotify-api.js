import { Image, RawObject } from "../Types";
import Playlist from "./Playlist";
import Client from "../Client";
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
    playlists: Playlist[];
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
     * Fetches user and refreshes the cach!
     *
     * @example user.fetch();
     */
    fetch(): Promise<User>;
    /**
     * Returns the saved playlist of the user!
     *
     * @param options Options containing the offset and limit!
     * @param force If true, will directly fetch else will search for cache first!
     * @example await user.getPlaylists({
     *     limit: 5,
     *     offset: 2
     * });
     */
    getPlaylists(options?: {
        limit?: number;
        offset?: number;
    }, force?: boolean): Promise<Playlist[]>;
    /**
     * Returns a code image
     *
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
}
