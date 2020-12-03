"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistOwner = exports.PlaylistTrack = void 0;
/**
 * Playlist Utility Structures
 */
const Track_1 = __importDefault(require("./Track"));
const PublicUser_1 = __importDefault(require("./PublicUser"));
const Episode_1 = __importDefault(require("./Episode"));
const Spotify_1 = __importDefault(require("../Spotify"));
const util = new Spotify_1.default();
/**
 * PlaylistTrack class
 */
class PlaylistTrack {
    /**
     * **Example:**
     *
     * ```js
     * const track = new PlaylistTrack(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data });
        this.addedAt = data.added_at;
        this.local = data.is_local;
    }
    ;
    /**
     * Added by user object
     * @readonly
     */
    get addedBy() {
        if ('added_by' in this.data)
            return new PublicUser_1.default(this.data.added_by);
        else
            return null;
    }
    ;
    /**
     * Full info of the track
     * @readonly
     */
    get track() {
        return this.data.track.description ? new Episode_1.default(this.data.track) : new Track_1.default(this.data.track);
    }
    ;
}
exports.PlaylistTrack = PlaylistTrack;
;
/**
 * Public User Class
 */
class PlaylistOwner {
    /**
     * **Example:**
     *
     * ```js
     * const user = new PlaylistOwner(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data });
        this.displayName = data.display_name;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;
        this.codeImage = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${data.uri}`;
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
exports.PlaylistOwner = PlaylistOwner;
;
