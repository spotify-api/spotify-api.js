"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
     * @param client Spotify Client
     */
    constructor(data, client) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
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
        this.episodes = [];
    }
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Spotify_1.default.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    /**
     * Refreshes this show in cache
     */
    async fetch() {
        return await this.client.shows.get(this.id, true);
    }
    /**
     * Returns the episodes by fetching!
     *
     * @param force If true, will directly fetch else will search for cache
     * @param limit Limit of your results
     */
    async getEpisodes(force = false, limit = 20) {
        if (!force) {
            if (this.data.episodes)
                return this.episodes;
        }
        const data = await this.client.shows.getEpisodes(this.id, { limit });
        this.episodes = data;
        return data;
    }
    /**
     * This method uses the client.user.deleteShow method
     * This method deletes this show from your saved list
     */
    async delete() {
        await this.client.user.deleteShow(this.id);
    }
    /**
     * This method uses the client.user.addShow method
     * This method adds this show to your saved list
     */
    async add() {
        await this.client.user.addShow(this.id);
    }
}
exports.default = Show;
;
