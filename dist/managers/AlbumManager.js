"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Album_1 = __importDefault(require("../structures/Album"));
const Errors_1 = require("../Errors");
const BaseManager_1 = __importDefault(require("./BaseManager"));
const Track_1 = __importDefault(require("../structures/Track"));
/**
 * Manages all the spotify album api endpoints
 */
class AlbumManager extends BaseManager_1.default {
    /**
     * Returns spotify album information by id
     *
     * @param id The spotify id of the album
     * @param force If true, will directly fetch else will search for cache first!
     * @example await client.albums.get('id');
     */
    async get(id, force = !this.client.cacheOptions.cacheAlbums) {
        try {
            if (!force) {
                let existing = this.client.cache.albums.get(id);
                if (existing)
                    return existing;
            }
            const album = new Album_1.default(await this.fetch(`/albums/${id}`), this.client);
            if (this.client.cacheOptions.cacheAlbums)
                this.client.cache.albums.set(album.id, album);
            return album;
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    /**
     * Returns all the tracks of the spotify album
     *
     * @param id Id of the spotify album
     * @param options Options such as limit and offset
     * @example await client.albums.getTracks('id');
     */
    async getTracks(id, options) {
        try {
            const tracks = (await this.fetch(`/albums/${id}/tracks`)).items.map(x => new Track_1.default(x, this.client));
            if (this.client.cacheOptions.cacheTracks) {
                for (let i = 0; i < tracks.length; i++)
                    this.client.cache.tracks.set(tracks[i].id, tracks[i]);
            }
            return tracks;
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
}
exports.default = AlbumManager;
;
