"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Full Album structure
 */
const Spotify_1 = __importDefault(require("../Spotify"));
const SimplifiedArtist_1 = __importDefault(require("./SimplifiedArtist"));
const SimplifiedTrack_1 = __importDefault(require("./SimplifiedTrack"));
const util = new Spotify_1.default();
/**
 * Album structure class
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
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        this.albumType = data.album_type;
        this.availableMarkets = data.available_markets;
        this.copyrights = data.copyrights;
        this.externalIds = data.external_ids;
        this.externalUrls = data.external_urls;
        this.genres = data.genres;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.popularity = data.popularity;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.type = data.type;
        this.uri = data.uri;
        this.label = data.label || null;
        this.restrictions = data.restrictions || null;
    }
    ;
    /**
     * Returns the array of simplified artist
     * @readonly
     */
    get artists() {
        return this.data.artists.map(x => new SimplifiedArtist_1.default(x));
    }
    ;
    /**
     * Returns the array of simplified tracks
     * @readonly
     */
    get tracks() {
        return this.data.tracks.items.map(x => new SimplifiedTrack_1.default(x));
    }
    ;
    /**
     * Returns the code image with dominant color
     */
    async getCodeImage() {
        return await util.getCodeImage(this.uri);
    }
    ;
    /**
     * Returns the uri data
     */
    async getURIData() {
        return await util.getURIData(this.uri);
    }
    ;
    /**
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt() {
        return new Date(this.releaseDate);
    }
    ;
    /**
     * Check wheater if it is restricted or not
     * @readonly
     */
    get restricted() {
        return Boolean(this.restrictions);
    }
    ;
}
;
exports.default = Album;
//# sourceMappingURL=Album.js.map