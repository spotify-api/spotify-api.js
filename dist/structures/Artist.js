"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Spotify Api's artist object
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
        if ('popularity' in data) {
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
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    /**
     * Fetches the Episode and refreshes the cache!
     */
    async fetch() {
        return await this.client.artists.get(this.id);
    }
    /**
     * Get albums of the artist!
     *
     * @param options Basic paging options
     * @example await artist.getAlbums();
     */
    async getAlbums(options) {
        return await this.client.artists.getAlbums(this.id, options);
    }
    /**
     * Returns the top tracks of the artist
     *
     * @param options Basic PagingOptions
     * @example await artist.getTopTracks();
     */
    async getTopTracks(options) {
        return await this.client.artists.getTopTracks(this.id, options);
    }
    /**
     * Returns the related artists of the artist
     *
     * @param options Basic PagingOptions
     * @example await artist.getRelatedArtists();
     */
    async getRelatedArtists(options) {
        return await this.client.artists.getRelatedArtists(this.id, options);
    }
}
exports.default = Artist;
