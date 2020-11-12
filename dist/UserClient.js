"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * UserClient class
 * Class which is for scoped tokens
 */
const Error_1 = require("./Error");
const Spotify_1 = __importDefault(require("./Spotify"));
const UserPlayer_1 = __importDefault(require("./UserPlayer"));
const Auth_1 = __importDefault(require("./lib/Auth"));
/**
 * User client class which can be used to access user client only
 * You can still access this by Client class but this class
 * needs a scoped token only
 */
class UserClient extends Spotify_1.default {
    /**
     * **Example:**
     * ```js
     * const user = new UserClient('token');
     * ```
     * @param token Scoped token
     */
    constructor(token) {
        super(token);
        this.auth = new Auth_1.default();
        this.player = new UserPlayer_1.default(this.token);
        this.startedAt = Date.now();
    }
    ;
    /**
     * **Example"**
     * ```js
     * user.uptime
     * ```
     *
     * Uptime of the user client
     */
    get uptime() {
        return Date.now() - this.startedAt;
    }
    ;
    /**
     * **Example"**
     * ```js
     * const info = await user.info();
     * ```
     *
     * Returns the user information
     */
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
    /**
     * **Example"**
     * ```js
     * const topArtists = await user.getTopArtists();
     * ```
     *
     * Top artists based on your affinity
     */
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
    /**
     * **Example"**
     * ```js
     * const topTracks = await user.getTopTracks();
     * ```
     *
     * Top tracks based on your affinity
     */
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
    /**
     * **Example:**
     * ```js
     * const tracks = await user.getAffinity('track');
     * const artists = await user.getAffinity('track');
     * ```
     *
     * Aliases function for user.getTopTracks user.getTopArtists
     *
     * @param type Affinity type
     */
    async getAffinity(type) {
        return new Promise(async (resolve, reject) => {
            resolve(type == 'track' ?
                await this.getTopTracks() :
                await this.getTopArtists());
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * const playlists = user.getPlaylists()
     * ```
     *
     * Returns your saved playlists
     *
     * @param limit Limit of your results
     */
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
    /**
     * **Example:**
     * ```js
     * const albums = await user.getAlbums();
     * ```
     *
     * Returns your saved albums
     *
     * @param limit Limit of your results
     */
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
    /**
     * **Example:**
     * ```js
     * const shows = await user.getShows();
     * ```
     *
     * Returns your saved shows
     *
     * @param limit Limit of your results
     */
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
    /**
     * **Example:**
     * ```js
     * const tracks = await user.getTracks();
     * ```
     *
     * Returns user's saved tracks
     *
     * @param limit Limit of your results
     */
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
    /**
     * **Example:**
     * ```js
     * user.deleteAlbum('id');
     * user.deleteAlbum('id1,id2,id3'); // For multiple deletion use commas
     * ```
     *
     * Deletes your saved album
     *
     * @param id Id of the album
     */
    async deleteAlbum(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'DELETE',
                    link: `v1/me/albums`,
                    params: {
                        ids: id
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
     * user.deleteTrack('id');
     * user.deleteTrack('id1,id2,id3'); // For multiple deletion use commas
     * ```
     *
     * Deletes your saved track
     *
     * @param id Id of the track
     */
    async deleteTrack(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'DELETE',
                    link: `v1/me/tracks`,
                    params: {
                        ids: id
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
     * user.deleteShow('id');
     * user.deleteShow('id1,id2,id3'); // For multiple deletion use commas
     * ```
     *
     * Deletes your saved show
     *
     * @param id Id of the show
     */
    async deleteShow(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'DELETE',
                    link: `v1/me/shows`,
                    params: {
                        ids: id
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
     * user.addAlbum('id');
     * user.addAlbum('id1,id2,id3'); // For multiple use commas
     * ```
     *
     * Add albums to your saved list
     *
     * @param id Id of the album
     */
    async addAlbum(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/albums`,
                    params: {
                        ids: id
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
     * user.addTrack('id');
     * user.addTrack('id1,id2,id3'); // For multiple use commas
     * ```
     *
     * Add tracks to your saved list
     *
     * @param id Id of the track
     */
    async addTrack(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/tracks`,
                    params: {
                        ids: id
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
     * user.addShpw('id');
     * user.addShow('id1,id2,id3'); // For multiple use commas
     * ```
     *
     * Add albums to your saved list
     *
     * @param id Id of the album
     */
    async addShow(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/shows`,
                    params: {
                        ids: id
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
     * user.followsUser('id');
     * user.followsUser('id1,id2,id3'); // For multiple verification
     * ```
     *
     * Verify if the current user follows the user
     *
     * @param id Id of the user
     */
    async followsUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    link: `v1/me/following/contains`,
                    params: {
                        ids: id,
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
    /**
     * **Example:**
     * ```js
     * user.followsArtist('id');
     * user.followsArtist('id1,id2,id3'); // For multiple verification
     * ```
     *
     * Verify if the current user follows the artist
     *
     * @param id Id of the artist
     */
    async followsArtist(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    link: `v1/me/following/contains`,
                    params: {
                        ids: id,
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
    /**
     * **Example:**
     * ```js
     * const followsUser = await user.follows('id', false); // false if the id is a user's id, by default it is false
     * const followsArtist = await user.follows('id', true); // true if the id is a artist's id.
     * ```
     *
     * Verify if the current user follows the user or artist
     *
     * @param id Id of the user
     * @param isArtist Boolean states the user is an artist or not
     */
    async follows(id, isArtist) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            resolve(isArtist ?
                await this.followsArtist(id) :
                await this.followsUser(id));
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * user.followUser('id');
     * user.followUser('id1,id2,id3'); // To follow many
     * ```
     *
     * @param id Id of the user
     */
    async followUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/following`,
                    params: {
                        ids: id,
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
    /**
     * **Example:**
     * ```js
     * user.followPlaylist('id');
     * ```
     *
     * @param id Id of the playlist
     */
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
    /**
     * **Example:**
     * ```js
     * user.followArtist('id');
     * user.followArtist('id1,id2,id3'); // To follow many
     * ```
     *
     * @param id Id of the artist
     */
    async followArtist(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'PUT',
                    link: `v1/me/following`,
                    params: {
                        ids: id,
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
    /**
     * Aliases of the followUser followPlaylist and followArtist
     *
     * @param id Id of the artist, user or playlist
     * @param type type of the id
     */
    async follow(id, type) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            if (type == 'user')
                resolve(await this.followUser(id));
            else if (type == 'artist')
                resolve(await this.followArtist(id));
            else if (type == 'playlist')
                resolve(await this.followPlaylist(id));
            else
                reject(new Error_1.UnexpectedError('invalid type provided'));
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * user.unfollowUser('id');
     * user.unfollowUser('id1,id2,id3'); // For many unfollow
     * ```
     *
     * @param id Id of the user
     */
    async unfollowUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'DELETE',
                    link: `v1/me/following`,
                    params: {
                        ids: id,
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
    /**
     * **Example:**
     * ```js
     * user.unfollowPlaylist('id');
     * ```
     *
     * @param id Id of the playlist
     */
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
    /**
     * **Example:**
     * ```js
     * user.unfollowArtist('id');
     * user.unfollowArtist('id1,id2,id3'); // For many unfollow
     * ```
     *
     * @param id Id of the artist
     */
    async unfollowArtist(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id)
                    reject(new Error_1.MissingParamError('missing id'));
                resolve(await this.fetch({
                    method: 'DELETE',
                    link: `v1/me/following`,
                    params: {
                        ids: id,
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
    /**
     * **Example:**
     * ```js
     * const usersFollowing = await user.following();
     * const artistsFollowing = await user.following(true);
     * ```
     *
     * Get the list of followers of the current user
     *
     * @param isArtist Should the list be of artist then true else false
     */
    async following(isArtist) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.fetch({
                    link: `v1/me/following`,
                    params: {
                        type: (isArtist ? 'artist' : 'user')
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
     * Aliases of the unfollowUser unfollowPlaylist and unfollowArtist
     *
     * @param id Id of the artist, user or playlist
     * @param type type of the id
     */
    async unfollow(id, type) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            if (type == 'user')
                resolve(await this.unfollowUser(id));
            else if (type == 'artist')
                resolve(await this.unfollowArtist(id));
            else if (type == 'playlist')
                resolve(await this.unfollowPlaylist(id));
            else
                reject(new Error_1.UnexpectedError('invalid type provided'));
        });
    }
    ;
    /**
     * **Example:**
     * ```js
     * user.login({
     *    client_id: 'id',
     *    client_secret: 'secret',
     *    redirect_uri: 'confirmation_redirect_uri',
     *    code: 'refresh-token-or-the-code-query'
     * })
     * ```
     *
     * @param options Login by Auth.refresh
     */
    async login(options) {
        this.token = (await this.auth.refresh(options)).access_token;
        this.player = new UserPlayer_1.default(this.token);
        this.startedAt = Date.now();
    }
    ;
}
;
exports.default = UserClient;
//# sourceMappingURL=UserClient.js.map