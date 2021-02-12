/**
 * User Manager file
 */

import { MissingParamError, UnexpectedError } from "../Error";
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
    constructor(client: Client){
        super(client.token);
        this.client = client;
    }

    /**
     * Returns the spotify user information by its id!
     * 
     * @param id Spotify id of the user
     * @param force If true, will forcefully fetch data else will search for cache!
     * @example const user = await spotify.users.get("id"); // Returns the user details by id...
     */
    async get(id: string, force: boolean = false): Promise<User> {

        if(!id) throw new MissingParamError("missing id to fetch user");
        if(!force){
            let existing = this.client.cache.users.get(id);
            if(existing) return existing;
        }

        try{
            const data = new User(await this.fetch({ link: `v1/users/${id}` }), this.client);
            if(this.client.cacheOptions.cacheUsers) this.client.cache.users.push(data);
            return data;
        }catch(e) {
            throw new UnexpectedError(e);
        };

    };

    /**
     * Get a spotify user's playlists by the user's id!
     * 
     * @param id Id of the user
     * @param options Options to make your data collection better!
     * @example const playlists = await spotify.users.getPlaylists("id"); // Returns the user playlists by id...
     */
    async getPlaylists(id: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<Playlist[]> {

        try{
            if(!id) throw new MissingParamError("Missing id to fetch user!");

            const data = await this.fetch({
                link: `v1/users/${id}/playlists`,
                params: {
                    limit: options.limit,
                    ...options.params
                }
            });

            const items = data.items.map(x => new Playlist(x, this.client))
            if(this.client.cacheOptions.cachePlaylists) this.client.cache.playlists.push(...items);
            return items
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

    /**
     * Verify if current user follows this user!
     * Will only work if you have a current user token!
     * 
     * @param ids Ids of the user or users
     */
    async follows(...ids: string[]): Promise<boolean[]> {
        return await this.client.user.followsUser(...ids);
    }

    /**
     * Follow a user by id!
     * Will only work if you have a current user token!
     * 
     * @param ids Ids of the user or users
     */
    async follow(...ids: string[]): Promise<void> {
        await this.client.user.followUser(...ids);
    }

    /**
     * Unfollow a user by id!
     * Will only work if you have a current user token!
     * 
     * @param ids Ids of the user or users
     */
    async unfollow(...ids: string[]): Promise<void> {
        await this.client.user.unfollowUser(...ids);
    }

};