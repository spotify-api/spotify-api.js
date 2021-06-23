"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistTrack = void 0;
const User_1 = __importDefault(require("./User"));
const Track_1 = __importDefault(require("./Track"));
const Episode_1 = __importDefault(require("./Episode"));
/**
 * Creates a playlist track object using spotify api data and spotify client!
 *
 * @param data Raw data from spotify api
 * @param client Your spotify client!
 * @example Spotify.PlaylistTrack(data, client);
 */
function PlaylistTrack(data, client) {
    return {
        addedAt: data.added_at,
        local: data.is_local,
        get addedBy() {
            return data.added_by ? new User_1.default(data.added_by, client) : null;
        },
        get track() {
            return data.track.type == 'track' ? new Track_1.default(data.track, client) : new Episode_1.default(data.track, client);
        }
    };
}
exports.PlaylistTrack = PlaylistTrack;
/**
 * Spotify Api's Playlist Object
 */
class Playlist {
    /**
     * Spotify Api's Playlist Object
     *
     * @param data Received raw data from the spotify api
     * @param client Your Spotify Client!
     * @example const playlist = new Playlist(data, client);
     */
    constructor(data, client) {
        var _a;
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });
        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = data.external_urls;
        this.totalFollowers = (_a = data.followers) === null || _a === void 0 ? void 0 : _a.total;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.public = data.public;
        this.snapshotID = data.snapshot_id;
        this.type = data.type;
        this.uri = data.uri;
    }
    ;
    /**
     * Returns the Spotify User who created the playlist!
     * @readonly
     */
    get owner() {
        return new User_1.default(this.data.owner, this.client);
    }
    ;
    /**
     * Returns the total tracks of playlist in the form of array of PlaylistTracks!
     * Will return an PlaylistTrackRef object if a simplified playlist has been supplied!
     * @readonly
     */
    get tracks() {
        return this.data.tracks.items ? {
            limit: this.data.tracks.limit,
            total: this.data.tracks.total,
            offset: this.data.tracks.offset,
            items: this.data.tracks.items.map(x => PlaylistTrack(x, this.client))
        } : this.data.tracks;
    }
    ;
    /**
     * Fetches playlist and refreshes the cache!
     *
     * @example playlist.fetch();
     */
    async fetch() {
        return await this.client.playlists.get(this.id, true);
    }
    /**
     * Returns the images of the playlist!
     *
     * @example playlist.getImages();
     */
    async getImages() {
        return await this.client.playlists.getImages(this.id);
    }
    /**
     * Returns all the tracks of the playlist!
     *
     * @param options Options such as limit and offset
     * @example playlist.getTracks()
     */
    async getTracks(options) {
        return await this.client.playlists.getTracks(this.id, options);
    }
    /**
     * Returns a code image of the Playlist!
     * @param color Hex color code
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    /**
     * Follow a playlist inshort words add the playlist to your library!
     *
     * @param options Options such as public
     * @example await playlist.follow();
     */
    async follow(options) {
        return await this.client.user.followPlaylist(this.id, options);
    }
    /**
     * Unfollow a playlist!
     *
     * @example await playlist.unfollow();
     */
    async unfollow() {
        return await this.client.user.unfollowPlaylist(this.id);
    }
    /**
     * Verify if many or some user follows a playlist!
     *
     * @param playlistID Spotify playlist id
     * @example const follows = await client.playlists.userFollows('userid1', 'userid2');
     */
    async userFollows(...ids) {
        return (await this.client.playlists.userFollows(this.id, ...ids))[0] || false;
    }
    /**
     * Edit this playlist!
     *
     * @param options CreatePlaylist options except the userID field.
     * @example
     * // One way to edit
     * playlist.description = "Edited Description";
     * await playlist.edit();
     *
     * // Another way to edit
     * await playlist.edit({ description: "Edited Description" });
     */
    async edit(options) {
        var _a;
        const opts = {
            name: this.name,
            public: (_a = this.public) !== null && _a !== void 0 ? _a : true,
            collaborative: this.collaborative,
            description: this.description
        };
        Object.assign(opts, options || {});
        const success = await this.client.user.editPlaylist(this.id, opts);
        if (success) {
            this.name = opts.name;
            this.public = opts.public;
            this.collaborative = opts.collaborative;
            this.description = opts.description;
        }
        else
            return false;
        return this;
    }
    /**
     * Add items to the playlist!
     *
     * @param items Array of uris of the spotify episodes or spotify tracks to add to the playlist
     * @param options Options containing position field
     * @example await playlists.add(['spotify:track:id']);
     */
    async add(items, options) {
        return await this.client.playlists.addItems(this.id, items, options);
    }
    /**
     * Reorder items of the playlist!
     *
     * @param options ReorderOptions of spotify playlist!
     * @example await playlist.reorder(['spotify:track:id'], {
     *     insertBefore: 10
     * })
     */
    async reorder(items, options) {
        return await this.client.playlists.reorderItems(this.id, items, options);
    }
    /**
     * Remove items from the playlist!
     *
     * @param items Array of spotify uris of tracks and episodes to remove from the playlist!
     * @param snapshotID The playlist’s snapshot ID against which you want to make the changes.
     * @example await playlist.remove(['spotify:track:id']);
     */
    async remove(items, snapshotID) {
        return await this.client.playlists.removeItems(this.id, items, snapshotID);
    }
    /**
     * Upload a custom image to the playlist!
     *
     * @param image Image data url of image/jpeg to upload!
     * @example await client.playlists.uploadImage('id', imageDataUri); // Make sure the URI isn't prepended by 'data:image/jpeg;base64,'
     */
    async uploadImage(image) {
        return await this.client.playlists.uploadImage(this.id, image);
    }
}
exports.default = Playlist;
;
