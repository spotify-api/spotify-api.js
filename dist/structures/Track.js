"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Spotify_1 = __importDefault(require("../Spotify"));
const SimplifiedArtist_1 = __importDefault(require("./SimplifiedArtist"));
const SimplifiedAlbum_1 = __importDefault(require("./SimplifiedAlbum"));
const util = new Spotify_1.default();
/**
 * Track class
 */
class Track {
    /**
     * **Example:**
     *
     * ```js
     * const track = new Track(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        this.availableMarkets = data.available_markets;
        this.discNumber = data.disc_number;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalIds = data.external_ids;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.popularity = data.popularity;
        this.previewUrl = data.preview_url;
        this.trackNumber = data.track_number;
        this.type = data.type;
        this.uri = data.uri;
        this.playable = data.is_playable;
        this.restrictions = data.restrictions;
        this.local = Boolean(data.is_local);
        if ('linked_from' in data)
            this.linkedFrom = data.linked_from;
    }
    ;
    /**
     * Album object
     * @readonly
     */
    get album() {
        return new SimplifiedAlbum_1.default(this.album);
    }
    ;
    /**
     * Returns the array of SimplifiedArtist
     * @readonly
     */
    get artists() {
        return this.data.map(x => new SimplifiedArtist_1.default(x));
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
}
;
exports.default = Track;
//# sourceMappingURL=Track.js.map