"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * PlaylistTrack structure
 */
const Track_1 = __importDefault(require("./Track"));
const Episode_1 = __importDefault(require("./Episode"));
/**
 * PlaylistTrack class
 */
class PlaylistTrack {
    /**
     * **Example:**
     *
     * ```js
     * const track = new PlaylistTrack(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data) {
        Object.defineProperty(this, 'data', { value: data });
        this.addedAt = data.added_at;
        this.addedBy = data.added_by;
        this.local = data.is_local;
    }
    ;
    /**
     * Full info of the track
     * @readonly
     */
    get track() {
        return this.data.track.description ? new Episode_1.default(this.data.track) : new Track_1.default(this.data.track);
    }
    ;
}
;
exports.default = PlaylistTrack;
//# sourceMappingURL=PlaylistTrack.js.map