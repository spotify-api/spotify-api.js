import { Image, PagingOptions, RawObject } from "../Types";
import Playlist from "./Playlist";
import Client from "../Client";
import Collection from "../Collection";
 
/**
 * Spotify Api's User object!
 */
export default class User {
 
    readonly data: any;
    readonly client!: Client;
 
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
    constructor(data: any, client: Client){
 
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
 
        this.name = data.display_name;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;
        this.images = data.images || [];
        this.playlists = [];
        if('followers' in data) this.totalFollowers = data.followers.total;
 
    };
 
    /**
     * Fetches user and refreshes the cache!
     * @example user.fetch();
     */
    async fetch(): Promise<User> {
        return await this.client.users.get(this.id, true) as User;
    }

    /**
     * Returns the saved playlist of the user!
     * 
     * @param options Options containing the offset and limit!
     * @example await user.getPlaylists();
     */
    async getPlaylists(options?: PagingOptions): Promise<Playlist[]> {
        const playlists = await this.client.users.getPlaylists(this.id, options);
        this.playlists = playlists;
        return playlists;
    }
 
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
     
};