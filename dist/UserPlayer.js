"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * UserPlayer which access the user player only if the scoped token
 * has those correct scopes
 */
const axios_1 = __importDefault(require("axios"));
const Spotify_1 = __importDefault(require("./Spotify"));
const CacheManager_1 = __importDefault(require("./CacheManager"));
const Error_1 = require("./Error");
const Player_1 = require("./structures/Player");
const Track_1 = __importDefault(require("./structures/Track"));
const Episode_1 = __importDefault(require("./structures/Episode"));
/**
 * UserPlayer which access the user player only if the scoped token
 * has those correct scopes
 */
class UserPlayer extends Spotify_1.default {
    constructor(data, client) {
        super(data);
        this.client = client;
    }
    /**
     * **Example:**
     * ```js
     * const currentPlayback = await player.getCurrentPlayback();
     * ```
     *
     * Returns the current playback
     */
    async getCurrentPlayback() {
        try {
            return Player_1.Playback(await this.fetch({ link: 'v1/me/player' }), this.client);
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * const devices = await player.getDevices();
     * ```
     *
     * Returns the devices which has active player
     */
    async getDevices() {
        try {
            const data = await this.fetch({ link: 'v1/me/player/devices' });
            return CacheManager_1.default.create('id', ...data.devices.map(Player_1.Device));
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * const recentlyPlayed = await player.getRecentlyPlayed();
     * ```
     *
     * Returns the recently played information
     *
     * @param options Configure your results
     */
    async getRecentlyPlayed(options = { additionalTypes: 'track' }) {
        try {
            const data = await this.fetch({ link: `v1/me/player/recently-played`, params: { limit: options.limit, after: options.after, before: options.before, additional_types: options.additionalTypes } });
            return {
                items: data.items.map(Player_1.PlayHistory),
                cursors: data.cursors
            };
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * const currentlyPlaying = await player.getCurrentPlaying();
     * ```
     *
     * @param additionalTypes Addtional types such as episode and track!
     */
    async getCurrentlyPlaying(additionalTypes = 'track') {
        try {
            const data = await this.fetch({ link: 'v1/me/player/currently-playing', params: { additional_types: additionalTypes } });
            return {
                context: data.context ? {
                    externalUrls: data.context.external_urls,
                    href: data.context.href,
                    type: data.context.type,
                    uri: data.context.uri
                } : null,
                timestamp: data.timestamp,
                progress: data.progress_ms,
                isPlaying: data.is_playing,
                item: data.item ? (data.item.type == 'track' ? new Track_1.default(data.item, this.client) : new Episode_1.default(data.item, this.client)) : null,
                currentPlayingType: data.currently_playing_type,
                actions: data.actions
            };
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * player.pause('device-id'); // If id not provided then will stop the currently playing player!
     * ```
     *
     * @param device Device id which can be dounf through getDevices method
     */
    async pause(device) {
        try {
            if (device)
                await this.fetch({ method: 'PUT', link: `v1/me/player/pause`, params: { device_id: device } });
            else
                await this.fetch({ method: 'PUT', link: `v1/me/player/pause` });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * player.seek(100);
     * player.seek(100, 'deviceid');
     * ```
     *
     * @param position Position in ms to seek
     * @param device Device id to seek else will seek in the currently playing player
     */
    async seek(position, device) {
        try {
            if (device)
                await this.fetch({ method: 'PUT', link: `v1/me/player/seek`, params: { position_ms: position, device_id: device } });
            else
                await this.fetch({ method: 'PUT', link: `v1/me/player/seek`, params: { position_ms: position } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    /**
     * **Example:**
     * ```js
     * await player.repeat('track');
     * ```
     *
     * Repeats the player
     *
     * @param type Type of repeat mode
     * @param device Device id of the device else will use currently playing track
     */
    async repeat(type, device) {
        try {
            if (device)
                await this.fetch({ method: 'PUT', link: `v1/me/player/pause`, params: { state: type, device_id: device } });
            else
                await this.fetch({ method: 'PUT', link: `v1/me/player/pause`, params: { state: type } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * await player.setVolume(10);
     * ```
     *
     * Set the volume of the player
     *
     * @param volume Volume to set
     * @param device Device id. Optional!
     */
    async setVolume(volume, device) {
        try {
            if (device)
                await this.fetch({ method: 'PUT', link: `v1/me/player/volume`, params: { volume_percent: volume, device_id: device } });
            else
                await this.fetch({ method: 'PUT', link: `v1/me/player/volume`, params: { volume_percent: volume } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * await player.next()
     * ```
     *
     * Plays the next playback
     *
     * @param device Device id to skip the track if not provided then will skip from the current player
     */
    async next(device) {
        try {
            if (device)
                await this.fetch({ method: 'POST', link: `v1/me/player/next`, params: { device_id: device } });
            else
                await this.fetch({ method: 'POST', link: `v1/me/player/next` });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * await player.previous()
     * ```
     *
     * Plays the previous playback
     *
     * @param device Device id to play the previous track, if not provided, then will implement it in the current player
     */
    async previous(device) {
        try {
            if (device)
                await this.fetch({ method: 'POST', link: `v1/me/player/previous`, params: { device_id: device } });
            else
                await this.fetch({ method: 'POST', link: `v1/me/player/previous` });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * await player.shuffle(); // Will shuffle
     * await player.shuffle(false); // Will unshuffle
     * ```
     *
     * Shuffle or unshuffle playbacks!
     *
     * @param state A boolean stating that it should shuffle or not?
     * @param device Device id to play the previous track, if not provided, then will implement it in the current player
     */
    async shuffle(state = true, device) {
        try {
            if (device)
                await this.fetch({ method: 'PUT', link: `v1/me/player/shuffle`, params: { state: Boolean(state), device_id: device } });
            else
                await this.fetch({ method: 'PUT', link: `v1/me/player/shuffle`, params: { state: Boolean(state) } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * **Example:**
     * ```js
     * await player.play();
     * ```
     *
     * Plays the playback
     *
     * @param options All the play options to select
     */
    async play(options = {}) {
        try {
            const data = {
                context_uri: options.context,
                uris: options.uris,
                offset: options.offset,
                position_ms: options.position
            };
            const token = `Bearer ${this.token}`;
            if (options.device)
                await axios_1.default({ method: 'PUT', url: `https://api.spotify.com/v1/me/player/play`, data, params: { device_id: options.device }, headers: { Authorization: token } });
            else
                await axios_1.default({ method: 'PUT', url: `https://api.spotify.com/v1/me/player/play`, data, headers: { Authorization: token } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
}
;
exports.default = UserPlayer;
