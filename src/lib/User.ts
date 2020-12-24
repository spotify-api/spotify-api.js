/**
 * User lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import Client from "../Client";
import PublicUser from "../structures/PublicUser";
import Playlist from "../structures/Playlist";

/**
 * Class of all methods related to users
 */
class User extends Spotify {

    client: Client;

    constructor(token: string, client: Client){
        super(token);
        this.client = client;
    }

    /**
     * **Example:**
     * ```js
     * const user = await spotify.users.get("id"); // Returns the user details by id...
     * ```
     * 
     * @param id Id of the user
     */
    async get(id: string, force: boolean = false): Promise<PublicUser> {

        if(!id) throw new MissingParamError("missing id to fetch user");
        if(!force){
            let existing = this.client.cache.users.get(id);
            if(existing) return existing;
        }

        try{
            const data = new PublicUser(await this.fetch({ link: `v1/users/${id}` }), this.client);
            if(this.client.cacheOptions.cacheUsers) this.client.cache.users.push(data);
            return data;
        }catch(e) {
            throw new UnexpectedError(e);
        };

    };

    /**
     * **Example:**
     * ```js
     * const playlists = await spotify.users.getPlaylists("id"); // Returns the user playlists by id...
     * ```
     * 
     * @param id Id of the user
     */
    async getPlaylists(id: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<Playlist[]> {

        try{
            if(!id) throw new MissingParamError("missing id to fetch user");

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
     * Verify if current user follows this user but only if you have the required scopes
     * 
     * @param ids Ids of the user or users
     */
    async follows(...ids: string[]): Promise<boolean[]> {
        return await this.client.user.followsUser(...ids);
    }

    /**
     * Follows a user by id
     * 
     * @param ids Ids of the user or users
     */
    async follow(...ids: string[]): Promise<void> {
        await this.client.user.followsUser(...ids);
    }

};

export default User;