"use strict";
/**
 * User lib file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
const PublicUser_1 = __importDefault(require("../structures/PublicUser"));
const SimplifiedPlaylist_1 = __importDefault(require("../structures/SimplifiedPlaylist"));
/**
 * Class of all methods related to users
 */
class User extends Spotify_1.default {
    /**
     * **Example:**
     * ```js
     * const user = await spotify.users.get("id"); // Returns the user details by id...
     * ```
     *
     * @param id Id of the user
     */
    async get(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError("missing id to fetch user"));
                resolve(new PublicUser_1.default(await this.fetch({ link: `v1/users/${id}` })));
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
     * const playlists = await spotify.users.getPlaylists("id"); // Returns the user playlists by id...
     * ```
     *
     * @param id Id of the user
     */
    async getPlaylists(id, options) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError("missing id to fetch user"));
                if (!options)
                    options = { limit: 20 };
                let res = await this.fetch({
                    link: `v1/users/${id}/playlists`,
                    params: {
                        limit: options.limit,
                        ...options.params
                    }
                });
                res = res.items.map(x => new SimplifiedPlaylist_1.default(x));
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
exports.default = User;
//# sourceMappingURL=User.js.map