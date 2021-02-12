/**
 * Public User Structure
 */
import { Image, RawObject } from "./Interface";
import Client from '../Client';
import Playlist from './Playlist';
import Util from '../Spotify';

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
     * Fetches tracks and refreshes the cach!
     * 
     * @example user.fetch();
     */
    async fetch(): Promise<User> {
        return await this.client.users.get(this.id, true);
    }

    /**
     * Returns a code image
     * 
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Returns the user's saved playlists!
     * 
     * @param limit Limit of results
     * @param force If true will directly fetch and return else will return you from cache
     */
    async getPlaylists(limit: number = 20, force: boolean = false): Promise<Playlist[]> {
        if(!force && this.playlists.length) return this.playlists;

        const data = await this.client.users.getPlaylists(this.id, { limit });
        this.playlists = data;
        return data;
    }

    /**
     * Verify if this user is followed by the current user but only if you have the required scopes
     * This method uses the client.user.followsUser
     */
    async follows(): Promise<boolean> {
        return (await this.client.user.followsUser(this.id))[0];
    }

    /**
     * Follow this user!
     */
    async follow(): Promise<void> {
        await this.client.user.followUser(this.id);
    }

    /**
     * Unfollow this user!
     */
    async unfollow(): Promise<void> {
        await this.client.user.unfollowUser(this.id);
    }
    
};