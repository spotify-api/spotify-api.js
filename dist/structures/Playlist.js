"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistTrack = void 0;
const User_1 = __importDefault(require("./User"));
const Track_1 = __importDefault(require("./Track"));
const Episode_1 = __importDefault(require("./Episode"));
const Spotify_1 = __importDefault(require("../Spotify"));
/**
 * Spotify Api's Playlist Track Object
 * This is a extended form object used in playlist's tracks!
 */
class PlaylistTrack {
    /**
     * **Example:**
     *
     * ```js
     * const track = new PlaylistTrack(data, client);
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
     * Returns a Spotify User who added this track to the playlist! If no one did, will return null!
     * @readonly
     */
    get addedBy() {
        if ('added_by' in this.data)
            return new User_1.default(this.data.added_by, this.client);
        else
            return null;
    }
    ;
    /**
     * Full info of the track!
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
 * Spotify Api's Playlist Object
 */
class Playlist {
    /**
     * Spotify Api's Playlist Object
     *
     * @param data Received raw data from the spotify api
     * @param client Your Spotify Client!
     * @example const playlist = new Playlist(data, client);
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
    }
    ;
    /**
     * Returns the Spotify User who created the playlist!
     * @readonly
     */
    get owner() {
        return new User_1.default(this.data.owner, this.client);
    }
    ;
    /**
     * Returns the total tracks of playlist in the form of array of PlaylistTracks!
     * @readonly
     */
    get tracks() {
        return this.data.tracks.items.map(x => new PlaylistTrack(x, this.client));
    }
    ;
    /**
     * Returns a code image of the Playlist!
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Spotify_1.default.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    /**
     * Refetches the playlist and returns you the new one and updates the cache too!
     */
    async fetch() {
        return await this.client.playlists.get(this.id, true);
    }
    /**
     * Follows this playlist!
     * Will work only if you have a current user token!
     */
    async follow() {
        await this.client.user.followPlaylist(this.id);
    }
    /**
     * Unfollows this playlist!
     * Will work only if you have a current user token!
     */
    async unfollow() {
        await this.client.user.unfollowPlaylist(this.id);
    }
}
exports.default = Playlist;
;
