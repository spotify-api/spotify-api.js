"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Artist_1 = __importDefault(require("../structures/Artist"));
const Errors_1 = require("../Errors");
const BaseManager_1 = __importDefault(require("./BaseManager"));
const Album_1 = __importDefault(require("../structures/Album"));
const Track_1 = __importDefault(require("../structures/Track"));
/**
 * All artist api methods managed!
 */
class ArtistManager extends BaseManager_1.default {
    /**
     * Search artists
     *
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.artists.search('some query');
     */
    async search(query, options) {
        try {
            const data = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'artist',
                    q: query
                }
            }));
            const artists = data.artists.items.map(x => new Artist_1.default(x, this.client));
            if (this.client.cacheOptions.cacheArtists) {
                for (let i = 0; i < artists.length; i++)
                    this.client.cache.artists.set(artists[i].id, artists[i]);
            }
            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: artists
            };
        }
        catch (e) {
            return Errors_1.handleError(e) || {
                limit: 0,
                offset: 0,
                total: 0,
                items: []
            };
        }
    }
    /**
     * Get a spotify artist information by spotify id!
     *
     * @param id Spotify artist id
     * @param force If true, will directly fetch else will search for cache first!
     * @example await client.artists.get('id');
     */
    async get(id, force = !this.client.cacheOptions.cacheArtists, market = 'US') {
        try {
            if (!force) {
                let exisiting = this.client.cache.artists.get(id);
                if (exisiting)
                    return exisiting;
            }
            const artist = new Artist_1.default(await this.fetch(`/artists/${id}`, {
                params: { market }
            }), this.client);
            if (this.client.cacheOptions.cacheArtists)
                this.client.cache.artists.set(artist.id, artist);
            return artist;
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    /**
     * Get multiple artists at one fetch!
     *
     * @param options Basic GetMultipleOptions
     * @example await client.artists.getMultiple({
     *     ids: ['123456789']
     * })
     */
    async getMultiple(options) {
        try {
            const def = { market: 'US', ids: [] };
            Object.assign(def, options);
            if (!def.ids.length || def.ids.length > 20)
                throw new Errors_1.UnexpectedError("You must provide more than 1 and less than 20 ids to fetch multiple artists!");
            def.ids = def.ids.join(',');
            const artists = (await this.fetch('/artists', {
                params: def
            })).artists.map(x => new Artist_1.default(x, this.client));
            if (this.client.cacheOptions.cacheArtists) {
                for (let i = 0; i < artists.length; i++)
                    this.client.cache.artists.set(artists[i].id, artists[i]);
            }
            return artists;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Returns the albums of the artist
     *
     * @param id ID of the artist
     * @param options Basic PagingOptions
     * @example await client.artists.getAlbums('id');
     */
    async getAlbums(id, options = { market: 'US' }) {
        try {
            const data = (await this.fetch(`/artists/${id}/albums`, { params: options }));
            const albums = data.items.map(x => new Album_1.default(x, this.client));
            if (this.client.cacheOptions.cacheAlbums) {
                for (let i = 0; i < albums.length; i++)
                    this.client.cache.albums.set(albums[i].id, albums[i]);
            }
            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: albums
            };
        }
        catch (e) {
            return Errors_1.handleError(e) || {
                limit: 0,
                offset: 0,
                total: 0,
                items: []
            };
        }
    }
    /**
     * Returns the top tracks of the artist
     *
     * @param id ID of the artist
     * @param options Basic PagingOptions
     * @example await client.albums.getTopTracks('id');
     */
    async getTopTracks(id, options = { market: 'US' }) {
        try {
            const tracks = (await this.fetch(`/artists/${id}/top-tracks`, {
                params: options
            })).tracks.map(x => new Track_1.default(x, this.client));
            if (this.client.cacheOptions.cacheTracks) {
                for (let i = 0; i < tracks.length; i++)
                    this.client.cache.albums.set(tracks[i].id, tracks[i]);
            }
            return tracks;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Returns artists realted to the artist of whose id is provided!
     *
     * @param id ID of the artist
     * @param options Basic PagingOptions
     * @example await client.albums.getRelatedArtists('id');
     */
    async getRelatedArtists(id, options = { market: 'US' }) {
        try {
            const artists = (await this.fetch(`/artists/${id}/related-artists`, {
                params: options
            })).artists.map(x => new Artist_1.default(x, this.client));
            if (this.client.cacheOptions.cacheArtists) {
                for (let i = 0; i < artists.length; i++)
                    this.client.cache.albums.set(artists[i].id, artists[i]);
            }
            return artists;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
}
exports.default = ArtistManager;
