"use strict";
/**
 * User lib file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
const PublicUser_1 = __importDefault(require("../structures/PublicUser"));
const Playlist_1 = __importDefault(require("../structures/Playlist"));
/**
 * Class of all methods related to users
 */
class User extends Spotify_1.default {
    constructor(token, client) {
        super(token);
        this.client = client;
    }
    /**
     * **Example:**
     * ```js
     * const user = await spotify.users.get("id"); // Returns the user details by id...
     * ```
     *
     * @param id Id of the user
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
            const data = new PublicUser_1.default(await this.fetch({ link: `v1/users/${id}` }), this.client);
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
     * **Example:**
     * ```js
     * const playlists = await spotify.users.getPlaylists("id"); // Returns the user playlists by id...
     * ```
     *
     * @param id Id of the user
     */
    async getPlaylists(id, options = { limit: 20 }) {
        try {
            if (!id)
                throw new Error_1.MissingParamError("missing id to fetch user");
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
}
;
exports.default = User;
