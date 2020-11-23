"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaylistTrack_1 = __importDefault(require("./PlaylistTrack"));
const PlaylistOwner_1 = __importDefault(require("./PlaylistOwner"));
/**
 * SimplifiedPlaylist class
 */
class SimplifiedPlaylist {
    /**
     * **Example:**
     *
     * ```js
     * const playlist = new SimplifiedPlaylist(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data });
        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.owner = new PlaylistOwner_1.default(data.owner);
        this.primaryColor = data.primary_color;
        this.public = data.public;
        this.snapshotId = data.snapshot_id;
        this.type = data.type;
        this.uri = data.uri;
        this.totalTracks = data.tracks.total;
    }
    ;
    /**
     * Returns an array of simplified tracks
     * @readonly
     */
    get tracks() {
        return this.data.tracks.items.map(x => new PlaylistTrack_1.default(x));
    }
    ;
}
;
exports.default = SimplifiedPlaylist;
//# sourceMappingURL=SimplifiedPlaylist.js.map