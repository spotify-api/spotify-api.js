/**
 * Track lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import TrackStructure from "../structures/Track";
import { TrackAudioFeatures, TrackAudioAnalysis } from "../structures/Interface";

/**
 * Class of all methods related to tracks
 */
class Track extends Spotify {

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
    async search(
        q: string,
        options: {
            limit?: number;
            advanced?: boolean;
            params?: any;
        } = {
            limit: 20
        }
    ): Promise<TrackStructure[]> {

        return new Promise(async (resolve, reject) => {
            if (!q) reject(new MissingParamError("missing query"));

            try {
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

                let items = res.tracks.items.map(x => new TrackStructure(x));

                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    };
                };

                resolve(items);
            } catch (e) {
                reject(new UnexpectedError(e));
            }
        });

    };

    /**
     * **Example:**
     * ```js
     * const track = await spotify.tracks.get("track id"); // Get tracks by id...
     * ```
     * 
     * @param id Id of the track
     * @param options Options such as advanced
     */
    async get(
        id: string,
        options: { advanced?: boolean } = {}
    ): Promise<TrackStructure> {

        return new Promise(async (resolve, reject) => {
            if (!id) reject(new MissingParamError("missing id"));

            try{
                const data = new TrackStructure(await this.fetch({ link: `v1/tracks/${id}`, }));

                if(options.advanced) {
                    const codeImage = await this.getCodeImage(data.uri);
                    data.codeImage = codeImage.image;
                    data.dominantColor = codeImage.dominantColor;
                };

                resolve(data);
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

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

        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError("missing id"));

            try{
                resolve(await this.fetch({ link: `v1/audio-features/${id}` }));
            }catch(e){
                reject(new UnexpectedError(e));
            }
        });

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

        return new Promise(async (resolve, reject) => {
            if (!id) reject(new MissingParamError("missing id"));

            try {
                resolve(await this.fetch({ link: `v1/audio-analysis/${id}` }));
            } catch (e) {
                reject(new UnexpectedError(e));
            };
        });

    };

};

export default Track;
