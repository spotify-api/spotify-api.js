import Track from '../structures/Track';
import { handleError } from '../Errors';
import BaseManager from './BaseManager';

/**
 * A class which manages the tracks api!
 */
export default class TrackManager extends BaseManager{

    /**
     * Returns the spotify track information by id
     * 
     * @param id Spotify track id
     * @param force await client.users.get('id');
     * @example await client.tracks.get('id');
     */
    async get(id: string, force: boolean = !this.client.cacheOptions.cacheTracks): Promise<Track | null> {
        
        try{
            if(!force){
                let exisiting = this.client.cache.tracks.get(id);
                if(exisiting) return exisiting;
            }

            const track = new Track(await this.fetch(`/tracks/${id}`), this.client) as Track;
            if(this.client.cacheOptions.cacheTracks) this.client.cache.tracks.set(track.id, track);
            return track;
        }catch(e){
            return handleError(e);
        }

    }

};

export type { Track };