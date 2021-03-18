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
     * @param force await client.users.get('id');
     * @example await client.tracks.get('id');
     */
    async get(id, force = !this.client.cacheOptions.cacheTracks) {
        try {
            if (!force) {
                let exisiting = this.client.cache.tracks.get(id);
                if (exisiting)
                    return exisiting;
            }
            const track = new Track_1.default(await this.fetch(`/tracks/${id}`), this.client);
            if (this.client.cacheOptions.cacheTracks)
                this.client.cache.tracks.set(track.id, track);
            return track;
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
}
exports.default = TrackManager;
;
