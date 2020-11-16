"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * UserPlayer which access the user player only if the scoped token
 * has those correct scopes
 */
const Error_1 = require("./Error");
const Spotify_1 = __importDefault(require("./Spotify"));
/**
 * UserPlayer which access the user player only if the scoped token
 * has those correct scopes
 */
class UserPlayer extends Spotify_1.default {
    /**
     * **Example:**
     * ```js
     * const currentPlayback = await player.getCurrentPlayback();
     * ```
     *
     * Returns the current playback
     */
    async getCurrentPlayback() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me/player`
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
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
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me/player/devices`
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
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
    async getRecentlyPlayed(options) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me/player/recently-played`,
                    params: options || {}
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    async getCurrentlyPlaying() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me/player/currently-playing`
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    async pause() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/player/pause`
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    async seek(position) {
        return new Promise(async (resolve, reject) => {
            if (!position)
                reject(new Error_1.MissingParamError('missing position to seek'));
            try {
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/player/seek`,
                    params: {
                        position_ms: position
                    }
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * await player.repeat('track');
     * ```
     *
     * Repeats the player
     *
     * @param type Type of repeat mode
     */
    async repeat(type) {
        return new Promise(async (resolve, reject) => {
            if (!type)
                reject(new Error_1.MissingParamError('missing type'));
            try {
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/player/pause`,
                    params: {
                        state: type
                    }
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
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
     */
    async setVolume(volume) {
        return new Promise(async (resolve, reject) => {
            if (!volume)
                reject(new Error_1.MissingParamError('missing volume'));
            try {
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/player/volume`,
                    params: {
                        volume_percent: volume
                    }
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * await player.next()
     * ```
     *
     * Plays the next playback
     */
    async next() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    method: 'POST',
                    link: `v1/me/player/next`
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * await player.previous()
     * ```
     *
     * Plays the previous playback
     */
    async previous() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    method: 'POST',
                    link: `v1/me/player/previous`
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * await player.play()
     * ```
     *
     * Plays the playback
     */
    async play() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/player/play`
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * await player.shuffle()
     * ```
     *
     * Shuffles the playback
     *
     * @param state State while shuffling
     */
    async shuffle(state) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/player/play`,
                    params: {
                        state: Boolean(state)
                    }
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
}
;
exports.default = UserPlayer;
//# sourceMappingURL=UserPlayer.js.map