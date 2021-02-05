"use strict";
/**
 * File where Client class exists...
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = __importDefault(require("./lib/Auth"));
const User_1 = __importDefault(require("./lib/User"));
const Playlist_1 = __importDefault(require("./lib/Playlist"));
const Track_1 = __importDefault(require("./lib/Track"));
const Album_1 = __importDefault(require("./lib/Album"));
const Artist_1 = __importDefault(require("./lib/Artist"));
const Episode_1 = __importDefault(require("./lib/Episode"));
const Show_1 = __importDefault(require("./lib/Show"));
const Browse_1 = __importDefault(require("./lib/Browse"));
const Spotify_1 = __importDefault(require("./Spotify"));
const UserClient_1 = __importDefault(require("./UserClient"));
const CacheManager_1 = __importDefault(require("./CacheManager"));
const Error_1 = require("./Error");
const DefaultCacheOptions = {
    cacheTracks: false,
    cacheUsers: false,
    cacheCategories: false,
    cacheEpisodes: false,
    cacheShows: false,
    cachePlaylists: false,
    cacheArtists: false,
    cacheAlbums: false,
    cacheCurrentUser: false
};
/**
 * **The Spotify Api Client**
 *
 * The class which collects all the spotiify api methods
 */
class Client {
    /**
     * The constructor of the main spotify class
     *
     * @param oauth Your spotify oauth token
     * @param cacheOptions Your cache options to set mostly all of the options are set to false
     * @example const Spotify = require('spotify-api.js');
     * const client = new Spotify.Client('oauth token');
     */
    constructor(oauth, cacheOptions = DefaultCacheOptions) {
        this.token = oauth || 'NO TOKEN';
        this.utils = new Spotify_1.default(this.token);
        this.startedAt = Date.now();
        this.cacheOptions = cacheOptions;
        this.cacheOnReady = () => { };
        this.madeCache = false;
        this.tracks = new Track_1.default(this);
        this.user = new UserClient_1.default(this);
        this.oauth = new Auth_1.default(this.token);
        this.users = new User_1.default(this);
        this.playlists = new Playlist_1.default(this);
        this.albums = new Album_1.default(this);
        this.artists = new Artist_1.default(this);
        this.episodes = new Episode_1.default(this);
        this.shows = new Show_1.default(this);
        this.browse = new Browse_1.default(this);
        this.cache = {
            tracks: new CacheManager_1.default('id'),
            users: new CacheManager_1.default('id'),
            categories: new CacheManager_1.default('name'),
            episodes: new CacheManager_1.default('id'),
            shows: new CacheManager_1.default('id'),
            playlists: new CacheManager_1.default('id'),
            artists: new CacheManager_1.default('id'),
            albums: new CacheManager_1.default('id')
        };
        this.makeCache();
    }
    ;
    /**
     * Private caching init function
     * @private
     */
    async makeCache() {
        const reject = e => this.cacheOnReady(e);
        if (this.cacheOptions.cacheCurrentUser) {
            try {
                await this.user.info();
            }
            catch (e) {
                reject(e);
            }
        }
        this.cacheOnReady(null);
        this.madeCache = true;
    }
    ;
    /**
     * Login to the client with a different token!
     *
     * @param token string
     * @example client.login(token);
     */
    login(token) {
        if (!token)
            throw new Error_1.MissingParamError('missing token');
        this.token = token;
        this.utils = new Spotify_1.default(this.token);
        this.startedAt = Date.now();
        this.madeCache = false;
        this.oauth = new Auth_1.default(this.token);
        this.users = new User_1.default(this);
        this.playlists = new Playlist_1.default(this);
        this.tracks = new Track_1.default(this);
        this.albums = new Album_1.default(this);
        this.artists = new Artist_1.default(this);
        this.episodes = new Episode_1.default(this);
        this.shows = new Show_1.default(this);
        this.browse = new Browse_1.default(this);
        this.user = new UserClient_1.default(this);
        this.makeCache();
    }
    ;
    /**
     * Returns the uptime of the client in ms
     * @readonly
     */
    get uptime() {
        return Date.now() - this.startedAt;
    }
    ;
    /**
     * Search across spotify api!
     *
     * @param q Query
     * @param options Your options to selected
     * @example const search = await client.search('search', { limit: 10, type: ['track'] });
     */
    async search(q, options = {}) {
        if (!q)
            throw new Error_1.MissingParamError('missing query');
        if (!options.type)
            options.type = ['track', 'album', 'artist', 'playlist', 'show', 'episode'];
        try {
            return await this.utils.fetch({
                link: `v1/search?q=${encodeURIComponent(q)}&type=${options.type.join(',')}&market=US&limit=${options.limit || 20}`,
            });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
    /**
     * Do a custom request on the spotify api
     *
     * @param path Path to request
     * @param options Options to request
     * @param callback Callback when request is over
     * @example client.request('v1/me', {}, (err, data) => {
     *     if(err) return console.error(err);
     *     if(data) {
     *         console.log('Success!');
     *         console.log(data);
     *     };
     * });
     */
    request(path, options, callback) {
        this.utils.fetch({ link: path, ...options }).then(x => callback(null, x), x => callback(x, null));
    }
    ;
}
exports.default = Client;
;
