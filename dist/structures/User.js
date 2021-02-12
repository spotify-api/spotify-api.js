"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Spotify_1 = __importDefault(require("../Spotify"));
/**
 * Spotify Api's User object!
 */
class User {
    /**
     * The Spotify Api's User object!
     *
     * @param data The raw spotify user data!
     * @param client The spotify client
     * @example const user = new PublicUser(data, client);
     */
    constructor(data, client) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
        this.name = data.display_name;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;
        this.images = data.images || [];
        this.playlists = [];
        if ('followers' in data)
            this.totalFollowers = data.followers.total;
    }
    ;
    /**
     * Fetches tracks and refreshes the cach!
     *
     * @example user.fetch();
     */
    async fetch() {
        return await this.client.users.get(this.id, true);
    }
    /**
     * Returns a code image
     *
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Spotify_1.default.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    /**
     * Returns the user's saved playlists!
     *
     * @param limit Limit of results
     * @param force If true will directly fetch and return else will return you from cache
     */
    async getPlaylists(limit = 20, force = false) {
        if (!force && this.playlists.length)
            return this.playlists;
        const data = await this.client.users.getPlaylists(this.id, { limit });
        this.playlists = data;
        return data;
    }
    /**
     * Verify if this user is followed by the current user but only if you have the required scopes
     * This method uses the client.user.followsUser
     */
    async follows() {
        return (await this.client.user.followsUser(this.id))[0];
    }
    /**
     * Follow this user!
     */
    async follow() {
        await this.client.user.followUser(this.id);
    }
    /**
     * Unfollow this user!
     */
    async unfollow() {
        await this.client.user.unfollowUser(this.id);
    }
}
exports.default = User;
;
