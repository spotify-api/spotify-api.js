"use strict";
/**
 * Album lib file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
/**
 * Class of all methods related to albums
 */
class Album extends Spotify_1.default {
    /**
     * **Example:**
     * ```js
     * const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album. Has advanced option too...
     * ```
     *
     * @param q Your query
     * @param options Your options such as limit, advanced, etc
     */
    async search(q, options) {
        return new Promise(async (resolve, reject) => {
            if (!q)
                throw new Error_1.MissingParamError("missing query!");
            if (!options)
                options = {};
            try {
                const res = await this.fetch({
                    link: "v1/search",
                    params: {
                        q: encodeURIComponent(q),
                        market: "US",
                        limit: options.limit || 20,
                        type: "album",
                    },
                });
                let items = res.albums.items;
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
     * const album = await spotify.albums.get("album id"); // Get album by id...
     * ```
     *
     * @param id Id of the album
     */
    async get(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            try {
                resolve(await this.fetch({
                    link: `v1/albums/${id}`,
                }));
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
     * const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album. Has advanced option too...
     * ```
     *
     * @param id Id of the song
     * @param options Options such as limit and advanced
     */
    async getTracks(id, options) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id!"));
            if (!options)
                options = {};
            try {
                const res = await this.fetch({
                    link: `v1/albums/${id}/tracks`,
                    params: {
                        limit: options.limit || 20,
                        market: "US",
                        offset: "0",
                    },
                });
                let items = res.items;
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
            ;
        });
    }
    ;
}
;
exports.default = Album;
//# sourceMappingURL=Album.js.map