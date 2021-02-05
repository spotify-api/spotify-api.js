"use strict";
/**
 * User Manager file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
const User_1 = __importDefault(require("../structures/User"));
const Playlist_1 = __importDefault(require("../structures/Playlist"));
/**
 * Class of all Spotify Api Methods related to users
 */
class UserManager extends Spotify_1.default {
    /**
     * Class of all Spotify Api Methods related to users!
     *
     * @param client Your spotify client!
     */
    constructor(client) {
        super(client.token);
        this.client = client;
    }
    /**
     * Returns the spotify user information by its id!
     *
     * @param id Spotify id of the user
     * @param force If true, will forcefully fetch data else will search for cache!
     * @example const user = await spotify.users.get("id"); // Returns the user details by id...
     */
    async get(id, force = false) {
        if (!id)
            throw new Error_1.MissingParamError("missing id to fetch user");
        if (!force) {
            let existing = this.client.cache.users.get(id);
            if (existing)
                return existing;
        }
        try {
            const data = new User_1.default(await this.fetch({ link: `v1/users/${id}` }), this.client);
            if (this.client.cacheOptions.cacheUsers)
                this.client.cache.users.push(data);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
    /**
     * Get a spotify user's playlists by the user's id!
     *
     * @param id Id of the user
     * @param options Options to make your data collection better!
     * @example const playlists = await spotify.users.getPlaylists("id"); // Returns the user playlists by id...
     */
    async getPlaylists(id, options = { limit: 20 }) {
        try {
            if (!id)
                throw new Error_1.MissingParamError("Missing id to fetch user!");
            const data = await this.fetch({
                link: `v1/users/${id}/playlists`,
                params: {
                    limit: options.limit,
                    ...options.params
                }
            });
            const items = data.items.map(x => new Playlist_1.default(x, this.client));
            if (this.client.cacheOptions.cachePlaylists)
                this.client.cache.playlists.push(...items);
            return items;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
        ;
    }
    ;
    /**
     * Verify if current user follows this user!
     * Will only work if you have a current user token!
     *
     * @param ids Ids of the user or users
     */
    async follows(...ids) {
        return await this.client.user.followsUser(...ids);
    }
    /**
     * Follow a user by id!
     * Will only work if you have a current user token!
     *
     * @param ids Ids of the user or users
     */
    async follow(...ids) {
        await this.client.user.followUser(...ids);
    }
    /**
     * Unfollow a user by id!
     * Will only work if you have a current user token!
     *
     * @param ids Ids of the user or users
     */
    async unfollow(...ids) {
        await this.client.user.unfollowUser(...ids);
    }
}
exports.default = UserManager;
;
