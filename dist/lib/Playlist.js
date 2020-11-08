"use strict";
/**
 * Playlist lib file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
/**
 * Class of all methods related to playlists
 */
class Playlist extends Spotify_1.default {
    /**
     * **Example:**
     * ```js
     * const playlist = await spotify.playlists.get("id"); // Get playlist data by id
     * ```
     *
     * @param id Id of the playlist
     */
    async get(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            try {
                const res = await this.fetch({
                    link: `v1/playlists/${id}`,
                    params: {
                        market: "US",
                    },
                });
                res.codeImg = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${res.uri}`;
                resolve(res);
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
     * const tracks = await spotify.playlists.getTracks("id", { limit: 1 }); // Get all tracks in an album by id. Has advanced option too...
     * ```
     *
     * @param id Id of the playlist
     * @param options Options to configure your search
     */
    async getTracks(id, options) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            if (!options)
                options = {};
            try {
                const res = await this.fetch({
                    link: `v1/playlists/${id}/tracks`,
                    params: {
                        market: "US",
                        limit: options.limit || 20,
                    },
                });
                let items = res.items;
                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    }
                    ;
                }
                ;
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
     * const coverImage = await spotify.playlists.getCoverImage('id') // Get cover image of the playlist by id
     * ```
     *
     * @param id Playlist id
     */
    async getCoverImage(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing playlist id'));
                resolve(await this.fetch({
                    link: `v1/me/playlists/${id}/images`
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
     * const follows = await spotify.playlists.follows('playlistId', 'userId') // Check if a user or users follow a playlist
     * ```
     *
     * @param id Id of the playlist
     * @param userIds List of user id
     */
    async follows(id, userIds) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing playlist id'));
                if (!userIds || !Array.isArray(userIds))
                    reject(new Error_1.MissingParamError('missing user ids'));
                resolve(await this.fetch({
                    link: `v1/me/playlists/${id}/followers/contains`,
                    params: {
                        ids: (Array.isArray(userIds) ? userIds.join(',') : userIds)
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
exports.default = Playlist;
//# sourceMappingURL=Playlist.js.map