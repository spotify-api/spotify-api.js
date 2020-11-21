"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Artist_1 = __importDefault(require("./Artist"));
const Spotify_1 = __importDefault(require("../Spotify"));
const util = new Spotify_1.default();
class SimplifiedTrack {
    constructor(data) {
        this.artists = data.artists.map(x => new Artist_1.default(x));
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
        if ('linked_form' in data) {
            this.playable = data.is_playable;
            this.linkedFrom = data.linked_from;
        }
        ;
        this.restrictions = data.restrictions || null;
        this.local = data.is_local || null;
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
     * Check wheater if it is restricted or not
     * @readonly
     */
    get restricted() {
        return Boolean(this.restrictions);
    }
    ;
}
;
exports.default = SimplifiedTrack;
//# sourceMappingURL=SimplifiedTrack.js.map