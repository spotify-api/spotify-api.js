"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Track_1 = __importDefault(require("../structures/Track"));
const Errors_1 = require("../Errors");
const BaseManager_1 = __importDefault(require("./BaseManager"));
/**
 * A class which manages the tracks api!
 */
class TrackManager extends BaseManager_1.default {
    /**
     * Search tracks!
     *
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.tracks.search('some query');
     */
    async search(query, options) {
        try {
            const data = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'track',
                    q: query
                }
            }));
            const tracks = data.tracks.items.map(x => new Track_1.default(x, this.client));
            ;
            if (this.client.cacheOptions.cacheTracks) {
                for (let i = 0; i < tracks.length; i++)
                    this.client.cache.tracks.set(tracks[i].id, tracks[i]);
            }
            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: tracks
            };
        }
        catch (e) {
            return Errors_1.handleError(e) || {
                limit: 0,
                offset: 0,
                total: 0,
                items: []
            };
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
    async get(id, force = !this.client.cacheOptions.cacheTracks, market = "US") {
        try {
            if (!force) {
                let exisiting = this.client.cache.tracks.get(id);
                if (exisiting)
                    return exisiting;
            }
            const track = new Track_1.default(await this.fetch(`/tracks/${id}`, {
                params: { market }
            }), this.client);
            if (this.client.cacheOptions.cacheTracks)
                this.client.cache.tracks.set(track.id, track);
            return track;
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    /**
     * Get multiple tracks at one fetch!
     *
     * @param options Basic GetMultipleOptions
     * @example await client.tracks.getMultiple({
     *     ids: ['123456789']
     * })
     */
    async getMultiple(options) {
        try {
            const def = { market: 'US', ids: [] };
            Object.assign(def, options);
            if (!def.ids.length || def.ids.length > 20)
                throw new Errors_1.UnexpectedError("You must provide more than 1 and less than 20 ids to fetch multiple tracks!");
            def.ids = def.ids.join(',');
            const tracks = (await this.fetch('/tracks', {
                params: def
            })).tracks.map(x => new Track_1.default(x, this.client));
            if (this.client.cacheOptions.cacheTracks) {
                for (let i = 0; i < tracks.length; i++)
                    this.client.cache.tracks.set(tracks[i].id, tracks[i]);
            }
            return tracks;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Returns the audio features of the spotify track
     *
     * @param id The id of the spotify track
     * @example await client.tracks.getAudioFeatures('id');
     */
    async getAudioFeatures(id) {
        try {
            return await this.fetch(`/audio-features/${id}`);
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    /**
     * Returns the audio analysis of the spotify track
     *
     * @param id The id of the spotify track
     * @example await client.tracks.getAudioAnalysis('id');
     */
    async getAudioAnalysis(id) {
        try {
            return await this.fetch(`/audio-analysis/${id}`);
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
}
exports.default = TrackManager;
;
