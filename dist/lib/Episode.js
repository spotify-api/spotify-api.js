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
/**
 * Class of all methods related to episode enpoints
 */
class Episode extends Spotify_1.default {
    /**
     * **Example:**
     * ```js
     * const episode = await spotify.episodes.get('id'); // Returns the episode information by id
     * ```
     *
     * @param id Id of the episode
     */
    async get(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                resolve(await this.fetch({
                    link: `v1/episodes/${id}`
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
exports.default = Episode;
//# sourceMappingURL=Episode.js.map