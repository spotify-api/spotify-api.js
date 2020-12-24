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
const Album_1 = __importDefault(require("../structures/Album"));
const Track_1 = __importDefault(require("../structures/Track"));
/**
 * Class of all methods related to albums
 */
class Album extends Spotify_1.default {
    constructor(token, client) {
        super(token);
        this.client = client;
    }
    /**
     * **Example:**
     * ```js
     * const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album. Has advanced option too...
     * ```
     *
     * @param q Your query
     * @param options Options such as limit, advanced and params
     */
    async search(q, options = { limit: 20 }) {
        if (!q)
            throw new Error_1.MissingParamError("missing query!");
        try {
            const data = await this.fetch({
                link: "v1/search",
                params: {
                    q,
                    market: "US",
                    limit: options.limit,
                    type: "album",
                    ...options.params
                },
            });
            let items = data.albums.items.map(x => new Album(x, this.client));
            if (this.client.cacheOptions.cacheAlbums)
                this.client.cache.albums.push(...items);
            return items;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * const album = await spotify.albums.get("album id"); // Get album by id...
     * ```
     *
     * @param id Id of the album
     * @param force If true then will directly fetch instead of searching cache
     */
    async get(id, force = false) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        if (!force) {
            let existing = this.client.cache.albums.get(id);
            if (existing)
                return existing;
        }
        try {
            const data = new Album_1.default(await this.fetch({ link: `v1/albums/${id}` }), this.client);
            if (this.client.cacheOptions.cacheAlbums)
                this.client.cache.albums.push(data);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album. Has advanced option too...
     * ```
     *
     * @param id Id of the song
     * @param options Options such as limit, advanced and params
     */
    async getTracks(id, options = { limit: 20 }) {
        if (!id)
            throw new Error_1.MissingParamError("missing id!");
        try {
            const data = await this.fetch({
                link: `v1/albums/${id}/tracks`,
                params: {
                    limit: options.limit || 20,
                    market: "US",
                    offset: "0",
                    ...options.params
                },
            });
            let items = data.items.map(x => new Track_1.default(x, this.client));
            if (this.client.cacheOptions.cacheTracks)
                this.client.cache.tracks.push(data);
            return items;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
    /**
     * This is uses the client.user.deleteAlbum method
     * This deletes from your savelist
     *
     * @param ids Id of the album or albums
     */
    async delete(ids) {
        await this.client.user.deleteAlbum(ids);
    }
    ;
    /**
     * This uses the client.user.addAlbum method
     * This adds new albums to the saved list
     *
     * @param ids Id of the album or albums
     */
    async add(ids) {
        await this.client.user.addAlbum(ids);
    }
    ;
}
;
exports.default = Album;
