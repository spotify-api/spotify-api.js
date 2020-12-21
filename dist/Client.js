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
/**
 * **Client class**
 *
 * The class which collects all the methods
 */
class Client {
    /**
     * @param oauth Token
     *
     * Pass the spotify oauth `token`
     * ```js
     * const Spotify = require('spotify-api.js')
     * const client = new Spotify.Client('oauth token')
     * ```
     */
    constructor(oauth, cacheOptions = {
        cacheTracks: false
    }) {
        this.token = oauth || 'NO TOKEN';
        this.utils = new Spotify_1.default(this.token);
        this.startedAt = Date.now();
        this.cacheOptions = cacheOptions;
        this.tracks = new Track_1.default(this.token, this);
        this.user = new UserClient_1.default(this.token);
        this.oauth = new Auth_1.default(this.token);
        this.users = new User_1.default(this.token, this);
        this.playlists = new Playlist_1.default(this.token, this);
        this.albums = new Album_1.default(this.token, this);
        this.artists = new Artist_1.default(this.token, this);
        this.episodes = new Episode_1.default(this.token, this);
        this.shows = new Show_1.default(this.token, this);
        this.browse = new Browse_1.default(this.token, this);
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
    }
    ;
    /**
     * **Example:**
     * ```js
     * client.login('token');
     * ```
     *
     * @param token string
     */
    login(token) {
        if (!token)
            throw new Error_1.MissingParamError('missing token');
        this.token = token;
        this.utils = new Spotify_1.default(this.token);
        this.startedAt = Date.now();
        this.oauth = new Auth_1.default(this.token);
        this.users = new User_1.default(this.token, this);
        this.playlists = new Playlist_1.default(this.token, this);
        this.tracks = new Track_1.default(this.token, this);
        this.albums = new Album_1.default(this.token, this);
        this.artists = new Artist_1.default(this.token, this);
        this.episodes = new Episode_1.default(this.token, this);
        this.shows = new Show_1.default(this.token, this);
        this.browse = new Browse_1.default(this.token, this);
        this.user = new UserClient_1.default(this.token);
    }
    ;
    /**
     * Uptime of the client
     */
    get uptime() {
        return Date.now() - this.startedAt;
    }
    ;
    /**
     * **Example:**
     * ```js
     * const search = await client.search('search', { limit: 10, type: ['track'] });
     * ```
     *
     * @param q Query
     * @param options Your options to selected
     */
    async search(q, options = {}) {
        if (!q)
            throw new Error_1.MissingParamError('missing query');
        if (!options.type)
            options.type = ['track', 'album', 'artist', 'playlist', 'show', 'episode'];
        try {
            return await this.utils.fetch({
                link: `v1/search`,
                params: {
                    q,
                    type: options.type.join(','),
                    market: "US",
                    limit: options.limit || 20,
                },
            });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
    /**
     * **Example:**
     * ```js
     * client.request('me', {}, (err, data) => {
     *     if(err) return console.error(err);
     *     if(data) {
     *         console.log('Success!');
     *         console.log(data);
     *     };
     * });
     * ```
     *
     * @param path Path to request
     * @param options Options to request
     * @param callback Callback when request is over
     */
    request(path, options, callback) {
        this.utils.fetch({
            link: path,
            ...options
        })
            .then(x => callback(null, x))
            .catch(x => callback(x, null));
    }
    ;
    /**
     * **Example:**
     *
     * ```js
     * let uriInfo = await client.getByURI("spotify:album:0sNOF9WDwhWunNAHPD3Baj");
     * ```
     *
     * @param uri Uri
     * @param force If true then will directly fetch instead of searching cache
     */
    async getByURI(uri, force = false) {
        if (!uri.match(/spotify\:(track|album|artist|episode|show|user)\:(.*?)/g))
            throw new TypeError('Invalid uri form');
        let split = uri.split(':');
        let id = split[2];
        switch (split[1]) {
            case 'album': return await this.albums.get(id, force);
            case 'artist': return await this.artists.get(id, force);
            case 'episode': return await this.episodes.get(id, force);
            case 'show': return await this.shows.get(id, force);
            case 'user': return await this.users.get(id, force);
            case 'track': return await this.tracks.get(id, force);
            default: throw new Error('Invalid uri form');
        }
        ;
    }
    ;
}
exports.default = Client;
;
