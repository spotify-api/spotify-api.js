"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SimplifiedEpisode_1 = __importDefault(require("./SimplifiedEpisode"));
const Spotify_1 = __importDefault(require("../Spotify"));
const util = new Spotify_1.default();
/**
 * Show Structure
 */
class Show {
    /**
     * **Example:**
     *
     * ```js
     * const show = new Show(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        this.availableMarkets = data.available_markets;
        this.copyrights = data.copyrights;
        this.description = data.description;
        this.explicit = data.explicit;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.isExternallyHosted = data.is_externally_hosted;
        this.languages = data.languages;
        this.mediaType = data.media_type;
        this.name = data.name;
        this.publisher = data.publisher;
        this.type = data.type;
        this.uri = data.uri;
        this.totalEpisodes = data.total_episodes;
    }
    ;
    /**
     * Returns the array of simplified episodes
     * @readonly
     */
    get episodes() {
        return this.data.episodes.items.map(x => new SimplifiedEpisode_1.default(x));
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
exports.default = Show;
;
//# sourceMappingURL=Show.js.map