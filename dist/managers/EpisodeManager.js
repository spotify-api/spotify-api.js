"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../Errors");
const Episode_1 = __importDefault(require("../structures/Episode"));
const BaseManager_1 = __importDefault(require("./BaseManager"));
/**
 * A class which manages the episodes
 */
class EpisodeManager extends BaseManager_1.default {
    /**
     * Get a spotify episode information by spotify id!
     *
     * @param id Spotify episode id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where we need to fetch the details!
     * @example await client.episodes.get('id');
     */
    async get(id, force = !this.client.cacheOptions.cacheEpisodes, market = 'US') {
        try {
            if (!force) {
                let existing = this.client.cache.episodes.get(id);
                if (existing)
                    return existing;
            }
            const episode = new Episode_1.default(await this.fetch(`/episodes/${id}`, {
                params: { market }
            }), this.client);
            if (this.client.cacheOptions.cacheEpisodes)
                this.client.cache.episodes.set(id, episode);
            return episode;
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
}
exports.default = EpisodeManager;
