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
            const data = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'playlist',
                    q: query
                }
            })).playlists;
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
            const data = (await this.fetch(`/playlists/${id}/tracks`, { params: options }));
            const tracks = data.items.map(x => Playlist_1.PlaylistTrack(x, this.client));
            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: tracks
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
    /**
     * Follow a playlist!
     *
     * @param id ID of the spotify playlist
     * @param options Options consisting of public field
     * @example await client.playlists.follow('id');
     */
    async follow(id, options) {
        return await this.client.user.followPlaylist(id, options);
    }
    /**
     * Unfollow a playlist!
     *
     * @param id ID of the spotify playlist
     * @example await client.playlists.unfollow('id');
     */
    async unfollow(id) {
        return await this.client.user.unfollowPlaylist(id);
    }
    /**
     * Verify if the current user follows a playlist
     *
     * @param id ID of the spotify playlist
     * @example const followsPlaylist = await client.playlists.follows('id');
     */
    async follows(id) {
        return await this.client.user.followsPlaylist(id);
    }
    /**
     * Create a spotify playlist for yourself or for the current user!
     *
     * @param options Options to create a playlist!
     * @example await client.playlists.create({
     *     name: 'Funky playlist',
     *     description: 'My own cool playlist created by spotify-api.js',
     *     public: true,
     *     collaborative: false,
     *     userID: client.user.id // By default will be the current user id!
     * });
     */
    async create(options) {
        return await this.client.user.createPlaylist(options);
    }
    /**
     * Edit a spotify playlist using id
     *
     * @param id ID of the spotify playlist
     * @param options CreatePlaylist object but userID field should not be provided!
     * @example await client.playlists.edit('id', {
     *     description: 'Edited new description'
     * });
     */
    async edit(id, options) {
        return await this.client.user.editPlaylist(id, options);
    }
    /**
     * Add items to the playlist!
     *
     * @param id ID pf the spotify playlist
     * @param items Array of uris of the spotify episodes or spotify tracks to add to the playlist
     * @param options Options containing position field
     * @example await client.playlists.addItems('id', ['spotify:track:id']);
     */
    async addItems(id, items, options) {
        try {
            return (await this.fetch(`/playlists/${id}/tracks`, {
                method: 'POST',
                params: {
                    ...options,
                    uris: items.join(',')
                }
            })).snapshot_id;
        }
        catch (e) {
            return Errors_1.handleError(e) || null;
        }
    }
    /**
     * Reorder items of the playlist!
     *
     * @param id ID of the spotify playlist
     * @param options ReorderOptions of spotify playlist!
     * @example await client.playlists.reorderItems('id', ['spotify:track:id'], {
     *     insertBefore: 10
     * })
     */
    async reorderItems(id, items, options = {}) {
        try {
            const opts = {
                range_start: options.rangeStart,
                insert_before: options.insertBefore,
                range_length: options.rangeLength,
                snapshot_id: options.snapshotID
            };
            Object.keys(opts).forEach(x => !opts[x] ? delete opts[x] : null);
            return (await this.fetch(`/playlists/${id}/tracks`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    ...opts,
                    uris: items.join(',')
                }
            })).snapshot_id;
        }
        catch (e) {
            return Errors_1.handleError(e) || null;
        }
    }
    /**
     * Remove items from the playlist!
     *
     * @param id ID of the spotify playlist
     * @param items Array of spotify uris of tracks and episodes to remove from the playlist!
     * @param snapshotID The playlist’s snapshot ID against which you want to make the changes.
     * @example await client.playlists.removeItems('id', ['spotify:track:id']);
     */
    async removeItems(id, items, snapshotID) {
        try {
            const opts = { snapshot_id: snapshotID };
            Object.keys(opts).forEach(x => !opts[x] ? delete opts[x] : null);
            return (await this.fetch(`/playlists/${id}/tracks`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    ...opts,
                    tracks: items.map(uri => ({ uri }))
                }
            })).snapshot_id;
        }
        catch (e) {
            return Errors_1.handleError(e) || null;
        }
    }
    /**
     * Upload a custom image to the playlist!
     *
     * @param id ID of the spotify playlist
     * @param image Image data url of image/jpeg to upload!
     * @example await client.playlists.uploadImage('id', imageDataUri); // Make sure the URI isn't prepended by 'data:image/jpeg;base64,'
     */
    async uploadImage(id, image) {
        try {
            await this.fetch(`/playlists/${id}/images`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "image/jpeg"
                },
                body: image
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
}
exports.default = PlaylistManager;
