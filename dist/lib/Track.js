"use strict";
/**
 * Track Manager file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
const Track_1 = __importDefault(require("../structures/Track"));
/**
 * Class of all Spotify Api Methods related to tracks
 */
class TrackManager extends Spotify_1.default {
    /**
     * Class of all Spotify Api Methods related to shows
     *
     * @param client Your Spotify Client
     */
    constructor(client) {
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
    async search(q, options = { limit: 20 }) {
        if (!q)
            throw new Error_1.MissingParamError("missing query");
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
     * Returns Spotify Track information by the track id!
     *
     * @param id Id of the track
     * @param force If true will force fetch, if false then will first search cache!
     * @example const track = await spotify.tracks.get("track id"); // Get tracks by id...
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
            const data = new Track_1.default(await this.fetch({ link: `v1/tracks/${id}?market=US` }), this.client);
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
     * Returns the audio features of the track by the track id!
     *
     * @param id Id of the track
     * @example const audioFeatures = await spotify.tracks.audioFeatures("track id"); // Get audio features of the track
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
     * Returns the audio analysis of the track by the track id!
     *
     * @param id Id of the track
     * @example const audioAnalysis = await spotify.tracks.audioAnalysis("track id"); // Get audio analysis of the track
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
    /**
     * This method uses client.user.deleteTrack
     * This method deletes the track from your save list
     *
     * @param ids Ids od the tracks
     */
    async delete(...ids) {
        await this.client.user.deleteTrack(...ids);
    }
    /**
     * This method uses client.user.addTrack
     * This method adds the track from your save list
     *
     * @param ids Ids of the track or tracks
     */
    async add(...ids) {
        await this.client.user.addTrack(...ids);
    }
}
exports.default = TrackManager;
;
