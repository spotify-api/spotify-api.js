"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../Errors");
const Playlist_1 = __importStar(require("../structures/Playlist"));
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
    /**
     * Return all the tracks of the spotify playlist!
     *
     * @param id The id of the playlist
     * @param options Options such as limit and offset
     * @example await client.playlists.getTracks('id');
     */
    async getTracks(id, options) {
        try {
            const tracks = (await this.fetch(`/playlists/${id}/tracks`, {
                params: options
            })).items.map(x => Playlist_1.PlaylistTrack(x, this.client));
            return tracks;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
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
