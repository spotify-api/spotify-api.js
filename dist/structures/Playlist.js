"use strict";
/**
 * Playlist class
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaylistTrack_1 = __importDefault(require("../structures/PlaylistTrack"));
const PublicUser_1 = __importDefault(require("./PublicUser"));
const Spotify_1 = __importDefault(require("../Spotify"));
const util = new Spotify_1.default();
/**
 * Playlist structure
 */
class Playlist {
    /**
     * **Example:**
     *
     * ```js
     * const playlist = new Playlist(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = data.external_urls;
        this.totalFollowers = data.followers.total;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.owner = new PublicUser_1.default(data.owner);
        this.public = data.public;
        this.snapshotId = data.snapshot_id;
        this.type = data.type;
        this.uri = data.uri;
        this.codeImage = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${this.uri}`;
    }
    ;
    /**
     * Returns the array of playlist tracks
     * @readonly
     */
    get tracks() {
        return this.data.tracks.items.map(x => new PlaylistTrack_1.default(x));
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
exports.default = Playlist;
;
//# sourceMappingURL=Playlist.js.map