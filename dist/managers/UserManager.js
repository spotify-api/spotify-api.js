"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Playlist_1 = __importDefault(require("../structures/Playlist"));
const User_1 = __importDefault(require("../structures/User"));
const BaseManager_1 = __importDefault(require("./BaseManager"));
const Errors_1 = require("../Errors");
/**
 * A class which manages the users api
 */
class UserManager extends BaseManager_1.default {
    /**
     * Get a spotify user information by spotify id!
     *
     * @param id Spotify user id
     * @param force If true, will directly fetch else will search for cache first!
     * @example await client.users.get('id');
     */
    async get(id, force = !this.client.cacheOptions.cacheUsers) {
        if (!force) {
            let existing = this.client.cache.users.get(id);
            if (existing)
                return existing;
        }
        try {
            const user = new User_1.default(await this.fetch(`/users/${id}`), this.client);
            if (this.client.cacheOptions.cacheUsers)
                this.client.cache.users.set(user.id, user);
            return user;
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    /**
     * Returns the saved playlist of the user!
     *
     * @param id The spotify user id
     * @param options Options containing the offset and limit!
     * @example await client.users.getPlaylists('id', {
     *     limit: 5,
     *     offset: 2
     * });
     */
    async getPlaylists(id, options) {
        try {
            const data = (await this.fetch(`/users/${id}/playlists`, { params: options }));
            const playlists = data.items.map(x => new Playlist_1.default(x, this.client));
            if (this.client.cacheOptions.cachePlaylists) {
                for (let i = 0; i < playlists.length; i++)
                    this.client.cache.playlists.set(playlists[i].id, playlists[i]);
            }
            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: playlists
            };
        }
        catch (e) {
            return Errors_1.handleError(e) || {
                limit: 0,
                offset: 0,
                total: 0,
                items: []
            };
        }
    }
}
exports.default = UserManager;
;
