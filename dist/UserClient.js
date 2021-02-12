"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * UserClient class
 * Class which is for authroized current user tokens
 */
const Error_1 = require("./Error");
const Auth_1 = __importDefault(require("./lib/Auth"));
const Spotify_1 = __importDefault(require("./Spotify"));
const UserPlayer_1 = __importDefault(require("./UserPlayer"));
const Artist_1 = __importDefault(require("./structures/Artist"));
const Track_1 = __importDefault(require("./structures/Track"));
const Playlist_1 = __importDefault(require("./structures/Playlist"));
const Album_1 = __importDefault(require("./structures/Album"));
const Show_1 = __importDefault(require("./structures/Show"));
const CacheManager_1 = __importDefault(require("./CacheManager"));
const User_1 = __importDefault(require("./structures/User"));
/**
 * User client class which can be used to access current user spotify api only
 * You can still access this by Client class but this class needs a scoped token only
 * And a current user scoped token works for both Client and UserClient
 */
class UserClient extends Spotify_1.default {
    /**
     * User client class which can be used to access current user spotify api only
     * You can still access this by Client class but this class needs a scoped token only
     * And a current user scoped token works for both Client and UserClient
     *
     * @param client Your Spotify Client
     * @example const user = new UserClient('token', client);
     */
    constructor(client) {
        super(client.token);
        Object.defineProperty(this, 'client', { value: client, writable: false });
        this.auth = new Auth_1.default();
        this.player = new UserPlayer_1.default(this.client);
        this.startedAt = Date.now();
        this.playlists = new CacheManager_1.default('id');
        this.albums = new CacheManager_1.default('id');
        this.shows = new CacheManager_1.default('id');
        this.tracks = new CacheManager_1.default('id');
        this.followers = {
            users: new CacheManager_1.default('id'),
            artists: new CacheManager_1.default('id')
        };
        this.country = null;
        this.name = null;
        this.externalUrls = null;
        this.totalFollowers = null;
        this.href = null;
        this.id = null;
        this.uri = null;
        this.product = null;
        this.images = [];
    }
    ;
    /**
     * Uptime of the user client
     *
     * @readonly
     */
    get uptime() {
        return Date.now() - this.startedAt;
    }
    ;
    /**
     * Updates the current user's spotify information in the userclient class and returns this!
     *
     * @example const info = await user.info();
     */
    async info() {
        try {
            const data = await this.fetch({ link: 'v1/me' });
            this.country = data.country;
            this.name = data.display_name;
            this.externalUrls = data.external_urls;
            this.totalFollowers = data.followers.total;
            this.href = data.href;
            this.id = data.id;
            this.uri = data.uri;
            this.images = data.images;
            if (data.email)
                this.email = data.email;
            if (data.explicit_content)
                this.explicitContent = {
                    filterEnabled: data.explicit_content.filter_enabled,
                    filterLocked: data.explicit_content.filter_locked
                };
            if (data.product)
                this.product = data.product;
            return this;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Returns current user's top artists based on their affinity!
     *
     * @param options Options to configure your results!
     * @example const topArtists = await user.getTopArtists();
     */
    async getTopArtists(options = {}) {
        try {
            const data = await this.fetch({ link: `v1/me/top/artists`, params: options });
            const items = data.map(x => new Artist_1.default(x, this.client));
            if (this.client.cacheOptions.cacheArtists)
                this.client.cache.artists.push(...items);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Returns current user's top artists based on their affinity!
     *
     * @param options Options to configure your results
     * @example const topTracks = await user.getTopTracks();
     */
    async getTopTracks(options = {}) {
        try {
            const data = await this.fetch({ link: `v1/me/top/tracks`, params: options });
            const items = data.map(x => new Track_1.default(x, this.client));
            if (this.client.cacheOptions.cacheTracks)
                this.client.cache.tracks.push(...items);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Returns current user's top artists or tracks based on their affinity!
     * Similar to getTopTracks and getTopArtists!
     *
     * @param type Affinity type should be one of "track" or "artist"
     * @example const tracks = await user.getAffinity('track');
     * const artists = await user.getAffinity('artist');
     */
    async getAffinity(type, options = {}) {
        return type == 'track' ? await this.getTopTracks(options) : await this.getTopArtists(options);
    }
    ;
    /**
     * Returns current user's saved playlists!
     * Also saves into cache based on your cacheOptions
     *
     * @param options Options to configure results
     * @param force If true then will directly fetch instead of searching cache!
     * @example const playlists = user.getPlaylists()
     */
    async getPlaylists(options = {}, force = false) {
        if (!force && this.playlists.length)
            return this.playlists;
        try {
            const data = await this.fetch({ link: `v1/me/playlists`, params: options });
            const items = data.map(x => new Playlist_1.default(x, this.client));
            if (this.client.cacheOptions.cachePlaylists)
                this.client.cache.playlists.push(...items);
            this.playlists.push(...items);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Returns current user's saved albums!
     * Also saves into cache based on your cacheOptions
     *
     * @param options Options to configure results
     * @param force If true then will directly fetch instead of searching cache
     * @example const albums = await user.getAlbums();
     */
    async getAlbums(options = {}, force = false) {
        if (!force && this.albums.length)
            return this.albums;
        try {
            const data = await this.fetch({ link: `v1/me/albums`, params: options });
            const items = data.map(x => new Album_1.default(x, this.client));
            if (this.client.cacheOptions.cacheAlbums)
                this.client.cache.albums.push(...items);
            this.albums.push(...items);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Returns current user's saved shows!
     * Also saves into cache based on your cacheOptions
     *
     * @param options Options to configure your results
     * @param force If true then will directly fetch instead of searching cache
     * @example const shows = await user.getShows();
     */
    async getShows(options = {}, force = false) {
        if (!force && this.shows.length)
            return this.shows;
        try {
            const data = await this.fetch({ link: `v1/me/shows`, params: options });
            const items = data.map(x => new Show_1.default(x, this.client));
            if (this.client.cacheOptions.cacheShows)
                this.client.cache.shows.push(...items);
            this.shows.push(...items);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Returns current user's saved tracks!
     * Also saves into cache based on your cacheOptions
     *
     * @param options Configure your options
     * @param force If true then will directly fetch instead of searching cache
     * @example const tracks = await user.getTracks();
     */
    async getTracks(options = {}, force = false) {
        if (!force && this.tracks.length)
            return this.tracks;
        try {
            const data = await this.fetch({ link: `v1/me/tracks`, params: options });
            const items = data.map(x => new Track_1.default(x, this.client));
            if (this.client.cacheOptions.cacheTracks)
                this.client.cache.tracks.push(...items);
            this.tracks.push(...items);
            return data;
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Deletes this album from your saved list!
     *
     * @param ids Id of the albums
     * @example user.deleteAlbum('id');
     * user.deleteAlbum('id1', 'id2', 'id3');
     */
    async deleteAlbum(...ids) {
        try {
            await this.fetch({ method: 'DELETE', link: `v1/me/albums`, params: { ids: ids.join(',') } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Deletes this track from your saved list!
     *
     * @param ids Id of the tracks
     * @example user.deleteTrack('id');
     * user.deleteTrack('id1', 'id2', 'id3');
     */
    async deleteTrack(...ids) {
        try {
            await this.fetch({ method: 'DELETE', link: `v1/me/tracks`, params: { ids: ids.join(',') } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Deletes this show from your saved list!
     *
     * @param ids Id of the shows
     * @example user.deleteShow('id');
     * user.deleteShow('id1', 'id2', 'id3');
     */
    async deleteShow(...ids) {
        try {
            await this.fetch({ method: 'DELETE', link: `v1/me/shows`, params: { ids: ids.join(',') } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Adds those albums to your saved list!
     *
     * @param ids Id of the albums
     * @example user.addAlbum('id');
     * user.addAlbum('id1', 'id2', 'id3');
     */
    async addAlbum(...ids) {
        try {
            await this.fetch({ method: 'PUT', link: `v1/me/albums`, params: { ids: ids.join(',') } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Adds those tracks to your saved list!
     *
     * @param ids Id of the tracks
     * @example user.addTrack('id');
     * user.addTrack('id1', 'id2', 'id3');
     */
    async addTrack(...ids) {
        try {
            await this.fetch({ method: 'PUT', link: `v1/me/tracks`, params: { ids: ids.join(',') } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Adds those shows to your saved list!
     *
     * @param ids Id of the shows
     * @example user.addShow('id');
     * user.addShow('id1', 'id2', 'id3');
     */
    async addShow(...ids) {
        try {
            await this.fetch({ method: 'PUT', link: `v1/me/shows`, params: { ids: ids.join(',') } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Verify if the current user follows those users!
     *
     * @param ids All id's of the users to verify!
     * @example  user.followsUser('id');
     * user.followsUser('id1', 'id2', 'id3'); // For multiple verification
     */
    async followsUser(...ids) {
        try {
            return await this.fetch({ link: 'v1/me/following/contains', params: { type: 'user', ids: ids.join(',') } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Verify if the current user follows those artists
     *
     * @param ids All id's of the artists to verify!
     * @example user.followsArtist('id');
     * user.followsArtist('id1', 'id2', 'id3'); // For multiple verification
     */
    async followsArtist(...ids) {
        if (!ids.length)
            throw new Error_1.MissingParamError('There should be atleast 1 id to verify!');
        try {
            return await this.fetch({ link: 'v1/me/following/contains', params: { type: 'artist', ids: ids.join(',') } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Verify if the current user follows those users or artists
     *
     * @param type Type could be artist or user which will state that whose id you have provided artist or user?
     * @param ids Ids of the users or artists
     * @example const followsUser = await user.follows('user', 'id', 'id2');
     * const followsArtist = await user.follows('artist', 'id', 'id2');
     * @deprecated This might be removed in upcomming versions! You can use followsUser or followsArtist instead of using this method!
     */
    async follows(type, ...ids) {
        return type == 'artist' ? await this.followsArtist(...ids) : await this.followsUser(...ids);
    }
    ;
    /**
     * Follow many or one spotify user by id!
     *
     * @param ids Ids of the user or users
     * @example user.followUser('id');
     * user.followUser('id1', 'id2', 'id3'); // To follow many
     */
    async followUser(...ids) {
        try {
            await this.fetch({ method: 'PUT', link: `v1/me/following`, params: { ids: ids.join(','), type: 'user' } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    /**
     * Follow a spotify playlist by id!
     *
     * @param id Id of the spotify playlist!
     * @example user.followPlaylist('id');
     */
    async followPlaylist(id) {
        try {
            await this.fetch({ method: 'PUT', link: `v1/playlists/${id}/followers`, headers: { "Content-Type": "application/json" } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Follow many or one spotify artist by id!
     *
     * @param ids Ids of the artist or artists
     * @example user.followArtist('id');
     * user.followArtist('id1', 'id2', 'id3'); // To follow many
     */
    async followArtist(...ids) {
        try {
            await this.fetch({ method: 'PUT', link: `v1/me/following`, params: { ids: ids.join(','), type: 'artist' } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    /**
     * Aliases of the followUser followPlaylist and followArtist
     * You can only provide 1 id for playlist!
     *
     * @param type Type of the id. User, Artist or Playlist
     * @param ids Ids of the user or artist. Only 1 id can be used to follow playlist
     * @deprecated This method may get removed in upcomming versions. You can use followUser, followArtist or followPlaylist instead!
     */
    async follow(type = 'user', ...ids) {
        if (type == 'user')
            await this.followUser(...ids);
        else if (type == 'artist')
            await this.followArtist(...ids);
        else
            await this.followPlaylist(ids[0]);
    }
    ;
    /**
     * Unfollow many or one spotify user by id!
     *
     * @param ids Ids of the user or users
     * @example user.unfollowUser('id');
     * user.unfollowUser('id1', 'id2', 'id3'); // To follow many
     */
    async unfollowUser(...ids) {
        try {
            await this.fetch({ method: 'PUT', link: `v1/me/following`, params: { ids: ids.join(','), type: 'user' } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    /**
     * Unfollow a spotify playlist by id!
     *
     * @param ids Ids of the spotify playlist
     * @example user.unfollowPlaylist('id');
     * user.unfollowUser('id1', 'id2', 'id3'); // To follow many
     */
    async unfollowPlaylist(id) {
        try {
            await this.fetch({ method: 'DELETE', link: `v1/playlists/${id}/followers`, headers: { "Content-Type": "application/json" } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    /**
     * Unfollow many or one spotify artists by id!
     *
     * @param ids Ids of the artist or artists
     * @example user.unfollowArtist('id');
     * user.unfollowArtist('id1', 'id2', 'id3'); // To follow many
     */
    async unfollowArtist(...ids) {
        try {
            await this.fetch({ method: 'DELETE', link: `v1/me/following`, params: { ids: ids.join(','), type: 'artist' } });
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    /**
     * Aliases of the unfollowUser unfollowPlaylist and unfollowArtist
     *
     * @param type Type of the id. Should be one of "user", "artist", "playlist"!
     * @param ids Ids of the user or artist. Only 1 id can be used to unfollow playlist
     * @deprecated This method may get removed in upcomming versions! You can use unfollowUser, unfollowArtist or unfollowPlaylist itself!
     */
    async unfollow(type = 'user', ...ids) {
        if (type == 'user')
            await this.unfollowUser(...ids);
        else if (type == 'artist')
            await this.unfollowArtist(...ids);
        else
            await this.unfollowPlaylist(ids[0]);
    }
    ;
    /**
     * Get the list of followers of the current user. By default will return user followers
     * Will also cache based on your cache options!
     *
     * @param type Type of followers needs to be returned! User or artist!
     * @example const usersFollowers = await user.getFollowers();
     * const artistsFollowers = await user.getFollowers('artist');
     */
    async getFollowers(type = 'user') {
        try {
            let data = await this.fetch({ link: `v1/me/following`, params: { type } });
            if (type == 'user') {
                data = data.map(x => new User_1.default(x, this.client));
                if (this.client.cacheOptions.cacheUsers) {
                    this.client.cache.users.push(...data);
                    this.followers.users.push(...data);
                }
                ;
                return data;
            }
            else {
                data = data.map(x => new Artist_1.default(x, this.client));
                if (this.client.cacheOptions.cacheArtists) {
                    this.client.cache.artists.push(...data);
                    this.followers.artists.push(...data);
                }
                ;
                return data;
            }
        }
        catch (e) {
            throw new Error_1.UnexpectedError(e);
        }
    }
    ;
    async login(options) {
        this.token = typeof options == 'string' ? options : (await this.auth.refresh(options)).accessToken;
        this.client.login(this.token);
        this.player = new UserPlayer_1.default(this.client);
        this.startedAt = Date.now();
    }
    ;
}
;
exports.default = UserClient;
