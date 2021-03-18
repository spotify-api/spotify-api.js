import Track from '../structures/Track';
import { SearchOptions, TrackAudioAnalysis, TrackAudioFeatures } from '../Types';
import { handleError } from '../Errors';
import BaseManager from './BaseManager';

/**
 * A class which manages the tracks api!
 */
export default class TrackManager extends BaseManager{

    /**
     * Search tracks!
     * 
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.tracks.search('some query');
     */
     async search(query: string, options: Omit<SearchOptions, 'type'>): Promise<Track[]> {

        try{
            const tracks = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'track',
                    q: query
                }
            })).tracks.items.map(x => new Track(x, this.client));;

            if(this.client.cacheOptions.cacheTracks){
                for(let i = 0; i < tracks.length; i++) this.client.cache.tracks.set(tracks[i].id, tracks[i]);
            }

            return tracks;
        }catch(e){
            return handleError(e) || [];
        }

    }

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