"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayHistory = exports.CurrentlyPlaying = exports.CurrentPlayback = exports.Device = exports.Context = void 0;
const UserClient_1 = __importDefault(require("../UserClient"));
const Client_1 = __importDefault(require("../Client"));
const Track_1 = __importDefault(require("../structures/Track"));
const Episode_1 = __importDefault(require("../structures/Episode"));
const Errors_1 = require("../Errors");
/**
 * Returns an context object formatted!
 *
 * @param data Context raw data
 * @example const context = Context(data);
 */
function Context(data) {
    return {
        externalUrls: data.external_urls,
        href: data.href,
        type: data.type,
        uri: data.uri
    };
}
exports.Context = Context;
/**
 * Returns an device object formatted!
 *
 * @param data Device raw data
 * @example const device = Device(data);
 */
function Device(data) {
    return {
        id: data.id,
        active: data.is_active,
        privateSession: data.is_private_session,
        restricted: data.is_restricted,
        name: data.name,
        type: data.type,
        volume: data.volume_percent
    };
}
exports.Device = Device;
;
/**
 * Returns an current playback object formatted!
 *
 * @param data The current playback data from the spotify api
 * @param client Your spotify client
 * @example const playback = CurrentPlayback(data, client);
 */
function CurrentPlayback(data, client) {
    return {
        get device() {
            return Device(data.device);
        },
        get context() {
            return Context(data.context);
        },
        get item() {
            return data.item ? (data.item.type == 'track' ?
                new Track_1.default(data.item, client) :
                new Episode_1.default(data.item, client)) : null;
        },
        timestamp: data.timestamp,
        progress: data.progress_ms,
        currentlyPlayingType: data.currently_playing_type,
        playing: data.is_playing,
        shuffled: data.shuffle_state,
        repeatState: data.repeat_state
    };
}
exports.CurrentPlayback = CurrentPlayback;
;
/**
 * Returns an currently playing object formatted!
 *
 * @param data The currently playing data from the spotify api
 * @param client Your spotify client
 * @example const playback = CurrentlyPlaying(data, client);
 */
function CurrentlyPlaying(data, client) {
    return {
        get device() {
            return Device(data.device);
        },
        get context() {
            return Context(data.context);
        },
        get item() {
            return data.item ? (data.item.type == 'track' ?
                new Track_1.default(data.item, client) :
                new Episode_1.default(data.item, client)) : null;
        },
        timestamp: data.timestamp,
        progress: data.progress_ms,
        currentlyPlayingType: data.currently_playing_type,
        playing: data.is_playing
    };
}
exports.CurrentlyPlaying = CurrentlyPlaying;
;
/**
 * Returns a play history object formatted!
 *
 * @param data The play history data from the spotify api
 * @param client Your spotify client
 * @example const playhistory = PlayHistory(data, client);
 */
function PlayHistory(data, client) {
    return {
        get track() {
            return new Track_1.default(data.track, client);
        },
        get context() {
            return Context(data.context);
        },
        playedAt: data.played_at
    };
}
exports.PlayHistory = PlayHistory;
/**
 * A class to manage all player endpoints
 */
class PlayerManager {
    /**
     * A class to manage all player endpoints
     *
     * @param client Your spotify client
     * @example const player = new PlayerManager(client);
     */
    constructor(client) {
        Object.defineProperty(this, 'client', {
            value: typeof client == 'string' ? new Client_1.default(client) : (client instanceof UserClient_1.default) ? client.client : client
        });
    }
    /**
     * Returns the current playback of the current user!
     *
     * @param options Options containing the fields market and additionalTypes
     * @example const playback = await player.getCurrentPlayback();
     */
    async getCurrentPlayback(options = {}) {
        try {
            return CurrentPlayback(await this.client.util.fetch('/me/player', {
                params: {
                    market: options.market || 'US',
                    additional_types: options.additionalTypes || 'track'
                }
            }), this.client);
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    /**
     * Tranfers your current playback to different devices by their ids
     *
     * @param devices Array of device ids
     * @param options Options containing the play field
     * @example await player.transferPlayback(['id1'], { play: true });
     */
    async transferPlayback(devices, options) {
        try {
            await this.client.util.fetch('/me/player', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    ...options,
                    device_ids: devices.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Returns all the devices of the current user
     * @example const devices = await player.getDevices();
     */
    async getDevices() {
        try {
            return (await this.client.util.fetch('/me/player/devices')).devices.map(Device);
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Returns the current playing of the current user!
     *
     * @param options Options containing the fields market and additionalTypes
     * @example const playing = await player.getCurrentlyPlaying();
     */
    async getCurrentlyPlaying(options = {}) {
        try {
            const { data, status } = await this.client.util.fetchWithResponse('/me/player/currently-playing', {
                params: {
                    market: options.market || 'US',
                    additional_types: options.additionalTypes || 'track'
                }
            });
            return status != 204 ? CurrentlyPlaying(data, this.client) : null;
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    /**
     * Returns the recently played object!
     *
     * @param options Options consisting of after, before and market field
     * @example const recentlyPlayed = await player.getRecentlyPlayed();
     */
    async getRecentlyPlayed(options) {
        try {
            const data = await this.client.util.fetch('/me/player/recently-played', { params: options });
            return {
                items: data.items.map(x => PlayHistory(x, this.client)),
                cursors: data.cursors,
                limit: data.limit
            };
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
}
exports.default = PlayerManager;
