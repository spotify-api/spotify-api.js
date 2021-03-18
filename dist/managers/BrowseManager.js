"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../Errors");
const Playlist_1 = __importDefault(require("../structures/Playlist"));
const Album_1 = __importDefault(require("../structures/Album"));
const BaseManager_1 = __importDefault(require("./BaseManager"));
/**
 * All browse api endpoint methods!
 */
class BrowseManager extends BaseManager_1.default {
    /**
     * Returns the spotify category by id
     *
     * @param id ID of the spotify category
     * @param force If true, it will attempt to search cache if available
     * @example await client.browse.getCategory('party');
     */
    async getCategory(id, force = !this.client.cacheOptions.cacheCategories) {
        try {
            if (!force) {
                let existing = this.client.cache.categories.get(id);
                if (existing)
                    return existing;
            }
            const category = await this.fetch(`/browse/categories/${id}`);
            if (this.client.cacheOptions.cacheCategories)
                this.client.cache.categories.set(category.id, category);
            return category;
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    /**
     * Returns an array of spotify categories
     *
     * @example client.browse.getCategories()
     */
    async getCategories() {
        try {
            const categories = (await this.fetch('/browse/categories')).categories.items;
            if (this.client.cacheOptions.cacheCategories) {
                for (let i = 0; i < categories.length; i++)
                    this.client.cache.categories.set(categories[i].id, categories[i]);
            }
            return categories;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Returns an array of playlists of the category!
     *
     * @param id Spotify id of the category
     * @param options Options such as limit and offset
     * @example client.browse.getCategoryPlaylists('party');
     */
    async getCategoryPlaylists(id, options) {
        try {
            const playlists = (await this.fetch(`/browse/categories/${id}/playlists`, {
                params: options
            })).playlists.items.map(x => new Playlist_1.default(x, this.client));
            if (this.client.cacheOptions.cachePlaylists) {
                for (let i = 0; i < playlists.length; i++)
                    this.client.cache.playlists.set(playlists[i].id, playlists[i]);
            }
            return playlists;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Returns the featured playlists of the spotify
     * @param options Options such as limit and offset
     * @example client.browse.getFeaturedPlaylists();
     */
    async getFeaturedPlaylists(options) {
        try {
            const data = await this.fetch('/browse/featured-playlists');
            const client = this.client;
            return {
                message: data.message,
                get playlists() {
                    return data.playlists.items.map(x => new Playlist_1.default(x, client));
                }
            };
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    /**
     * Returns new releases of albums on spotify
     *
     * @example await client.browse.getNewReleases();
     */
    async getNewReleases() {
        try {
            const albums = (await this.fetch('/browse/new-releases')).albums.items.map(x => new Album_1.default(x, this.client));
            if (this.client.cacheOptions.cacheAlbums) {
                for (let i = 0; i < albums.length; i++)
                    this.client.cache.albums.set(albums[i].id, albums[i]);
            }
            return albums;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
}
exports.default = BrowseManager;
;
