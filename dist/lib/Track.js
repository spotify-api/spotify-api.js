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
const Track_1 = __importDefault(require("../structures/Track"));
/**
 * Class of all methods related to tracks
 */
class Track extends Spotify_1.default {
    constructor(token, client) {
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
    async search(q, options = { limit: 20 }) {
        if (!q)
            throw new Error_1.MissingParamError("missing query");
        try {
            const res = await this.fetch({
                link: `v1/search`,
                params: {
                    q,
                    type: "track",
                    market: "US",
                    limit: options.limit,
                    ...options.params
                },
            });
            let items = res.tracks.items.map(x => new Track_1.default(x, this.client));
            if (this.client.cacheOptions.cacheTracks)
                this.client.cache.tracks.push(...items);
            return items;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * const track = await spotify.tracks.get("track id"); // Get tracks by id...
     * ```
     *
     * @param id Id of the track
     * @param options Options such as force fetch
     */
    async get(id, force = false) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        if (!force) {
            let existing = this.client.cache.tracks.get(id);
            if (existing)
                return existing;
        }
        try {
            const data = new Track_1.default(await this.fetch({ link: `v1/tracks/${id}` }), this.client);
            if (this.client.cacheOptions.cacheTracks)
                this.client.cache.tracks.push(data);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
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
    async audioFeatures(id) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        try {
            return await this.fetch({ link: `v1/audio-features/${id}` });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
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
    async audioAnalysis(id) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        try {
            return await this.fetch({ link: `v1/audio-analysis/${id}` });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
}
;
exports.default = Track;
