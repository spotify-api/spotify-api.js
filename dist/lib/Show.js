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
const SimplifiedEpisode_1 = __importDefault(require("../structures/SimplifiedEpisode"));
/**
 * Class of all methods related to episode enpoints
 */
class Show extends Spotify_1.default {
    /**
     * **Example:**
     * ```js
     * const [show] = await spotify.shows.search("search", { limit: 1 }); // Returns the very first search
     * ```
     *
     * @param q Your query
     * @param options Options such as limit, advanced and params
     */
    async search(q, options = {
        limit: 20
    }) {
        return new Promise(async (resolve, reject) => {
            if (!q)
                throw new Error_1.MissingParamError("missing query!");
            try {
                const res = await this.fetch({
                    link: "v1/search",
                    params: {
                        q: encodeURIComponent(q),
                        market: "US",
                        limit: options.limit,
                        type: "show",
                        ...options.params
                    },
                });
                let items = res.episodes.items.map(x => new SimplifiedEpisode_1.default(x));
                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    }
                }
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
     * const show = await spotify.shows.get('id'); // Returns show information by id
     * ```
     *
     * @param id Id of the show
     * @param options Options such as advanced
     */
    async get(id, options = {}) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                let res = new Show_1.default(await this.fetch({ link: `v1/shows/${id}` }));
                if (options.advanced) {
                    let data = await this.getCodeImage(res.uri);
                    res.codeImage = data.image;
                    res.dominantColor = data.dominantColor;
                }
                ;
                resolve(res);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
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
    async getEpisodes(id, options = {
        limit: 20
    }) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                let res = await this.fetch({
                    link: `v1/shows/${id}/episodes`,
                    params: {
                        market: 'US',
                        limit: options.limit,
                        ...options.params
                    }
                });
                res = res.items.map(x => new SimplifiedEpisode_1.default(x));
                if (options.advanced) {
                    for (let i = 0; i < res.length; i++) {
                        let data = await this.getCodeImage(res[i].uri);
                        res[i].codeImage = data.image;
                        res[i].dominantColor = data.dominantColor;
                    }
                    ;
                }
                ;
                resolve(res);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
}
;
exports.default = Show;
