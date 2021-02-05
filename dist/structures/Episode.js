"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Episode Structure
 */
const Spotify_1 = __importDefault(require("../Spotify"));
const Show_1 = __importDefault(require("./Show"));
/**
 * Spotify Api's Episode Object!
 */
class Episode {
    /**
     * Spotify Api's Episode Object!
     *
     * @param data Received raw data from the spotify api
     * @param client Your Spotify client
     * @example const episode = new Episode(data, client);
     */
    constructor(data, client) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
        this.audioPreviewUrl = data.audio_preview_url;
        this.description = data.description;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.isExternallyHosted = data.is_externally_hosted;
        this.playable = data.is_playable;
        this.languages = data.languages;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.type = data.type;
        this.uri = data.uri;
        if ('resume_point' in data) {
            this.resumePoint = {
                fullyPlayed: data.resume_point.fully_played,
                resumePoint: data.resume_point.resume_position_ms
            };
        }
        ;
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
     * Returns the Spotify Show Object which the episode belongs to. Will return null if none!
     * @readonly
     */
    get show() {
        return this.data.show ? new Show_1.default(this.data.show, this.client) : null;
    }
    ;
    /**
     * Returns the Date object when the episode was released at!
     * @readonly
     */
    get releasedAt() {
        return new Date(this.releaseDatePrecision);
    }
    ;
    /**
     * Refetches the Episode and refreshes the cache!
     */
    async fetch() {
        return await this.client.episodes.get(this.id, true);
    }
    ;
}
;
exports.default = Episode;
