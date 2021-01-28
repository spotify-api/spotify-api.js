/**
 * Track lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import { TrackAudioFeatures, TrackAudioAnalysis } from "../structures/Interface";
import Client from '../Client';
import Spotify from "../Spotify";
import TrackStructure from "../structures/Track";

/**
 * Class of all methods related to tracks
 */
class Track extends Spotify {

    client: Client;

    constructor(token: string, client: Client){
        super(token);
        this.client = client;
    }

    /**
     * **Example:**
     * ```js
     * const track = await spotify.tracks.search("oh my god by alec benjamin", { limit: 1, }); // Searches for the track and limit will be 20 by default
       const advanced = await spotify.tracks.search("oh my god by alec benjamin", {
           limit: 1,
           advanced: true,
       }); // Same but this will return a `codeImage` and `dominantColor` key with it!
     * ```
     *
     * @param q Your query
     * @param options Options to configure your search...
     */
    async search(q: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<TrackStructure[]> {

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

            let items = res.tracks.items.map(x => new TrackStructure(x, this.client));
            if(this.client.cacheOptions.cacheTracks) this.client.cache.tracks.push(...items);

            return items;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * const track = await spotify.tracks.get("track id"); // Get tracks by id...
     * ```
     * 
     * @param id Id of the track
     * @param options Options such as force fetch
     */
    async get(
        id: string,
        force: boolean = false
    ): Promise<TrackStructure> {

        if(!id) throw new MissingParamError("missing id");

        if(!force){
            let existing = this.client.cache.tracks.get(id);
            if(existing) return existing;
        }

        try{
            const data = new TrackStructure(await this.fetch({ link: `v1/tracks/${id}?market=US` }), this.client);
            if(this.client.cacheOptions.cacheTracks) this.client.cache.tracks.push(data);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

    /**
     * **Example:**
     * ```js
     * const audioFeatures = await spotify.tracks.audioFeatures("track id"); // Get audio features of the track
     * ```
     * 
     * @param id Id of the track
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
     * **Example:**
     * ```js
     * const audioAnalysis = await spotify.tracks.audioAnalysis("track id"); // Get audio analysis of the track
     * ```
     * 
     * @param id Id of the track
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
     * @param ids Ids od the track or tracks
     */
    async delete(ids: string | string[]): Promise<void> {
        await this.client.user.deleteTrack(ids);
    }

    /**
     * This method uses client.user.addTrack
     * This method adds the track from your save list
     * 
     * @param ids Ids od the track or tracks
     */
    async add(ids: string | string[]): Promise<void> {
        await this.client.user.addTrack(ids);
    }

};

export default Track;
