"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayHistory = exports.Playback = exports.Device = void 0;
const Episode_1 = __importDefault(require("./Episode"));
const Interface_1 = require("./Interface");
const Track_1 = __importDefault(require("./Track"));
/**
 * Spotify Api's Device Parser Function! Used in UserPlayer!
 *
 * @param data Raw data received by the spotify!
 * @example const device = Device(data);
 */
function Device(data) {
    return {
        id: data.id,
        isActive: data.is_active,
        isRestricted: data.is_restricted,
        name: data.name,
        type: data.type,
        volume: data.volume_percent
    };
}
exports.Device = Device;
;
/**
 * Spotify Api's Playback Parser Function!
 *
 * @param data Raw data received by the spotify api!
 * @param client Your Spotify Client
 * @example const playback = Playback(data, client);
 */
function Playback(data, client) {
    return {
        get device() { return Interface_1.Device(data.device); },
        timestamp: data.timestamp,
        progress: data.progress_ms,
        isPlaying: data.is_playing,
        currentPlayingType: data.currently_playing_type,
        actions: data.actions,
        item: data.item ? ((data.item.type == 'track') ? new Track_1.default(data.item, client) : new Episode_1.default(data.item, client)) : null,
        shuffle: data.shuffle_state,
        repeat: data.repeat_state,
        context: {
            externalUrls: data.context.external_urls,
            href: data.context.href,
            type: data.context.type,
            uri: data.context.uri
        }
    };
}
exports.Playback = Playback;
;
/**
 * Spotify Api's PlayHistory Parser Function
 *
 * @param data Raw data received by the spotify api!
 * @param client Your spotify client!
 * @example const history = PlayHistory(data, client);
 */
function PlayHistory(data, client) {
    return {
        track: new Track_1.default(data.track, client),
        playedAt: data.played_at,
        context: {
            externalUrls: data.context.external_urls,
            href: data.context.href,
            type: data.context.type,
            uri: data.context.uri
        }
    };
}
exports.PlayHistory = PlayHistory;
;
