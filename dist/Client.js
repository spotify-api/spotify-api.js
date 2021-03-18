"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __importDefault(require("./Util"));
const Collection_1 = __importDefault(require("./Collection"));
const AuthManager_1 = __importDefault(require("./managers/AuthManager"));
const UserManager_1 = __importDefault(require("./managers/UserManager"));
const PlaylistManager_1 = __importDefault(require("./managers/PlaylistManager"));
const EpisodeManager_1 = __importDefault(require("./managers/EpisodeManager"));
const ShowManager_1 = __importDefault(require("./managers/ShowManager"));
const BrowseManager_1 = __importDefault(require("./managers/BrowseManager"));
const TrackManager_1 = __importDefault(require("./managers/TrackManager"));
const AlbumManager_1 = __importDefault(require("./managers/AlbumManager"));
const ArtistManager_1 = __importDefault(require("./managers/ArtistManager"));
const SearchManager_1 = __importDefault(require("./managers/SearchManager"));
/**
 * The main spotify client class!
 */
class Client {
    /**
     * The main spotify client class!
     *
     * @param token Your spotify oauth token
     * @example new Spotify.Client();
     */
    constructor(token = 'NO TOKEN', options = {}) {
        this.token = token;
        this.onReady = options.ready || (() => { });
        delete options.ready;
        this.cacheOptions = options;
        this.cache = {
            users: new Collection_1.default(),
            playlists: new Collection_1.default(),
            episodes: new Collection_1.default(),
            shows: new Collection_1.default(),
            categories: new Collection_1.default(),
            tracks: new Collection_1.default(),
            albums: new Collection_1.default(),
            artists: new Collection_1.default()
        };
        Object.defineProperty(this, 'util', { value: new Util_1.default(this.token), writable: true });
        Object.defineProperty(this, 'auth', { value: new AuthManager_1.default(this.token), writable: true });
        Object.defineProperty(this, 'users', { value: new UserManager_1.default(this) });
        Object.defineProperty(this, 'playlists', { value: new PlaylistManager_1.default(this) });
        Object.defineProperty(this, 'episodes', { value: new EpisodeManager_1.default(this) });
        Object.defineProperty(this, 'shows', { value: new ShowManager_1.default(this) });
        Object.defineProperty(this, 'browse', { value: new BrowseManager_1.default(this) });
        Object.defineProperty(this, 'tracks', { value: new TrackManager_1.default(this) });
        Object.defineProperty(this, 'albums', { value: new AlbumManager_1.default(this) });
        Object.defineProperty(this, 'artists', { value: new ArtistManager_1.default(this) });
        Object.defineProperty(this, 'search', { value: SearchManager_1.default(this) });
    }
    async login(options, clientSecret) {
        if (typeof clientSecret == 'string') {
            this.token = await this.auth.getApiToken(options, clientSecret);
        }
        else {
            this.token = (await this.auth.getUserToken(options)).accessToken;
        }
        this.util.token = this.token;
        this.auth.token = this.token;
    }
}
exports.default = Client;
