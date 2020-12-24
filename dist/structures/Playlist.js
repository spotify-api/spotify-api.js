"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistTrack = void 0;
const PublicUser_1 = __importDefault(require("./PublicUser"));
const Track_1 = __importDefault(require("./Track"));
const Episode_1 = __importDefault(require("./Episode"));
const Spotify_1 = __importDefault(require("../Spotify"));
class PlaylistTrack {
    /**
     * **Example:**
     *
     * ```js
     * const track = new PlaylistTrack(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     * @param client Spotify Client
     */
    constructor(data, client) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
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
            return new PublicUser_1.default(this.data.added_by, this.client);
        else
            return null;
    }
    ;
    /**
     * Full info of the track
     * @readonly
     */
    get track() {
        return this.data.track.description ? new Episode_1.default(this.data.track, this.client) : new Track_1.default(this.data.track, this.client);
    }
    ;
}
exports.PlaylistTrack = PlaylistTrack;
;
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
    constructor(data, client) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = data.external_urls;
        this.totalFollowers = data.followers.total;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.public = data.public;
        this.snapshotId = data.snapshot_id;
        this.type = data.type;
        this.uri = data.uri;
        this.codeImage = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${this.uri}`;
    }
    ;
    /**
     * Owner user object
     * @readonly
     */
    get owner() {
        return new PublicUser_1.default(this.data.owner, this.client);
    }
    ;
    /**
     * Returns the array of playlist tracks
     * @readonly
     */
    get tracks() {
        return this.data.tracks.items.map(x => new PlaylistTrack(x, this.client));
    }
    ;
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Spotify_1.default.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    /**
     * Returns a fresh playlist without searching in the cache!
     */
    async fetch() {
        return await this.client.playlists.get(this.id, true);
    }
    /**
     * Follows this playlist
     */
    async follow() {
        await this.client.user.followPlaylist(this.id);
    }
    /**
     * Unfollows a playlist
     */
    async unfollow() {
        await this.client.user.unfollowPlaylist(this.id);
    }
}
exports.default = Playlist;
;
