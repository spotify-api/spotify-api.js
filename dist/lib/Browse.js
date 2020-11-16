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
                resolve(await this.fetch({
                    link: `v1/browse/categories/${id}`,
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
     * Returns all playlists of the category by id
     * @param id Id of the category
     * @param limit Limit of results
     */
    async getCategoryPlaylists(id, limit) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                const data = await this.fetch({
                    link: `v1/browse/categories/${id}/playlists`,
                    params: {
                        limit: limit || 20
                    }
                });
                resolve(data.playlists);
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
    async categories(limit) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.fetch({
                    link: `v1/browse/categories`,
                    params: {
                        limit: limit || 20
                    }
                });
                resolve(data.categories.items);
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
    async featuredPlaylists(limit) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/browse/featured-playlists`,
                    params: {
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
    /**
     * Get list of all new releases
     * @param limit Limit of results
     */
    async newReleases(limit) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/browse/new-releases`,
                    params: {
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
exports.default = Browse;
//# sourceMappingURL=Browse.js.map