"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Episode lib file
 */
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
const Episode_1 = __importDefault(require("../structures/Episode"));
/**
 * Class of all methods related to episode enpoints
 */
class Episode extends Spotify_1.default {
    constructor(token, client) {
        super(token);
        this.client = client;
    }
    /**
     * **Example:**
     * ```js
     * const [episode] = await spotify.episodes.search("search", { limit: 1 }); // Returns the very first search
     * ```
     *
     * @param q Your query
     * @param options Options such as limit, advanced and params
     */
    async search(q, options = { limit: 20 }) {
        if (!q)
            throw new Error_1.MissingParamError("missing query!");
        try {
            const data = await this.fetch({
                link: "v1/search",
                params: {
                    q,
                    market: "US",
                    limit: options.limit,
                    type: "episode",
                    ...options.params
                },
            });
            let items = data.episodes.items.map(x => new Episode_1.default(x, this.client));
            if (this.client.cacheOptions.cacheEpisodes)
                this.client.cache.episodes.push(...items);
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
     * const episode = await spotify.episodes.get('id'); // Returns the episode information by id
     * ```
     *
     * @param id Id of the episode
     * @param options Advanced option
     */
    async get(id, force = false) {
        if (!id)
            new Error_1.MissingParamError('missing id');
        if (!force) {
            let existing = this.client.cache.episodes.get(id);
            if (existing)
                return existing;
        }
        try {
            const data = new Episode_1.default(await this.fetch({ link: `v1/episodes/${id}` }), this.client);
            if (this.client.cacheOptions.cacheEpisodes)
                this.client.cache.episodes.push(data);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
}
;
exports.default = Episode;
