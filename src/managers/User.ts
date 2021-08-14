import type { Client } from "../Client";
import type { User } from "../structures/User";
import type { Playlist } from "../structures/Playlist";
import { Cache, createCacheStruct, createCacheStructArray } from "../Cache";

/**
 * A manager to perform actions which belongs to the spotify user web api.
 */
export class UserManager {

    /**
     * A manager to perform actions which belongs to the spotify user web api.
     * 
     * @param client The spotify api client.
     * @example const users = new UserManager(client);
     */
    public constructor(public client: Client) {}

    /**
     * Get an user's information.
     * 
     * @param id The spotify user id.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example const user = await client.users.get('id');
     */
    public async get(id: string, force = !this.client.cacheSettings.users): Promise<User | null> {
        if (!force && Cache.users.has(id)) return Cache.users.get(id)!;
        const fetchedData = await this.client.fetch(`/users/${id}`);
        return fetchedData ? createCacheStruct('users', this.client, fetchedData) : null;
    }

    /**
     * Get the list of playlists of a user by the user's spotify id.
     * 
     * @param id The spotify user id.
     * @param options The limit, offset query parameter options.
     * @example const playlists = await client.users.getPlaylists('id');
     */
    public async getPlaylists(
        id: string,
        options: {
            limit?: number,
            offset?: number
        } = {}
    ): Promise<Playlist[]> {
        const fetchedData = await this.client.fetch(`/users/${id}/playlists`, { params: options });
        return fetchedData ? createCacheStructArray('playlists', this.client, fetchedData.items) : [];
    }

    /**
     * Verify a list of users follows a paticular playlist.
     * 
     * @param playlistID The id of the spotify playlist.
     * @param ids The array of spotify user ids.
     * @example const [userFollows] = await client.user.followsPlaylist('id');
     */
    public followsPlaylist(playlistID: string, ...ids: string[]): Promise<boolean[]> {
        return this.client.fetch(`/playlists/${playlistID}/followers/contains`, {
            params: { ids: ids.join(',') }
        }).then(x => x || [])
    }

}