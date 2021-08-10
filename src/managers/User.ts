import type { Client } from "../Client";
import { User } from "../structures/User";
import * as Cache from "../Cache";

/**
 * A manager to perform actions with belongs to to the spotify user web api.
 */
export class UserManager {

    /**
     * A manager to perform actions with belongs to to the spotify user web api.
     * 
     * @param client The spotify api client.
     * @example const users = new UserManager(client);
     */
    public constructor(public client: Client) {}

    /**
     * Get a spotify user information by spotify id!
     * 
     * @param id The spotify user id.
     * @param force When true, will directly fetch else will search for the cache first!
     * @example await client.users.get('id');
     */
    async get(id: string, force = !this.client.cacheSettings.users): Promise<User | null> {
        if (!force && Cache.users.has(id)) return new User(this.client, Cache.users.get(id)!);
        return new User(this.client, await this.client.fetch(`/users/${id}`));
    }

}