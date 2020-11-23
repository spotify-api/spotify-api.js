"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SimplifiedArtist_1 = __importDefault(require("./SimplifiedArtist"));
class Artist extends SimplifiedArtist_1.default {
    constructor(data) {
        super(data);
        this.followers = data.followers.total;
        this.genres = data.genres;
        this.images = data.images;
        this.popularity = data.popularity;
    }
    ;
}
;
exports.default = Artist;
//# sourceMappingURL=Artist.js.map