import Playlist from '../structures/Playlist';
import User from '../structures/User';
import BaseManager from './BaseManager';
import { RawObject } from '../Types';
import { handleError } from '../Errors';

/**
 * A class which manages the users
 */
export default class UserManager extends BaseManager{

    /**
     * Get a spotify user information by spotify id!
     * 
     * @param id Spotify user id
     * @param force If true, will directly fetch else will search for cache first!
     * @example await client.users.get('id');
     */
    async get(id: string, force: boolean = !this.client.cacheOptions.cacheUsers): Promise<User | null> {

        if(!force){
            let existing = this.client.cache.users.get(id);
            if(existing) return existing;
        }

        try{
            const user = new User(await this.fetch(`/users/${id}`), this.client);
            if(this.client.cacheOptions.cacheUsers) this.client.cache.users.set(user.id, user);
            return user;
        }catch(e){
            return handleError(e);
        }

    }

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
    async getPlaylists(id: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<Playlist[]> {
        
        try{
            const playlists = (await this.fetch(`/users/${id}/playlists`, { 
                params: options as RawObject 
            })).items.map(x => new Playlist(x, this.client)) as Playlist[];

            if(this.client.cacheOptions.cachePlaylists){
                for(let i = 0; i < playlists.length; i++) this.client.cache.playlists.set(playlists[i].id, playlists[i]);
            }

            return playlists;
        }catch(e){
            return handleError(e) || [];
        }

    }

};

export type { User };