"use strict";
/**
 * File where exports all required only functions, classes
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Structures = exports.Interface = exports.Util = exports.UserPlayer = exports.UserClient = exports.Browse = exports.Show = exports.Episode = exports.Artist = exports.Album = exports.Track = exports.Playlist = exports.User = exports.Auth = exports.Client = exports.version = void 0;
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
const Interface = __importStar(require("./structures/Interface"));
exports.Interface = Interface;
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
const Album_2 = __importDefault(require("./structures/Album"));
const Artist_2 = __importDefault(require("./structures/Artist"));
const Episode_2 = __importDefault(require("./structures/Episode"));
const Playlist_2 = __importDefault(require("./structures/Playlist"));
const Track_2 = __importStar(require("./structures/Track"));
const PublicUser_1 = __importDefault(require("./structures/PublicUser"));
const Show_2 = __importDefault(require("./structures/Show"));
const PlaylistUtils_1 = require("./structures/PlaylistUtils");
const SimplifiedAlbum_1 = __importDefault(require("./structures/SimplifiedAlbum"));
const SimplifiedArtist_1 = __importDefault(require("./structures/SimplifiedArtist"));
const SimplifiedEpisode_1 = __importDefault(require("./structures/SimplifiedEpisode"));
const SimplifiedPlaylist_1 = __importDefault(require("./structures/SimplifiedPlaylist"));
const SimplifiedShow_1 = __importDefault(require("./structures/SimplifiedShow"));
const SimplifiedTrack_1 = __importDefault(require("./structures/SimplifiedTrack"));
exports.Structures = {
    Track: Track_2.default,
    Album: Album_2.default,
    Artist: Artist_2.default,
    Episode: Episode_2.default,
    Playlist: Playlist_2.default,
    Show: Show_2.default,
    PlaylistOwner: PlaylistUtils_1.PlaylistOwner,
    PlaylistTrack: PlaylistUtils_1.PlaylistTrack,
    PublicUser: PublicUser_1.default,
    LinkedTrack: Track_2.LinkedTrack,
    SimplifiedAlbum: SimplifiedAlbum_1.default,
    SimplifiedArtist: SimplifiedArtist_1.default,
    SimplifiedEpisode: SimplifiedEpisode_1.default,
    SimplifiedPlaylist: SimplifiedPlaylist_1.default,
    SimplifiedShow: SimplifiedShow_1.default,
    SimplifiedTrack: SimplifiedTrack_1.default
};
exports.default = Client_1.default;
