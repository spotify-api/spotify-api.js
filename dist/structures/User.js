"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Spotify Api's User object!
 */
class User {
    /**
     * The Spotify Api's User object!
     *
     * @param data The raw spotify user data!
     * @param client The spotify client
     * @example const user = new Spotify.User(data, client);
     */
    constructor(data, client) {
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
        this.name = data.display_name;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;
        this.images = data.images || [];
        this.playlists = [];
        if ('followers' in data)
            this.totalFollowers = data.followers.total;
    }
    ;
    /**
     * Fetches user and refreshes the cach!
     *
     * @example user.fetch();
     */
    async fetch() {
        return await this.client.users.get(this.id, true);
    }
    /**
     * Returns the saved playlist of the user!
     *
     * @param options Options containing the offset and limit!
     * @param force If true, will directly fetch else will search for cache first!
     * @example await user.getPlaylists({
     *     limit: 5,
     *     offset: 2
     * });
     */
    async getPlaylists(options, force = !this.client.cacheOptions.cachePlaylists) {
        if (!force && this.playlists.length)
            return this.playlists;
        const playlists = await this.client.users.getPlaylists(this.id, options);
        if (this.client.cacheOptions.cachePlaylists)
            this.playlists = playlists;
        return playlists;
    }
    /**
     * Returns a code image
     *
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
}
exports.default = User;
;
