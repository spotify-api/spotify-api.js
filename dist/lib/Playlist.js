"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Playlist lib file
 */
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
const Playlist_1 = __importDefault(require("../structures/Playlist"));
const PlaylistUtils_1 = require("../structures/PlaylistUtils");
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
     * @param options options to configure
     */
    async get(id, options = {}) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            try {
                let res = await this.fetch({ link: `v1/playlists/${id}`, });
                if (options.advanced) {
                    let data = await this.getCodeImage(res[i].uri);
                    res.codeImage = data.image;
                    res.dominantColor = data.dominantColor;
                }
                ;
                resolve(new Playlist_1.default(res));
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
    async getTracks(id, options = {
        limit: 20
    }) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            try {
                const res = await this.fetch({
                    link: `v1/playlists/${id}/tracks`,
                    params: {
                        market: "US",
                        limit: options.limit,
                        ...options.params
                    },
                });
                resolve(res.items.map(x => new PlaylistUtils_1.PlaylistTrack(x)));
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
                    link: `v1/playlists/${id}/images`
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
