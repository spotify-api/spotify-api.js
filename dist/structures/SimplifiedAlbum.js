"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SimplifiedArtist_1 = __importDefault(require("./SimplifiedArtist"));
const Spotify_1 = __importDefault(require("../Spotify"));
const util = new Spotify_1.default();
/**
 * SimplifiedAlbum class
 */
class SimplifiedAlbum {
    /**
     * **Example:**
     *
     * ```js
     * const album = new SimplifiedAlbum(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        this.albumGroup = data.album_group;
        this.albumType = data.album_type;
        this.availableMarkets = data.available_markets || [];
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.restrictions = data.restrictions;
        this.type = data.type;
        this.uri = data.uri;
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
     * Returns the array of simplified artist
     * @readonly
     */
    get artists() {
        return this.data.artists.map(x => new SimplifiedArtist_1.default(x));
    }
    ;
    /**
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt() {
        return this.releaseDate ? new Date(this.releaseDate) : null;
    }
    ;
}
;
exports.default = SimplifiedAlbum;
//# sourceMappingURL=SimplifiedAlbum.js.map