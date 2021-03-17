"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Episode_1 = __importDefault(require("./Episode"));
/**
 * Spotify Api's Show Object!
 */
class Show {
    /**
     * Spotify Api's Show Object!
     *
     * @param data Received raw data from the spotify api
     * @param client Spotify Client
     * @example const show = new Show(data, client);
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
        this.episodes = data.episodes.items.map(x => new Episode_1.default(x, this.client));
    }
    /**
     * Returns a code image of the Show!
     *
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    /**
     * Fetches the show and refreshes the cache!
     */
    async fetch() {
        return await this.client.shows.get(this.id, true);
    }
    /**
     * Returns the episodes by fetching!
     *
     * @param limit Limit of your results
     * @param force If true, will directly fetch else will search for cache
     * @example show.getEpisodes();
     */
    async getEpisodes(options, force = !this.client.cacheOptions.cachePlaylists) {
        if (!force && this.episodes.length)
            return this.episodes;
        const episodes = await this.client.shows.getEpisodes(this.id, options);
        if (this.client.cacheOptions.cacheEpisodes)
            this.episodes = episodes;
        return episodes;
    }
}
exports.default = Show;
;
