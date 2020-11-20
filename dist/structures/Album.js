"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Spotify_1 = __importDefault(require("../Spotify"));
const SimplifiedArtist_1 = __importDefault(require("./SimplifiedArtist"));
const SimplifiedTrack_1 = __importDefault(require("./SimplifiedTrack"));
const util = new Spotify_1.default();
class Album {
    constructor(data) {
        this.albumType = data.album_type;
        this.artists = data.artists.map(x => new SimplifiedArtist_1.default(x));
        this.availableMarkets = data.available_markets;
        this.copyrights = data.copyrights;
        this.externalIds = data.external_ids;
        this.externalUrls = data.external_urls;
        this.genres = data.genres;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.popularity = data.popularity;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.tracks = data.tracks.items.map(x => new SimplifiedTrack_1.default(x));
        this.type = data.type;
        this.uri = data.uri;
    }
    ;
    async getCodeImage() {
        return await util.getCodeImage(this.uri);
    }
    ;
}
;
exports.default = Album;
//# sourceMappingURL=Album.js.map