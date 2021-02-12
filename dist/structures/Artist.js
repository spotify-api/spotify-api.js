"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Spotify_1 = __importDefault(require("../Spotify"));
/**
 * Structure for the Spotify Api's Artist Object!
 */
class Artist {
    /**
     * Structure for the Spotify Api's Artist Object!
     *
     * @param data Received Raw data by the Spotify Api!
     * @param client Your Spotify Client!
     * @example const artist = new Artist(data, client);
     */
    constructor(data, client) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.uri = data.uri;
        this.images = data.images || [];
        this.albums = [];
        this.topTracks = [];
        this.relatedArtists = [];
        this.simplified = true;
        if ('popularity' in data) {
            this.simplified = false;
            this.totalFollowers = data.followers.total;
            this.genres = data.genres;
            this.popularity = data.popularity;
        }
    }
    ;
    /**
     * Returns a code image of the artist!
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Spotify_1.default.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    /**
     * Refetches the artist and refreshes the cache!
     */
    async fetch() {
        return await this.client.artists.get(this.id, true);
    }
    /**
     * Returns the albums of the artist
     *
     * @param limit Limit of your results
     * @param force If true will directly fetch else will return from cache
     */
    async getAlbums(limit = 20, force = false) {
        if (!force && this.albums.length)
            return this.albums;
        const data = await this.client.artists.getAlbums(this.id, { limit });
        this.albums = data;
        return data;
    }
    /**
     * Returns the top tracks of the artist
     *
     * @param force If true will directly fetch else will return from the cache!
     */
    async getTopTracks(force = false) {
        if (!force && this.topTracks.length)
            return this.topTracks;
        const data = await this.client.artists.getTopTracks(this.id);
        this.topTracks = data;
        return data;
    }
    /**
     * Returns the artists who are related with the current artist
     *
     * @param force If true will directly fetch else will return from cache
     */
    async getRelatedArtists(force = false) {
        if (!force && this.relatedArtists.length)
            return this.relatedArtists;
        const data = await this.client.artists.getRelatedArtists(this.id);
        this.relatedArtists = data;
        return data;
    }
    /**
     * Verify if this artist is followed by the current user but only if you have the required scopes for the current user
     * This method uses the client.user.followsArtist method
     */
    async follows() {
        return (await this.client.user.followsArtist(this.id))[0];
    }
    /**
     * Follow this artist
     */
    async follow() {
        await this.client.user.followArtist(this.id);
    }
    /**
     * Unfollow this artist
     */
    async unfollow() {
        await this.client.user.unfollowArtist(this.id);
    }
}
;
exports.default = Artist;
