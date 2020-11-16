"use strict";
/**
 * Track lib file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
/**
 * Class of all methods related to tracks
 */
class Track extends Spotify_1.default {
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
    async search(q, options) {
        return new Promise(async (resolve, reject) => {
            if (!q)
                reject(new Error_1.MissingParamError("missing query"));
            if (!options)
                options = {};
            try {
                const res = await this.fetch({
                    link: `v1/search`,
                    params: {
                        q: encodeURIComponent(q),
                        type: "track",
                        market: "US",
                        limit: options.limit || 20,
                    },
                });
                let items = res.tracks.items;
                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    }
                    ;
                }
                ;
                resolve(items);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * const track = await spotify.tracks.get("track id"); // Get tracks by id...
     * ```
     *
     * @param id Id of the track
     */
    async get(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            try {
                const data = await this.fetch({
                    link: `v1/tracks/${id}`,
                });
                const codeImage = await this.getCodeImage(data.uri);
                data.codeImage = codeImage.image;
                data.dominantColor = codeImage.dominantColor;
                resolve(data);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * const audioAnalysis = await spotify.tracks.audioAnalysis("track id"); // Get audio analysis of the track
     * ```
     *
     * @param id Id of the track
     */
    async audioFeatures(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            try {
                const res = await this.fetch({
                    link: `v1/audio-features/${id}`,
                });
                resolve(res);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * const audioFeatures = await spotify.tracks.audioFeatures("track id"); // Get audio features of the track
     * ```
     *
     * @param id Id of the track
     */
    async audioAnalysis(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            try {
                const res = await this.fetch({
                    link: `v1/audio-analysis/${id}`,
                });
                resolve(res);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    ;
}
;
exports.default = Track;
//# sourceMappingURL=Track.js.map