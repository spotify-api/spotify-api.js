"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../Errors");
const Playlist_1 = __importDefault(require("../structures/Playlist"));
const BaseManager_1 = __importDefault(require("./BaseManager"));
/**
 * A class which manages the playlists
 */
class PlaylistManager extends BaseManager_1.default {
    /**
     * Get a spotify playlist information by spotify id!
     *
     * @param id Spotify playlist id
     * @param force If true, will directly fetch else will search for cache first!
     * @example await client.playlists.get('id');
     */
    async get(id, force = !this.client.cacheOptions.cachePlaylists) {
        if (!force) {
            let existing = this.client.cache.playlists.get(id);
            if (existing)
                return existing;
        }
        try {
            const playlist = new Playlist_1.default(await this.fetch(`/playlists/${id}`), this.client);
            if (this.client.cacheOptions.cachePlaylists)
                this.client.cache.playlists.set(playlist.id, playlist);
            return playlist;
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    /** Get track */
    /**
     * Returns the images of the playlists!
     *
     * @param id ID of the playlist
     * @example client.playlists.getImages(id);
     */
    async getImages(id) {
        try {
            return await this.fetch(`/playlists/${id}/images`);
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
}
exports.default = PlaylistManager;
