"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedTrack = void 0;
const Util_1 = __importDefault(require("../Util"));
const Album_1 = __importDefault(require("./Album"));
/**
 * Creates and returns a linked track object!
 */
function LinkedTrack(data) {
    return {
        externalUrls: data.external_urls,
        href: data.href,
        id: data.id,
        type: data.type,
        uri: data.uri,
        makeCodeImage(color = '1DB954') {
            return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${((new Util_1.default('')).hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
        }
    };
}
exports.LinkedTrack = LinkedTrack;
/**
 * Spotify Api's Track object
 */
class Track {
    /**
     * The Spotify Api's Track Object!
     *
     * @param data Received raw data from the spotify api
     * @param client The client
     * @example const track = new Track(data, client);
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
        this.externalIds = data.external_ids || null;
        this.popularity = data.popularity || null;
        this.restrictions = data.restrictions || null;
    }
    /**
     * Retunrns the linked form of the track!
     * @readonly
     */
    get linkedFrom() {
        return this.data.linked_from ? LinkedTrack(this.data.linked_from) : null;
    }
    /**
     * Returns the album where the track exists
     * @readonly
     */
    get album() {
        return new Album_1.default(this.data.album, this.client);
    }
    /**
     * Returns a code image of the track!
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    /**
     * Fetches tracks and refreshes the cache!
     * @example await track.fetch();
     */
    async fetch() {
        return await this.client.tracks.get(this.id, true);
    }
    /**
     * Returns the audio features of the track!
     * @example await track.getAudioFeatures();
     */
    async getAudioFeatures() {
        return await this.client.tracks.getAudioFeatures(this.id);
    }
    /**
     * Returns the audio analysis of the track!
     * @example await track.getAudioAnalysis();
     */
    async getAudioAnalysis() {
        return await this.client.tracks.getAudioAnalysis(this.id);
    }
}
exports.default = Track;
