"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Oauth_1 = __importDefault(require("./lib/Oauth"));
const User_1 = __importDefault(require("./lib/User"));
const Playlist_1 = __importDefault(require("./lib/Playlist"));
const Track_1 = __importDefault(require("./lib/Track"));
const Album_1 = __importDefault(require("./lib/Album"));
const Artist_1 = __importDefault(require("./lib/Artist"));
const Spotify_1 = __importDefault(require("./Spotify"));
class default_1 {
    /**
     *
     * @param oauth {string}
     * Pass the spotify oauth `token`
     * ```js
     * const Spotify = require('spotify-api.js')
     * const client = new Spotify.Client('oauth token')
     * ```
     */
    constructor(oauth) {
        this.token = oauth;
        this.utils = new Spotify_1.default(this.token);
        this.lib = {
            Auth: Oauth_1.default, User: User_1.default, Playlist: Playlist_1.default, Track: Track_1.default, Album: Album_1.default, Artist: Artist_1.default
        };
        this.oauth = new Oauth_1.default(this.token);
        this.users = new User_1.default(this.token);
        this.playlists = new Playlist_1.default(this.token);
        this.tracks = new Track_1.default(this.token);
        this.albums = new Album_1.default(this.token);
        this.artists = new Artist_1.default(this.token);
    }
    ;
}
exports.default = default_1;
;
//# sourceMappingURL=Client.js.map
