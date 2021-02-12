"use strict";
/**
 * Artist Manager file
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
class ArtistManager extends Spotify_1.default {
    /**
     * Class of all methods related to artists
     *
     * @param client Your Spotify Client
     */
    constructor(client) {
        super(client.token);
        this.client = client;
    }
    /**
     * Search artists efficiently!
     *
     * @param q Your search query
     * @param options Options such as limit and params
     * @example const artist = await spotify.artists.search("alec benjamin", { limit: 1 }); // Searches for the artist with a default limit as 1...
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
     * Retruns Spotify Artist information by id!
     *
     * @param id Id of the artist
     * @param force If true will directly fetch else will search cache
     * @example const artist = await spotify.artists.get("artist id"); // Get artists by id
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
     * Returns the albums of the artist by id!
     *
     * @param id Id of the artist
     * @param options Options to configure your search
     * @example const albums = await spotify.artists.getAlbums("artist id"); // Get albums of the artists by id.
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
     * Returns the top tracks of the Spotify Artist by id!
     *
     * @param id Id of the artist
     * @param options Options to configure your search
     * @example const topTracks = await spotify.artists.topTracks("artist id"); // Returns top tracks of the artist. Has advanced and limit option too...
     */
    async getTopTracks(id, options = {}) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        try {
            const data = await this.fetch({
                link: `v1/artists/${id}/top-tracks`,
                params: {
                    limit: options.limit,
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
     * Returns the related artists of the Spotify Artist by id!
     *
     * @param id Id of the artist
     * @param options Options to configure your search
     * @example const relatedArtists = await spotify.artists.relatedArtists("artist id"); // Returns related artists.
     */
    async getRelatedArtists(id, options = {}) {
        if (!id)
            throw new Error_1.MissingParamError("missing id");
        try {
            const data = await this.fetch({
                link: `v1/artists/${id}/related-artists`,
                params: {
                    limit: options.limit,
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
    /**
     * Verify if you follow the artists by ids! Will work only if you have a current user token!
     *
     * @param ids Ids of the artist or artists
     */
    async follows(...ids) {
        return await this.client.user.followsArtist(...ids);
    }
    /**
     * Follow artists by their id's! Will work only if you have a current user token!
     *
     * @param ids Ids of the artist or artists
     */
    async follow(...ids) {
        await this.client.user.followArtist(...ids);
    }
    /**
     * Unfollow artists by their id's! Will work only if you have a current user token!
     *
     * @param ids Ids of the artist or artists
     */
    async unfollow(...ids) {
        await this.client.user.unfollowArtist(...ids);
    }
}
exports.default = ArtistManager;
;
