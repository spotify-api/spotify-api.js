"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("./Client"));
const Errors_1 = require("./Errors");
const Track_1 = __importDefault(require("./structures/Track"));
const Artist_1 = __importDefault(require("./structures/Artist"));
/**
 * A class which accesses the current user endpoints!
 */
class UserClient {
    constructor(token) {
        this.name = '';
        this.country = '';
        this.email = 'unknown';
        this.externalUrls = {};
        this.totalFollowers = 0;
        this.product = 'unknown';
        this.images = [];
        this.uri = '';
        this.id = '';
        this.href = '';
        this.affinity = {
            tracks: [],
            artists: []
        };
        Object.defineProperty(this, 'client', { value: typeof token == 'string' ? new Client_1.default(token) : token });
    }
    /**
     * Returns current user details
     *
     * @example const user = await user.info();
     */
    async info() {
        try {
            const data = await this.client.util.fetch('/me');
            this.name = data.display_name;
            this.country = data.country || 'unknown';
            this.id = data.id;
            this.email = data.email || 'unknown';
            this.externalUrls = data.external_urls;
            this.totalFollowers = data.followers.total;
            this.href = data.href;
            this.images = data.images;
            this.product = data.product || 'unknown';
            this.uri = data.uri;
        }
        catch (e) {
            throw new Errors_1.UnexpectedError(e);
        }
        return this;
    }
    /**
     * Returns the top tracks of the current user!
     *
     * @param options Basic AffinityOptions
     * @example await user.getTopTracks();
     */
    async getTopTracks(options = {}) {
        try {
            const tracks = (await this.client.util.fetch('/me/top/tracks', {
                params: options
            })).items.map(x => new Track_1.default(x, this.client));
            if (this.client.cacheOptions.cacheCurrentUser)
                this.affinity.tracks = tracks;
            return tracks;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Returns the top artists of the current user!
     *
     * @param options Basic AffinityOptions
     * @example await user.getTopArtists();
     */
    async getTopArtists(options = {}) {
        try {
            const artists = (await this.client.util.fetch('/me/top/artists', {
                params: options
            })).items.map(x => new Artist_1.default(x, this.client));
            if (this.client.cacheOptions.cacheCurrentUser)
                this.affinity.artists = artists;
            return artists;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Follow a playlist by id!
     *
     * @param id The id of the playlist!
     * @param options Options such as public!
     * @example await client.user.followPlaylist('id');
     */
    async followPlaylist(id, options = { public: true }) {
        try {
            await this.client.util.fetch(`/playlists/${id}/followers`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    public: options.public || true
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Unfollow a playlist by id!
     *
     * @param id The id of the playlist!
     * @example await client.user.unfollowPlaylist('id');
     */
    async unfollowPlaylist(id) {
        try {
            await this.client.util.fetch(`/playlists/${id}/followers`, { method: 'DELETE' });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
}
exports.default = UserClient;
;
