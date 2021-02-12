/**
 * Track Manager file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import { TrackAudioFeatures, TrackAudioAnalysis } from "../structures/Interface";
import Client from '../Client';
import Spotify from "../Spotify";
import Track from "../structures/Track";

/**
 * Class of all Spotify Api Methods related to tracks
 */
export default class TrackManager extends Spotify {

    client: Client;

    /**
     * Class of all Spotify Api Methods related to shows
     * 
     * @param client Your Spotify Client
     */
    constructor(client: Client){
        super(client.token);
        this.client = client;
    }

    /**
     * Search tracks efficiently across spotify api!
     *
     * @param q Your query
     * @param options Options to configure your search...
     * @example const track = await spotify.tracks.search("oh my god by alec benjamin", { limit: 1, }); // Searches for the track and limit will be 20 by default
     */
    async search(q: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<Track[]> {

        if(!q) throw new MissingParamError("missing query");

        try{
            const res = await this.fetch({
                link: `v1/search`,
                params: {
                    q: encodeURIComponent(q),
                    type: "track",
                    market: "US",
                    limit: options.limit,
                    ...options.params
                },
            });

            let items = res.tracks.items.map(x => new Track(x, this.client));
            if(this.client.cacheOptions.cacheTracks) this.client.cache.tracks.push(...items);

            return items;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Returns Spotify Track information by the track id!
     * 
     * @param id Id of the track
     * @param force If true will force fetch, if false then will first search cache!
     * @example const track = await spotify.tracks.get("track id"); // Get tracks by id...
     */
    async get(id: string, force: boolean = false): Promise<Track> {

        if(!id) throw new MissingParamError("missing id");

        if(!force){
            let existing = this.client.cache.tracks.get(id);
            if(existing) return existing;
        }

        try{
            const data = new Track(await this.fetch({ link: `v1/tracks/${id}?market=US` }), this.client);
            if(this.client.cacheOptions.cacheTracks) this.client.cache.tracks.push(data);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

    /**
     * Returns the audio features of the track by the track id!
     * 
     * @param id Id of the track
     * @example const audioFeatures = await spotify.tracks.audioFeatures("track id"); // Get audio features of the track
     */
    async audioFeatures(id: string): Promise<TrackAudioFeatures> {

        if(!id) throw new MissingParamError("missing id");

        try{
            return await this.fetch({ link: `v1/audio-features/${id}` });
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Returns the audio analysis of the track by the track id!
     * 
     * @param id Id of the track
     * @example const audioAnalysis = await spotify.tracks.audioAnalysis("track id"); // Get audio analysis of the track
     */
    async audioAnalysis(id: string): Promise<TrackAudioAnalysis> {

        if(!id) throw new MissingParamError("missing id");

        try{
            return await this.fetch({ link: `v1/audio-analysis/${id}` });
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

    /**
     * This method uses client.user.deleteTrack
     * This method deletes the track from your save list
     * 
     * @param ids Ids od the tracks
     */
    async delete(...ids: string[]): Promise<void> {
        await this.client.user.deleteTrack(...ids);
    }

    /**
     * This method uses client.user.addTrack
     * This method adds the track from your save list
     * 
     * @param ids Ids of the track or tracks
     */
    async add(...ids: string[]): Promise<void> {
        await this.client.user.addTrack(...ids);
    }

};