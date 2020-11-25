"use strict";
/**
 * Browsing lib file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
const SimplifiedPlaylist_1 = __importDefault(require("../structures/SimplifiedPlaylist"));
const SimplifiedAlbum_1 = __importDefault(require("../structures/SimplifiedAlbum"));
/**
 * Class of all methods related to browse enpoints
 */
class Browse extends Spotify_1.default {
    /**
     * Get information about a category by id
     * @param id category id
     */
    async getCategory(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                resolve(await this.fetch({ link: `v1/browse/categories/${id}` }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    /**
     * Returns all playlists of the category by id
     * @param id Id of the category
     * @param limit Limit of results
     */
    async getCategoryPlaylists(id, options = {
        limit: 20
    }) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                const data = await this.fetch({
                    link: `v1/browse/categories/${id}/playlists`,
                    params: {
                        limit: options.limit,
                        ...options.params
                    }
                });
                let items = data.playlists.items.map(x => new SimplifiedPlaylist_1.default(x));
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
            ;
        });
    }
    ;
    /**
     * Get list of all categories
     * @param limit Limit of your results
     */
    async categories(options = {
        limit: 20
    }) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.fetch({
                    link: `v1/browse/categories`,
                    params: {
                        limit: options.limit,
                        ...options.params
                    }
                });
                resolve(res.categories.items);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    /**
     * Get list of all featured playlists
     * @param limit Limit of results
     */
    async featuredPlaylists(options = {
        limit: 20
    }) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await this.fetch({
                    link: `v1/browse/featured-playlists`,
                    params: {
                        limit: options.limit,
                        ...options.params
                    }
                });
                resolve({
                    message: data.message,
                    playlists: data.playlists.items.map(x => new SimplifiedPlaylist_1.default(x))
                });
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    /**
     * Get list of all new releases
     * @param limit Limit of results
     */
    async newReleases(options = {
        limit: 20
    }) {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.fetch({
                    link: `v1/browse/new-releases`,
                    params: {
                        limit: options.limit,
                        ...options.params
                    }
                });
                let items = res.albums.items.map(x => new SimplifiedAlbum_1.default(x));
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
            ;
        });
    }
    ;
}
;
exports.default = Browse;
//# sourceMappingURL=Browse.js.map