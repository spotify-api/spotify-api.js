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
        return new Promise(async (reject, resolve) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                resolve(await this.fetch({
                    link: `v1/shows/${id}`
                }));
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
    async getEpisodes(id, limit) {
        return new Promise(async (reject, resolve) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                resolve(await this.fetch({
                    link: `v1/shows/${id}/episodes`,
                    params: {
                        market: 'US',
                        limit: limit || 20
                    }
                }));
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
//# sourceMappingURL=Show.js.map