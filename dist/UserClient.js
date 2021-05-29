"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("./Client"));
const Errors_1 = require("./Errors");
const Track_1 = __importDefault(require("./structures/Track"));
const Artist_1 = __importDefault(require("./structures/Artist"));
const Album_1 = __importDefault(require("./structures/Album"));
const Episode_1 = __importDefault(require("./structures/Episode"));
const Show_1 = __importDefault(require("./structures/Show"));
const Playlist_1 = __importDefault(require("./structures/Playlist"));
const PlayerManager_1 = __importDefault(require("./managers/PlayerManager"));
/**
 * A class which accesses the current user endpoints!
 */
class UserClient {
    constructor(token) {
        this.name = '';
        this.country = '';
        this.email = 'unknown';
        this.externalUrls = {};
        this.totalFollowers = 0;
        this.product = 'unknown';
        this.images = [];
        this.uri = '';
        this.id = '';
        this.href = '';
        Object.defineProperty(this, 'client', { value: typeof token == 'string' ? new Client_1.default(token) : token });
        Object.defineProperty(this, 'player', { value: new PlayerManager_1.default(this) });
    }
    /**
     * Returns current user details
     *
     * @example const user = await user.info();
     */
    async info() {
        try {
            const data = await this.client.util.fetch('/me');
            this.name = data.display_name;
            this.country = data.country || 'unknown';
            this.id = data.id;
            this.email = data.email || 'unknown';
            this.externalUrls = data.external_urls;
            this.totalFollowers = data.followers.total;
            this.href = data.href;
            this.images = data.images;
            this.product = data.product || 'unknown';
            this.uri = data.uri;
        }
        catch (e) {
            throw new Errors_1.UnexpectedError(e);
        }
        return this;
    }
    /**
     * Returns the top tracks of the current user!
     *
     * @param options Basic AffinityOptions
     * @example await user.getTopTracks();
     */
    async getTopTracks(options = {}) {
        try {
            const tracks = (await this.client.util.fetch('/me/top/tracks', { params: options }));
            return {
                limit: tracks.limit,
                offset: tracks.offset,
                total: tracks.total,
                items: tracks.items.map(x => new Track_1.default(x, this.client))
            };
            ;
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
     * Returns the top artists of the current user!
     *
     * @param options Basic AffinityOptions
     * @example await user.getTopArtists();
     */
    async getTopArtists(options = {}) {
        try {
            const artists = (await this.client.util.fetch('/me/top/artists', { params: options }));
            return {
                limit: artists.limit,
                offset: artists.offset,
                total: artists.total,
                items: artists.items.map(x => new Artist_1.default(x, this.client))
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
     * Follow a playlist inshort words add the playlist to your library!
     *
     * @param id The id of the playlist!
     * @param options Options such as public!
     * @example await client.user.followPlaylist('id');
     */
    async followPlaylist(id, options = { public: true }) {
        try {
            await this.client.util.fetch(`/playlists/${id}/followers`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    public: options.public ?? true
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Unfollow a playlist by id!
     *
     * @param id The id of the playlist!
     * @example await client.user.unfollowPlaylist('id');
     */
    async unfollowPlaylist(id) {
        try {
            await this.client.util.fetch(`/playlists/${id}/followers`, { method: 'DELETE' });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Verify if the current user follows a paticualr playlist by id!
     *
     * @param id Spotify playlist id
     * @example const follows = await client.user.followsPlaylist('id');
     */
    async followsPlaylist(id) {
        return (await this.client.playlists.userFollows(id, this.id))[0] || false;
    }
    /**
     * Returns the current user's saved playlists!
     *
     * @param options Basic PagingOptions
     * @example const playlists = await client.user.getPlaylists();
     */
    async getPlaylists(options) {
        try {
            const data = await this.client.util.fetch('/me/playlists', { params: options });
            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: data.items.map(x => new Playlist_1.default(x, this.client))
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
     * Create a spotify playlist for yourself or for the current user!
     *
     * @param options Options to create a playlist!
     * @example await client.user.createPlaylist({
     *     name: 'Funky playlist',
     *     description: 'My own cool playlist created by spotify-api.js',
     *     public: true,
     *     collaborative: false,
     *     userID: client.user.id // By default will be the current user id!
     * });
     */
    async createPlaylist(options) {
        try {
            if (!options || !options.name)
                throw new Errors_1.UnexpectedError('No name has been provided to create a playlist!');
            const playlist = new Playlist_1.default(await this.client.util.fetch(`/users/${options.userID || this.id}/playlists`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    name: options.name,
                    public: options.public ?? true,
                    collaborative: options.collaborative || false,
                    description: options.description || ''
                }
            }), this.client);
            return playlist;
        }
        catch (e) {
            return Errors_1.handleError(e) || null;
        }
    }
    /**
     * Edit a spotify playlist using id
     *
     * @param id ID of the spotify playlist
     * @param options CreatePlaylist object but userID field should not be provided!
     * @example await client.user.editPlaylist('id', {
     *     description: 'Edited new description'
     * });
     */
    async editPlaylist(id, options) {
        try {
            await this.client.util.fetch(`/playlists/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: options
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Returns the user's following list of artists!
     *
     * @param options Options such as after and limit!
     * @example const artists = await client.user.getFollowingArtists();
     */
    async getFollowingArtists(options) {
        try {
            const artists = (await this.client.util.fetch('/me/following', {
                params: {
                    ...options,
                    type: 'artist'
                }
            })).artists;
            return {
                limit: artists.limit,
                offset: artists.offset,
                total: artists.total,
                items: artists.items.map(x => new Artist_1.default(x, this.client))
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
     * Follow artists with their spotify ids!
     *
     * @param ids An array of spotify artist ids
     * @example await client.user.followArtists('id1', 'id2');
     */
    async followArtists(...ids) {
        try {
            await this.client.util.fetch(`/me/following`, {
                method: 'PUT',
                params: {
                    type: 'artist',
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Unfollow artists with their spotify ids!
     *
     * @param ids An array of spotify artist ids
     * @example await client.user.unfollowArtists('id1', 'id2');
     */
    async unfollowArtists(...ids) {
        try {
            await this.client.util.fetch(`/me/following`, {
                method: 'DELETE',
                params: {
                    type: 'artist',
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Follow users with their spotify ids!
     *
     * @param ids An array of spotify user ids
     * @example await client.user.followUsers('id1', 'id2');
     */
    async followUsers(...ids) {
        try {
            await this.client.util.fetch(`/me/following`, {
                method: 'PUT',
                params: {
                    type: 'user',
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Unfollow users with their spotify ids!
     *
     * @param ids An array of spotify user ids
     * @example await client.user.unfollowUsers('id1', 'id2');
     */
    async unfollowUsers(...ids) {
        try {
            await this.client.util.fetch(`/me/following`, {
                method: 'DELETE',
                params: {
                    type: 'user',
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Verify if the array of artists supplied is been followed by you!
     *
     * @param ids Array of spotify artist ids
     * @example const [followsArtist] = await client.user.followsArtists('id1');
     */
    async followsArtists(...ids) {
        try {
            return await this.client.util.fetch(`/me/following/contains`, {
                params: {
                    type: 'artist',
                    ids: ids.join(',')
                }
            });
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Verify if the array of users supplied is been followed by you!
     *
     * @param ids Array of spotify users ids
     * @example const [followsUser] = await client.user.followsUsers('id1');
     */
    async followsUsers(...ids) {
        try {
            return await this.client.util.fetch(`/me/following/contains`, {
                params: {
                    type: 'user',
                    ids: ids.join(',')
                }
            });
        }
        catch (e) {
            return Errors_1.handleError(e) || [];
        }
    }
    /**
     * Returns the saved albums of the current user
     *
     * @param options Basic PagingOptions
     * @example const albums = await client.user.getAlbums();
     */
    async getAlbums(options) {
        try {
            const data = await this.client.util.fetch('/me/albums', { params: options });
            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: data.items.map(x => ({
                    addedAt: x.added_at,
                    album: new Album_1.default(x.album, this.client)
                }))
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
     * Add albums to your spotify savelist!
     *
     * @param ids Spotify albums ids to add to your save list!
     * @example await client.user.addAlbums('id1', 'id2');
     */
    async addAlbums(...ids) {
        try {
            await this.client.util.fetch('/me/albums', {
                method: 'PUT',
                params: {
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Remove albums from your spotify savelist!
     *
     * @param ids Spotify albums ids to remove from your save list!
     * @example await client.user.deleteAlbums('id1', 'id2');
     */
    async deleteAlbums(...ids) {
        try {
            await this.client.util.fetch('/me/albums', {
                method: 'DELETE',
                params: {
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Check if those albums exist on the current user's library!
     *
     * @param ids Array of spotify album ids
     * @example const [hasFirstAlbum, hasSecondAlbum] = await client.user.hasAlbums('id1', 'id2');
     */
    async hasAlbums(...ids) {
        try {
            return await this.client.util.fetch('/me/albums/contains', {
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
     * Returns the saved tracks of the current user
     *
     * @param options Basic PagingOptions
     * @example const tracks = await client.user.getTracks();
     */
    async getTracks(options) {
        try {
            const data = await this.client.util.fetch('/me/tracks', { params: options });
            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: data.items.map(x => ({
                    addedAt: x.added_at,
                    track: new Track_1.default(x.track, this.client)
                }))
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
     * Add tracks to your spotify savelist!
     *
     * @param ids Spotify tracks ids to add to your save list!
     * @example await client.user.addTracks('id1', 'id2');
     */
    async addTracks(...ids) {
        try {
            await this.client.util.fetch('/me/tracks', {
                method: 'PUT',
                params: {
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Remove tracks from your spotify savelist!
     *
     * @param ids Spotify tracks ids to remove from your save list!
     * @example await client.user.deleteTracks('id1', 'id2');
     */
    async deleteTracks(...ids) {
        try {
            await this.client.util.fetch('/me/tracks', {
                method: 'DELETE',
                params: {
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Check if those tracks exist on the current user's library!
     *
     * @param ids Array of spotify track ids
     * @example const [hasFirstTrack, hasSecondTrack] = await client.user.hasTracks('id1', 'id2');
     */
    async hasTracks(...ids) {
        try {
            return await this.client.util.fetch('/me/tracks/contains', {
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
     * Returns the saved episodes of the current user
     *
     * @param options Basic PagingOptions
     * @example const episodes = await client.user.getEpisodes();
     */
    async getEpisodes(options) {
        try {
            const data = await this.client.util.fetch('/me/episodes', { params: options });
            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: data.items.map(x => ({
                    addedAt: x.added_at,
                    episode: new Episode_1.default(x.episode, this.client)
                }))
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
     * Add episodes to your spotify savelist!
     *
     * @param ids Spotify episodes ids to add to your save list!
     * @example await client.user.addEpisodes('id1', 'id2');
     */
    async addEpisodes(...ids) {
        try {
            await this.client.util.fetch('/me/episodes', {
                method: 'PUT',
                params: {
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Remove episodes from your spotify savelist!
     *
     * @param ids Spotify episodes ids to remove from your save list!
     * @example await client.user.deleteEpisodes('id1', 'id2');
     */
    async deleteEpisodes(...ids) {
        try {
            await this.client.util.fetch('/me/episodes', {
                method: 'DELETE',
                params: {
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Check if those episodes exist on the current user's library!
     *
     * @param ids Array of spotify episode ids
     * @example const [hasFirstEpisode, hasSecondEpisode] = await client.user.hasEpisodes('id1', 'id2');
     */
    async hasEpisodes(...ids) {
        try {
            return await this.client.util.fetch('/me/episodes/contains', {
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
     * Returns the saved shows of the current user
     *
     * @param options Basic PagingOptions
     * @example const shows = await client.user.getShows();
     */
    async getShows(options) {
        try {
            const data = await this.client.util.fetch('/me/shows', { params: options });
            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: data.items.map(x => ({
                    addedAt: x.added_at,
                    show: new Show_1.default(x.show, this.client)
                }))
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
     * Add shows to your spotify savelist!
     *
     * @param ids Spotify shows ids to add to your save list!
     * @example await client.user.addShows('id1', 'id2');
     */
    async addShows(...ids) {
        try {
            await this.client.util.fetch('/me/shows', {
                method: 'PUT',
                params: {
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Remove shows from your spotify savelist!
     *
     * @param ids Spotify shows ids to remove from your save list!
     * @example await client.user.deleteShows('id1', 'id2');
     */
    async deleteShows(...ids) {
        try {
            await this.client.util.fetch('/me/shows', {
                method: 'DELETE',
                params: {
                    ids: ids.join(',')
                }
            });
            return true;
        }
        catch (e) {
            return Errors_1.handleError(e) || false;
        }
    }
    /**
     * Check if those shows exist on the current user's library!
     *
     * @param ids Array of spotify show ids
     * @example const [hasFirstShow, hasSecondShow] = await client.user.hasShows('id1', 'id2');
     */
    async hasShows(...ids) {
        try {
            return await this.client.util.fetch('/me/shows/contains', {
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
exports.default = UserClient;
;
