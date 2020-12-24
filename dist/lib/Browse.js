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
const Playlist_1 = __importDefault(require("../structures/Playlist"));
const Album_1 = __importDefault(require("../structures/Album"));
/**
 * Class of all methods related to browse endpoints
 */
class Browse extends Spotify_1.default {
    constructor(token, client) {
        super(token);
        this.client = client;
    }
    /**
     * Get information about a category by id
     *
     * @param id category id
     * @param force If true, will fetch else will try to fetch from cache!
     */
    async getCategory(id, force = false) {
        if (!id)
            throw new Error_1.MissingParamError('missing id');
        if (!force) {
            let existing = this.client.cache.categories.get(id);
            if (existing)
                return existing;
        }
        try {
            const data = await this.fetch({ link: `v1/browse/categories/${id}` });
            if (this.client.cacheOptions.cacheCategories)
                this.client.cache.categories.push(data);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
    /**
     * Returns all playlists of the category by id
     * @param id Id of the category
     * @param limit Limit of results
     */
    async getCategoryPlaylists(id, options = { limit: 20 }) {
        if (!id)
            throw new Error_1.MissingParamError('missing id');
        try {
            const data = await this.fetch({
                link: `v1/browse/categories/${id}/playlists`,
                params: {
                    limit: options.limit,
                    ...options.params
                }
            });
            let items = data.playlists.items.map(x => new Playlist_1.default(x, this.client));
            if (this.client.cacheOptions.cachePlaylists)
                this.client.cache.playlists.push(...items);
            return items;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
    /**
     * Get list of all categories
     *
     * @param options option object such as limit and params
     */
    async categories(options = { limit: 20 }) {
        try {
            const data = await this.fetch({
                link: `v1/browse/categories`,
                params: {
                    limit: options.limit,
                    ...options.params
                }
            });
            if (this.client.cacheOptions.cacheCategories)
                this.client.cache.categories.push(...data);
            return data.categories.items;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
    /**
     * Get list of all featured playlists
     *
     * @param options Option object such as limit, advanced and params
     */
    async featuredPlaylists(options = { limit: 20 }) {
        try {
            const data = await this.fetch({
                link: `v1/browse/featured-playlists`,
                params: {
                    limit: options.limit,
                    ...options.params
                }
            });
            return {
                message: data.message,
                playlists: data.playlists.items.map(x => new Playlist_1.default(x, this.client))
            };
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
    /**
     * Get list of all new releases
     * @param options options object such as limit advanced and params
     */
    async newReleases(options = { limit: 20 }) {
        try {
            const data = await this.fetch({
                link: `v1/browse/new-releases`,
                params: {
                    limit: options.limit,
                    ...options.params
                }
            });
            let items = data.albums.items.map(x => new Album_1.default(x, this.client));
            if (this.client.cacheOptions.cacheAlbums)
                this.client.cache.albums.push(...items);
            return items;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
}
;
exports.default = Browse;
