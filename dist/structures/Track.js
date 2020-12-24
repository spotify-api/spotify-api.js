"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedTrack = void 0;
const Artist_1 = __importDefault(require("./Artist"));
const Album_1 = __importDefault(require("./Album"));
const Spotify_1 = __importDefault(require("../Spotify"));
/**
 * LinkedTrack Class
 */
class LinkedTrack {
    /**
     * **Example:**
     *
     * ```js
     * const track = new LinkedTrack(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;
    }
    ;
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Spotify_1.default.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
}
exports.LinkedTrack = LinkedTrack;
;
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
     * @param client The client
     */
    constructor(data, client) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
        this.availableMarkets = data.available_markets;
        this.discNumber = data.disc_number;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.previewUrl = data.preview_url;
        this.trackNumber = data.track_number;
        this.type = data.type;
        this.uri = data.uri;
        this.playable = data.is_playable;
        this.local = Boolean(data.is_local);
        this.audioFeatures = null;
        this.auidoAnalysis = null;
        this.externalIds = data.external_ids || null;
        this.popularity = data.popularity || null;
        this.restrictions = data.restrictions || null;
        this.simplified = true;
        if ('external_ids' in data) {
            this.simplified = false;
        }
        if ('linked_from' in data)
            this.linkedFrom = new LinkedTrack(data.linked_from);
    }
    /**
     * Album object
     * @readonly
     */
    get album() {
        return new Album_1.default(this.data.album, this.client);
    }
    /**
     * Returns the array of SimplifiedArtist
     * @readonly
     */
    get artists() {
        return this.data.artists.map(x => new Artist_1.default(x, this.client));
    }
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Spotify_1.default.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    /**
     * Returns the audio features of the tracks
     */
    async getAudioFeatures() {
        return this.audioFeatures || await this.client.tracks.audioFeatures(this.id);
    }
    /**
     * Returns the audio analysis of the tracks
     */
    async getAudioAnalysis() {
        return this.auidoAnalysis || await this.client.tracks.audioAnalysis(this.id);
    }
    /**
     * Fetches tracks
     */
    async fetch() {
        return await this.client.tracks.get(this.id, true);
    }
    /**
     * This method uses the client.user.deleteTrack
     * This method will delete this track from your save list
     */
    async delete() {
        await this.client.user.deleteTrack(this.id);
    }
    /**
     * This method uses client.user.addTrack
     * This method adds this track to your save list
     */
    async add() {
        await this.client.user.addTrack(this.id);
    }
}
exports.default = Track;
