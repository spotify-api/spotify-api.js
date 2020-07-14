"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./Class/Track/index"));
const index_2 = __importDefault(require("./Class/Artist/index"));
const index_3 = __importDefault(require("./Class/OAuth/index"));
const index_4 = __importDefault(require("./Class/Album/index"));
const index_5 = __importDefault(require("./Class/User/index"));
const index_6 = __importDefault(require("./Class/Playlist/index"));
class default_1 {
    constructor(oauth) {
        if (!oauth)
            throw new Error("(Spotify-api.js)No OAuth token was Provided");
        this.token = oauth;
        this.track = new index_1.default(oauth);
        this.artist = new index_2.default(oauth);
        this.oauth = new index_3.default(oauth);
        this.album = new index_4.default(oauth);
        this.user = new index_5.default(oauth);
        this.playlist = new index_6.default(oauth);
    }
}
exports.default = default_1;
//# sourceMappingURL=client.js.map