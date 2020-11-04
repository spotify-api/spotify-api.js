"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("./Error");
const Spotify_1 = __importDefault(require("./Spotify"));
class UserPlayer extends Spotify_1.default {
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