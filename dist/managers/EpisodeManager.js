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
     * Search episodes!
     *
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.episodes.search('some query');
     */
    async search(query, options = {
        market: 'US'
    }) {
        try {
            const data = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'episode',
                    q: query
                }
            })).episodes;
            const episodes = data.items.map(x => new Episode_1.default(x, this.client));
            if (this.client.cacheOptions.cacheEpisodes) {
                for (let i = 0; i < episodes.length; i++)
                    this.client.cache.episodes.set(episodes[i].id, episodes[i]);
            }
            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: episodes
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
    /**
     * Get multiple episodes at one fetch!
     *
     * @param options Basic GetMultipleOptions
     * @example await client.episodes.getMultiple({
     *     ids: ['123456789']
     * })
     */
    async getMultiple(options) {
        try {
            const def = { market: 'US', ids: [] };
            Object.assign(def, options);
            if (!def.ids.length || def.ids.length > 20)
                throw new Errors_1.UnexpectedError("You must provide more than 1 and less than 20 ids to fetch multiple episodes!");
            def.ids = def.ids.join(',');
            const episodes = (await this.fetch('/episodes', {
                params: def
            })).episodes.map(x => new Episode_1.default(x, this.client));
            if (this.client.cacheOptions.cacheEpisodes) {
                for (let i = 0; i < episodes.length; i++)
                    this.client.cache.episodes.set(episodes[i].id, episodes[i]);
            }
            return episodes;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
}
exports.default = EpisodeManager;
