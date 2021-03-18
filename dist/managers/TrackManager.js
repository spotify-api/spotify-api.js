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
