"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Spotify_1 = __importDefault(require("../Spotify"));
const util = new Spotify_1.default();
/**
 * Public User Class
 */
class PublicUser {
    /**
     * **Example:**
     *
     * ```js
     * const user = new PublicUser(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        this.displayName = data.display_name;
        this.externalUrls = data.external_urls;
        this.followers = data.followers;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;
        this.images = data.images;
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
exports.default = PublicUser;
//# sourceMappingURL=PublicUser.js.map