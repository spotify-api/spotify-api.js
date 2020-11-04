"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("./Error");
const Spotify_1 = __importDefault(require("./Spotify"));
const UserPlayer_1 = __importDefault(require("./UserPlayer"));
const Auth_1 = __importDefault(require("./lib/Auth"));
class UserClient extends Spotify_1.default {
    constructor(token) {
        super(token);
        this.auth = new Auth_1.default();
        this.player = new UserPlayer_1.default(this.token);
    }
    ;
    async info() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me`
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    async getTopArtists() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me/top/artists`
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    async getTopTracks() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me/top/tracks`
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    async getPlaylists(limit) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me/playlists`,
                    params: {
                        limit
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
    async getAlbums(limit) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me/albums`,
                    params: {
                        limit
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
    async getShows(limit) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me/shows`,
                    params: {
                        limit
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
    async getTracks(limit) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me/tracks`,
                    params: {
                        limit
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
    async deleteAlbums(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    method: 'DELETE',
                    link: `v1/me/albums`,
                    params: {
                        ids: ids.join(',')
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
    async deleteTracks(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    method: 'DELETE',
                    link: `v1/me/tracks`,
                    params: {
                        ids: ids.join(',')
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
    async deleteShows(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    method: 'DELETE',
                    link: `v1/me/shows`,
                    params: {
                        ids: ids.join(',')
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
    async addAlbums(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/albums`,
                    params: {
                        ids: ids.join(',')
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
    async addTracks(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/tracks`,
                    params: {
                        ids: ids.join(',')
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
    async addShows(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/shows`,
                    params: {
                        ids: ids.join(',')
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
    async followsUser(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    link: `v1/me/following/contains`,
                    params: {
                        ids: ids.join(','),
                        type: 'user'
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
    async followsArtist(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    link: `v1/me/following/contains`,
                    params: {
                        ids: ids.join(','),
                        type: 'artist'
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
    async followUser(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/following`,
                    params: {
                        ids: ids.join(','),
                        type: 'user'
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
    async followPlaylist(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/playlists/${id}/followers`,
                    headers: {
                        "Content-Type": "application/json"
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
    async followArtist(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/following`,
                    params: {
                        ids: ids.join(','),
                        type: 'artist'
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
    async unfollowUser(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    method: 'DELETE',
                    link: `v1/me/following`,
                    params: {
                        ids: ids.join(','),
                        type: 'user'
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
    async unfollowPlaylist(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'DELETE',
                    link: `v1/playlists/${id}/followers`,
                    headers: {
                        "Content-Type": "application/json"
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
    async unfollowArtist(ids) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!ids || !Array.isArray(ids))
                    reject(new Error_1.MissingParamError('missing ids'));
                resolve(await this.fetch({
                    method: 'DELETE',
                    link: `v1/me/following`,
                    params: {
                        ids: ids.join(','),
                        type: 'artist'
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
    async following(artists) {
        return new Promise(async (resolve, reject) => {
            try {
                artists = Boolean(artists);
                resolve(await this.fetch({
                    link: `v1/me/following`,
                    params: {
                        type: (artists ? 'artist' : 'user')
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
    async login(options) {
        this.token = (await this.auth.refresh(options)).access_token;
        this.player = new UserPlayer_1.default(this.token);
    }
    ;
}
;
exports.default = UserClient;
//# sourceMappingURL=UserClient.js.map