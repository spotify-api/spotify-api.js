"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Full Album structure
 */
const Spotify_1 = __importDefault(require("../Spotify"));
const Artist_1 = __importDefault(require("./Artist"));
const Track_1 = __importDefault(require("./Track"));
/**
 * Structure for the Spotify Api's Album Object!
 */
class Album {
    /**
     * **Example:**
     *
     * ```js
     * const album = new Album(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     * @param client Spotify Client
     */
    constructor(data, client) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
        this.albumType = data.album_type;
        this.availableMarkets = data.available_markets;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.type = data.type;
        this.uri = data.uri;
        this.totalTracks = data.total_tracks;
        this.label = data.label || null;
        this.restrictions = data.restrictions || null;
        if ('popularity' in data) {
            this.popularity = data.popularity;
            this.genres = data.genres;
            this.copyrights = data.copyrights;
            this.externalIds = data.external_ids;
        }
    }
    ;
    /**
     * Returns a code image of the Album!
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Spotify_1.default.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    /**
     * Returns the array of tracks in the album!
     * @readonly
     */
    get tracks() {
        return this.data.tracks.items.map(x => new Track_1.default(x, this.client));
    }
    /**
     * Returns the array of artists of the album!
     * @readonly
     */
    get artists() {
        return this.data.artists.map(x => new Artist_1.default(x, this.client));
    }
    ;
    /**
     * Returns the Date object when the album was released!
     * @readonly
     */
    get releasedAt() {
        return new Date(this.releaseDatePrecision);
    }
    ;
    /**
     * Refetches the album and refreshes the cache!
     */
    async fetch() {
        return await this.client.albums.get(this.id, true);
    }
    ;
    /**
     * Refetches the tracks of the album!
     *
     * @param limit Limit your results
     * @param force If true will directly fetch instead of searching cache
     */
    async getTracks(limit = 20, force = false) {
        if (!force && this.tracks.length)
            return this.tracks;
        const data = await this.client.albums.getTracks(this.id, { limit });
        return data;
    }
    /**
     * Deletes the album from your saved list! Will only work if you have a current user token!
     */
    async delete() {
        await this.client.user.deleteAlbum(this.id);
    }
    /**
     * Adds this album to your saved list! Deletes the album from your saved list! Will only work if you have a current user token!
     */
    async add() {
        await this.client.user.addAlbum(this.id);
    }
}
;
exports.default = Album;
