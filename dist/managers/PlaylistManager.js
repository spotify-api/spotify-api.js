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
     * Search playlists!
     *
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.playlists.search('some query');
     */
    async search(query, options) {
        try {
            const playlists = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'playlist',
                    q: query
                }
            })).playlists.items.map(x => new Playlist_1.default(x, this.client));
            if (this.client.cacheOptions.cachePlaylists) {
                for (let i = 0; i < playlists.length; i++)
                    this.client.cache.playlists.set(playlists[i].id, playlists[i]);
            }
            return playlists;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Get a spotify playlist information by spotify id!
     *
     * @param id Spotify playlist id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where the data needs to be fetched from
     * @example await client.playlists.get('id');
     */
    async get(id, force = !this.client.cacheOptions.cachePlaylists, market = 'US') {
        if (!force) {
            let existing = this.client.cache.playlists.get(id);
            if (existing)
                return existing;
        }
        try {
            const playlist = new Playlist_1.default(await this.fetch(`/playlists/${id}`, {
                params: { market }
            }), this.client);
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
     * @param options Basic PagingOptions
     * @example await client.playlists.getTracks('id');
     */
    async getTracks(id, options = { market: 'US' }) {
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
    /**
     * Verify if many or some user follows a playlist!
     *
     * @param playlistID Spotify playlist id
     * @param ids Array of user ids to verify
     * @example const [firstUserFollows, secondUserFollows] = await client.playlists.userFollows('playlist_id', 'userid1', 'userid2');
     */
    async userFollows(playlistID, ...ids) {
        try {
            return await this.fetch(`/playlists/${playlistID}/followers/contains`, {
                params: {
                    ids: ids.join(',')
                }
            });
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
}
exports.default = PlaylistManager;
