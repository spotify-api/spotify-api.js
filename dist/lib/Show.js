"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Show lib file
 */
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
const Show_1 = __importDefault(require("../structures/Show"));
const Episode_1 = __importDefault(require("../structures/Episode"));
/**
 * Class of all methods related to episode enpoints
 */
class Show extends Spotify_1.default {
    constructor(token, client) {
        super(token);
        this.client = client;
    }
    /**
     * **Example:**
     * ```js
     * const [show] = await spotify.shows.search("search", { limit: 1 }); // Returns the very first search
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
                    type: "show",
                    ...options.params
                },
            });
            let items = data.episodes.items.map(x => new Show_1.default(x, this.client));
            if (this.client.cacheOptions.cacheShows)
                this.client.cache.shows.push(...items);
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
     * const show = await spotify.shows.get('id'); // Returns show information by id
     * ```
     *
     * @param id Id of the show
     * @param force If true will fetch instead of search cache
     */
    async get(id, force = false) {
        if (!id)
            throw new Error_1.MissingParamError('missing id');
        if (!force) {
            let existing = this.client.cache.shows.get(id);
            if (existing)
                return existing;
        }
        try {
            const data = new Show_1.default(await this.fetch({ link: `v1/shows/${id}` }), this.client);
            if (this.client.cacheOptions.cacheShows)
                this.client.cache.shows.push(data);
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
     * const episode = await spotify.shows.getEpisodes('id'); // Returns all episodes of show by id
     * ```
     *
     * @param id Id of the show
     * @param options Options such as limit, advanced and params
     */
    async getEpisodes(id, options = { limit: 20 }) {
        if (!id)
            throw new Error_1.MissingParamError('missing id');
        try {
            const data = await this.fetch({
                link: `v1/shows/${id}/episodes`,
                params: {
                    market: 'US',
                    limit: options.limit,
                    ...options.params
                }
            });
            let items = data.items.map(x => new Episode_1.default(x, this.client));
            if (this.client.cacheOptions.cacheEpisodes)
                this.client.cache.episodes.push(...items);
            return items;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
    /**
     * This method uses client.user.deleteShow
     * This method deletes the show from your saved list
     *
     * @param ids Id of the show or shows
     */
    async delete(ids) {
        await this.client.user.deleteShow(ids);
    }
    /**
     * This method uses client.user.addShow
     * This method adds the show to your saved list
     *
     * @param ids Id of the show or shows
     */
    async add(ids) {
        await this.client.user.addShow(ids);
    }
}
;
exports.default = Show;
