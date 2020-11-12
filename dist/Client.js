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
const Error_1 = require("./Error");
/**
 * **Client class**
 *
 * The class which collects all the methods
 */
class default_1 {
    /**
     * @param oauth Token
     *
     * Pass the spotify oauth `token`
     * ```js
     * const Spotify = require('spotify-api.js')
     * const client = new Spotify.Client('oauth token')
     * ```
     */
    constructor(oauth) {
        this.token = oauth || 'NO TOKEN';
        this.utils = new Spotify_1.default(this.token);
        this.startedAt = Date.now();
        this.oauth = new Auth_1.default(this.token);
        this.users = new User_1.default(this.token);
        this.playlists = new Playlist_1.default(this.token);
        this.tracks = new Track_1.default(this.token);
        this.albums = new Album_1.default(this.token);
        this.artists = new Artist_1.default(this.token);
        this.episodes = new Episode_1.default(this.token);
        this.shows = new Show_1.default(this.token);
        this.browse = new Browse_1.default(this.token);
        this.user = new UserClient_1.default(this.token);
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
        this.users = new User_1.default(this.token);
        this.playlists = new Playlist_1.default(this.token);
        this.tracks = new Track_1.default(this.token);
        this.albums = new Album_1.default(this.token);
        this.artists = new Artist_1.default(this.token);
        this.episodes = new Episode_1.default(this.token);
        this.shows = new Show_1.default(this.token);
        this.browse = new Browse_1.default(this.token);
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
     * const search = await client.search('search', { limit: 10, search: ['track'] });
     * ```
     *
     * @param q Query
     * @param options Your options to selected
     */
    async search(q, options) {
        return new Promise(async (resolve, reject) => {
            if (!q)
                reject(new Error_1.MissingParamError('missing query'));
            if (!options)
                options = {};
            if (!Array.isArray(options.type))
                options.type = ['track', 'artist', 'album'];
            try {
                resolve(await this.utils.fetch({
                    link: `v1/search`,
                    params: {
                        q: encodeURIComponent(q),
                        type: options.type.join(','),
                        market: "US",
                        limit: options.limit || 20,
                    },
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
}
exports.default = default_1;
;
//# sourceMappingURL=Client.js.map