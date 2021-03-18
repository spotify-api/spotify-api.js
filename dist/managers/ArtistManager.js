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
     * Returns the albums of the artist
     *
     * @param id ID of the artist
     * @param options Basic PagingOptions
     * @example await client.artists.getAlbums('id');
     */
    async getAlbums(id, options = { market: 'US' }) {
        try {
            const albums = (await this.fetch(`/artists/${id}/albums`, {
                params: options
            })).items.map(x => new Album_1.default(x, this.client));
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
