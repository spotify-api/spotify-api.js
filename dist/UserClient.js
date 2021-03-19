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
            return artists;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Follow a playlist inshort words add the playlist to your library!
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
    /**
     * Verify if the current user follows a paticualr playlist by id!
     *
     * @param id Spotify playlist id
     * @example const follows = await client.user.followsPlaylist('id');
     */
    async followsPlaylist(id) {
        return (await this.client.playlists.userFollows(id, this.id))[0] || false;
    }
    /**
     * Returns the user's following list of artists!
     *
     * @param options Options such as after and limit!
     * @example const artists = await client.user.getFollowingArtists();
     */
    async getFollowingArtists(options) {
        try {
            const artists = (await this.client.util.fetch('/me/following', {
                params: {
                    ...options,
                    type: 'artist'
                }
            })).artists.items.map(x => new Artist_1.default(x, this.client));
            return artists;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Follow artists with their spotify ids!
     *
     * @param ids An array of spotify artist ids
     * @example await client.user.followArtists('id1', 'id2');
     */
    async followArtists(...ids) {
        try {
            await this.client.util.fetch(`/me/following`, {
                method: 'PUT',
                params: {
                    type: 'artist',
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Unfollow artists with their spotify ids!
     *
     * @param ids An array of spotify artist ids
     * @example await client.user.unfollowArtists('id1', 'id2');
     */
    async unfollowArtists(...ids) {
        try {
            await this.client.util.fetch(`/me/following`, {
                method: 'DELETE',
                params: {
                    type: 'artist',
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Follow users with their spotify ids!
     *
     * @param ids An array of spotify user ids
     * @example await client.user.followUsers('id1', 'id2');
     */
    async followUsers(...ids) {
        try {
            await this.client.util.fetch(`/me/following`, {
                method: 'PUT',
                params: {
                    type: 'user',
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Unfollow users with their spotify ids!
     *
     * @param ids An array of spotify user ids
     * @example await client.user.unfollowUsers('id1', 'id2');
     */
    async unfollowUsers(...ids) {
        try {
            await this.client.util.fetch(`/me/following`, {
                method: 'DELETE',
                params: {
                    type: 'user',
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Verify if the array of artists supplied is been followed by you!
     *
     * @param ids Array of spotify artist ids
     * @example const [followsArtist] = await client.user.followsArtists('id1');
     */
    async followsArtists(...ids) {
        try {
            return await this.client.util.fetch(`/me/following/contains`, {
                params: {
                    type: 'artist',
                    ids: ids.join(',')
                }
            });
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Verify if the array of users supplied is been followed by you!
     *
     * @param ids Array of spotify users ids
     * @example const [followsUser] = await client.user.followsUsers('id1');
     */
    async followsUsers(...ids) {
        try {
            return await this.client.util.fetch(`/me/following/contains`, {
                params: {
                    type: 'user',
                    ids: ids.join(',')
                }
            });
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
}
exports.default = UserClient;
;
