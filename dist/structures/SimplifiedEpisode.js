"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Episode Structure
 */
const Spotify_1 = __importDefault(require("../Spotify"));
const util = new Spotify_1.default();
/**
 * Simplified Episode class
 */
class SimplifiedEpisode {
    /**
     * **Example:**
     *
     * ```js
     * const episode = new SimplifiedEpisode(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
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
    /**
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt() {
        return new Date(this.releaseDate);
    }
    ;
}
;
exports.default = SimplifiedEpisode;
//# sourceMappingURL=SimplifiedEpisode.js.map