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
const SimplifiedEpisode_1 = __importDefault(require("../structures/SimplifiedEpisode"));
/**
 * Class of all methods related to episode enpoints
 */
class Episode extends Spotify_1.default {
    /**
     * **Example:**
     * ```js
     * const [episode] = await spotify.episodes.search("search", { limit: 1 }); // Returns the very first search
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
                        type: "episode",
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
     * const episode = await spotify.episodes.get('id'); // Returns the episode information by id
     * ```
     *
     * @param id Id of the episode
     * @param options Advanced option
     */
    async get(id, options = {}) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                let res = new Episode_1.default(await this.fetch({ link: `v1/episodes/${id}` }));
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
}
;
exports.default = Episode;
