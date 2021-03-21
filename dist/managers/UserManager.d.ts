import Playlist from '../structures/Playlist';
import User from '../structures/User';
import BaseManager from './BaseManager';
import { Paging } from '../Types';
/**
 * A class which manages the users api
 */
export default class UserManager extends BaseManager {
    /**
     * Get a spotify user information by spotify id!
     *
     * @param id Spotify user id
     * @param force If true, will directly fetch else will search for cache first!
     * @example await client.users.get('id');
     */
    get(id: string, force?: boolean): Promise<User | null>;
    /**
     * Returns the saved playlist of the user!
     *
     * @param id The spotify user id
     * @param options Options containing the offset and limit!
     * @example await client.users.getPlaylists('id', {
     *     limit: 5,
     *     offset: 2
     * });
     */
    getPlaylists(id: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<Paging<Playlist>>;
    /**
     * Follow one or many users!
     *
     * @param ids ID of the spotify users
     * @example await client.users.follow('id', 'id2');
     */
    follow(...ids: string[]): Promise<boolean>;
    /**
     * Unfollow one or many users!
     *
     * @param ids ID of the spotify users
     * @example await client.users.unfollow('id', 'id2');
     */
    unfollow(...ids: string[]): Promise<boolean>;
    /**
     * Verify if the current user follows one or many users
     *
     * @param ids ID of the spotify users
     * @example const [followsFirstUser, followsSecondUser] = await client.users.follows('id1', 'id2');
     */
    follows(...ids: string[]): Promise<boolean[]>;
}
export type { User };
