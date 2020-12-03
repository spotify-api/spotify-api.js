"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaylistUtils_1 = require("./PlaylistUtils");
const Spotify_1 = __importDefault(require("../Spotify"));
const util = new Spotify_1.default();
/**
 * SimplifiedPlaylist class
 */
class SimplifiedPlaylist {
    /**
     * **Example:**
     *
     * ```js
     * const playlist = new SimplifiedPlaylist(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data });
        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.primaryColor = data.primary_color;
        this.public = data.public;
        this.snapshotId = data.snapshot_id;
        this.type = data.type;
        this.uri = data.uri;
        this.totalTracks = data.tracks.total;
    }
    ;
    /**
     * Owner object
     * @readonly
     */
    get owner() {
        return new PlaylistUtils_1.PlaylistOwner(this.data.owner);
    }
    ;
    /**
     * Returns an array of simplified tracks
     * @readonly
     */
    get tracks() {
        return this.data.tracks.items.map(x => new PlaylistUtils_1.PlaylistTrack(x));
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
exports.default = SimplifiedPlaylist;
