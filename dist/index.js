"use strict";
/**
 * File where exports all required only functions, classes
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = exports.UserPlayer = exports.UserClient = exports.Browse = exports.Show = exports.Episode = exports.Artist = exports.Album = exports.Track = exports.Playlist = exports.User = exports.Auth = exports.Client = exports.version = void 0;
const Client_1 = __importDefault(require("./Client"));
exports.Client = Client_1.default;
const Auth_1 = __importDefault(require("./lib/Auth"));
exports.Auth = Auth_1.default;
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
const Browse_1 = __importDefault(require("./lib/Browse"));
exports.Browse = Browse_1.default;
const Episode_1 = __importDefault(require("./lib/Episode"));
exports.Episode = Episode_1.default;
const Show_1 = __importDefault(require("./lib/Show"));
exports.Show = Show_1.default;
const Spotify_1 = __importDefault(require("./Spotify"));
exports.Util = Spotify_1.default;
const UserClient_1 = __importDefault(require("./UserClient"));
exports.UserClient = UserClient_1.default;
const UserPlayer_1 = __importDefault(require("./UserPlayer"));
exports.UserPlayer = UserPlayer_1.default;
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
const version = '5.0.0';
exports.version = version;
exports.default = {
    version,
    Client: Client_1.default,
    Auth: Auth_1.default,
    User: User_1.default,
    Playlist: Playlist_1.default,
    Track: Track_1.default,
    Album: Album_1.default,
    Artist: Artist_1.default,
    Episode: Episode_1.default,
    Show: Show_1.default,
    Browse: Browse_1.default,
    UserClient: UserClient_1.default,
    UserPlayer: UserPlayer_1.default,
    Util: Spotify_1.default
};
//# sourceMappingURL=index.js.map