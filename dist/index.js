"use strict";
/**
 * File where exports all required only functions, classes
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = exports.Artist = exports.Album = exports.Track = exports.Playlist = exports.User = exports.Auth = exports.Client = exports.version = void 0;
const Client_1 = __importDefault(require("./Client"));
exports.Client = Client_1.default;
const Oauth_1 = __importDefault(require("./lib/Oauth"));
exports.Auth = Oauth_1.default;
const User_1 = __importDefault(require("./lib/User"));
exports.User = User_1.default;
const Playlist_1 = __importDefault(require("./lib/Playlist"));
exports.Playlist = Playlist_1.default;
const Track_1 = __importDefault(require("./lib/Track"));
exports.Track = Track_1.default;
const Album_1 = __importDefault(require("./lib/Album"));
exports.Album = Album_1.default;
const Artist_1 = __importDefault(require("./lib/Artist"));
exports.Artist = Artist_1.default;
const Spotify_1 = __importDefault(require("./Spotify"));
exports.Util = Spotify_1.default;
/**
 * To view up the version of the package.
 *
 * **Example:**
 * ```js
 * const spotify = require('spotify-api.js');
 * console.log(spotify.version);
 * ```
 *
 * Always try to update your spotify-api.js to v4.x.x
 */
const version = '4.1.0';
exports.version = version;
exports.default = {
    version,
    Client: Client_1.default,
    Auth: Oauth_1.default,
    User: User_1.default,
    Playlist: Playlist_1.default,
    Track: Track_1.default,
    Album: Album_1.default,
    Artist: Artist_1.default,
    Util: Spotify_1.default
};
//# sourceMappingURL=index.js.map