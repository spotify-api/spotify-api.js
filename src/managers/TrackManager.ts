import Track from '../structures/Track';
import { TrackAudioAnalysis, TrackAudioFeatures } from '../Types';
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
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where the data needs to be fetched from
     * @example await client.tracks.get('id');
     */
    async get(id: string, force: boolean = !this.client.cacheOptions.cacheTracks, market: string = "US"): Promise<Track | null> {
        
        try{
            if(!force){
                let exisiting = this.client.cache.tracks.get(id);
                if(exisiting) return exisiting;
            }

            const track = new Track(await this.fetch(`/tracks/${id}`, {
                params: { market }
            }), this.client) as Track;
            if(this.client.cacheOptions.cacheTracks) this.client.cache.tracks.set(track.id, track);
            return track;
        }catch(e){
            return handleError(e);
        }

    }

    /**
     * Returns the audio features of the spotify track
     * 
     * @param id The id of the spotify track
     * @example await client.tracks.getAudioFeatures('id');
     */
    async getAudioFeatures(id: string): Promise<TrackAudioFeatures | null> {
        try{
            return await this.fetch(`/audio-features/${id}`);
        }catch(e){
            return handleError(e);
        }
    }

    /**
     * Returns the audio analysis of the spotify track
     * 
     * @param id The id of the spotify track
     * @example await client.tracks.getAudioAnalysis('id');
     */
    async getAudioAnalysis(id: string): Promise<TrackAudioAnalysis | null> {
        try{
            return await this.fetch(`/audio-analysis/${id}`);
        }catch(e){
            return handleError(e);
        }
    }

};

export type { Track };