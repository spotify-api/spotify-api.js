"use strict";
/**
 * Simplified artist structure
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Spotify_1 = __importDefault(require("../Spotify"));
const util = new Spotify_1.default();
/**
 * SimplifiedArtist Class
 */
class SimplifiedArtist {
    /**
     * **Example:**
     *
     * ```js
     * const artist = new SimplifiedArtist(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.uri = data.uri;
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
;
exports.default = SimplifiedArtist;
//# sourceMappingURL=SimplifiedArtist.js.map