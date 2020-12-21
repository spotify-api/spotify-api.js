"use strict";
/**
 * Artist lib file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Track_1 = __importDefault(require("../structures/Track"));
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
const Artist_1 = __importDefault(require("../structures/Artist"));
const Album_1 = __importDefault(require("../structures/Album"));
/**
 * Class of all methods related to artists
 */
class Artist extends Spotify_1.default {
    constructor(token, client) {
        super(token);
        this.client = client;
    }
    /**
     * **Example:**
     * ```js
     * const artist = await spotify.artists.search("alec benjamin", { limit: 1 }); // Searches for the artist with a default limit as 1...
     * ```
     *
     * @param q Your search query
     * @param options Options such as limit and params
     */
    async search(q, options = { limit: 20 }) {
        if (!q)
            throw new Error_1.MissingParamError("missing query");
        try {
            const data = await this.fetch({
                link: `v1/search`,
                params: {
                    q,
                    type: "artist",
                    market: "US",
                    limit: options.limit,
                    ...options.params
                },
            });
            let items = data.artists.items.map(x => new Artist_1.default(x, this.client));
            if (this.client.cacheOptions.cacheArtists)
                this.client.cache.artists.push(...items);
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
     * const artist = await spotify.artists.get("artist id"); // Get artists by id
     * ```
     *
     * @param id Id of the artist
     * @param force If true will directly fetch else will search cache
     */
    async get(id, force = false) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        if (!force) {
            let existing = this.client.cache.artists.get(id);
            if (existing)
                return existing;
        }
        try {
            const data = new Artist_1.default(await this.fetch({ link: `v1/artists/${id}` }), this.client);
            if (this.client.cacheOptions.cacheArtists)
                this.client.cache.artists.push(data);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    /**
     * **Example:**
     * ```js
     * const albums = await spotify.artists.getAlbums("artist id"); // Get albums of the artists by id. Has advanced and limit option too...
     * ```
     * @param id Id of the artist
     * @param options Options to configure your search
     */
    async getAlbums(id, options = { limit: 20 }) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        try {
            const data = await this.fetch({
                link: `v1/artists/${id}/albums`,
                params: {
                    limit: options.limit,
                    market: "US",
                    include_groups: "single",
                    ...options.params
                },
            });
            let items = data.items.map(x => new Album_1.default(x, this.client));
            if (this.client.cacheOptions.cacheAlbums)
                this.client.cache.albums.push(...items);
            return items;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    /**
     * **Example:**
     * ```js
     * const topTracks = await spotify.artists.topTracks("artist id"); // Returns top tracks of the artist. Has advanced and limit option too...
     * ```
     *
     * @param id Id of the artist
     * @param options Options to configure your search
     */
    async topTracks(id, options = {}) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        try {
            const data = await this.fetch({
                link: `v1/artists/${id}/top-tracks`,
                params: {
                    country: "US",
                    ...options.params
                },
            });
            let items = data.tracks.map(x => new Track_1.default(x, this.client));
            if (this.client.cacheOptions.cacheTracks)
                this.client.cache.tracks.push(...items);
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
     * const relatedArtists = await spotify.artists.relatedArtists("artist id"); // Returns related artists. Has advanced and limit option too...
     * ```
     *
     * @param id Id of the artist
     * @param options Options to configure your search
     */
    async relatedArtists(id, options = {}) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        try {
            const data = await this.fetch({
                link: `v1/artists/${id}/related-artists`,
                params: {
                    country: "US",
                    ...options.params
                },
            });
            let items = data.artists.map(x => new Artist_1.default(x, this.client));
            if (this.client.cacheOptions.cacheArtists)
                this.client.cache.artists.push(...items);
            return items;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
}
;
exports.default = Artist;
