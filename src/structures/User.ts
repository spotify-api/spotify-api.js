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
        return playlists;
    }

    /**
     * Verify if the user follow a playlist by its id
     * 
     * @param id Spotify playlist id
     * @example const follows = await user.followsPlaylist('id');
     */
    async followsPlaylist(id: string): Promise<boolean> {
        return (await this.client.playlists.userFollows(id, this.id))[0] || false;
    }

    /**
     * Follow this user!
     * @example await user.follow();
     */
    async follow(): Promise<boolean> {
        return await this.client.user.followUsers(this.id);
    }

    /**
     * Unfollow this user!
     * @example await user.unfollow();
     */
    async unfollow(): Promise<boolean> {
        return await this.client.user.unfollowUsers(this.id);
    }

    /**
     * Verify if the current user follows this user!
     * @example const follows = await users.follows();
     */
    async follows(): Promise<boolean> {
        return (await this.client.user.followsUsers(this.id))[0] || false;
    }
 
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
     
};