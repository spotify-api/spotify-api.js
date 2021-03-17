"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistTrack = void 0;
const User_1 = __importDefault(require("./User"));
/**
 * Creates a playlist track object using spotify api data and spotify client!
 *
 * @param data Raw data from spotify api
 * @param client Your spotify client!
 * @example Spotify.PlaylistTrack(data, client);
 */
function PlaylistTrack(data, client) {
    return {
        addedAt: data.added_at,
        local: data.is_local,
        get addedBy() {
            return data.added_by ? new User_1.default(data.added_by, client) : null;
        },
        /** Track required */
    };
}
exports.PlaylistTrack = PlaylistTrack;
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
        var _a;
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = data.external_urls;
        this.totalFollowers = (_a = data.followers) === null || _a === void 0 ? void 0 : _a.total;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.public = data.public;
        this.snapshotID = data.snapshot_id;
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
        return this.data.tracks.items.map(x => PlaylistTrack(x, this.client));
    }
    ;
    /**
     * Fetches playlist and refreshes the cache!
     *
     * @example playlist.fetch();
     */
    async fetch() {
        return await this.client.playlists.get(this.id, true);
    }
    /**
     * Returns the images of the playlist!
     *
     * @example playlist.getImages();
     */
    async getImages() {
        return await this.client.playlists.getImages(this.id);
    }
    /**
     * Returns a code image of the Playlist!
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
}
exports.default = Playlist;
;
