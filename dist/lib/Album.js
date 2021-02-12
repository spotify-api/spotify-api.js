"use strict";
/**
 * Album Manager file
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
 * Class of all Spotify Api Methods related to albums
 */
class AlbumManager extends Spotify_1.default {
    /**
     * Class of all Spotify Api Methods related to playlists
     *
     * @param client Your Spotify Client
     */
    constructor(client) {
        super(client.token);
        this.client = client;
    }
    /**
     * Search albums across spotify api efficiently!
     *
     * @param q Your query
     * @param options Options such as limit and params
     * @example const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album.
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
            let items = data.albums.items.map(x => new Album_1.default(x, this.client));
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
     * Returns a Spotify Album information by Album id!
     *
     * @param id Id of the album
     * @param force If true then will directly fetch instead of searching cache
     * @example const album = await spotify.albums.get("album id"); // Get album by id...
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
     * Returns array of tracks present in the album by album id!
     *
     * @param id Id of the song
     * @param options Options such as limit and params
     * @example const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album.
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
     * @param ids Id of the albums
     */
    async delete(...ids) {
        await this.client.user.deleteAlbum(...ids);
    }
    ;
    /**
     * This uses the client.user.addAlbum method
     * This adds new albums to the saved list
     *
     * @param ids Id of the albums
     */
    async add(...ids) {
        await this.client.user.addAlbum(...ids);
    }
    ;
}
exports.default = AlbumManager;
;
