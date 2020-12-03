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
     * const show = await spotify.shows.get('id'); // Returns show information by id
     * ```
     *
     * @param id Id of the show
     */
    async get(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                resolve(new Show_1.default(await this.fetch({ link: `v1/shows/${id}` })));
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
     * const show = await spotify.shows.getEpisodes('id'); // Returns all episodes of show by id
     * ```
     *
     * @param id Id of the show
     * @param limit Limit of your results
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
