"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Album_1 = __importDefault(require("../structures/Album"));
const Artist_1 = __importDefault(require("../structures/Artist"));
const Episode_1 = __importDefault(require("../structures/Episode"));
const Playlist_1 = __importDefault(require("../structures/Playlist"));
const Show_1 = __importDefault(require("../structures/Show"));
const Track_1 = __importDefault(require("../structures/Track"));
const Errors_1 = require("../Errors");
const defaultTypes = ['episode', 'playlist', 'show', 'track', 'album', 'artist'];
/**
 * Manager for spotify search api
 *
 * @param client Your spotify client
 * @example const artists = await SearchManager(client)('Alan Walker');
 */
function SearchManager(client) {
    async function search(query, options = {
        type: defaultTypes.join(',')
    }) {
        try {
            options.q = query;
            options.type = (Array.isArray(options.type) ? options.type.join(',') : (options.type || defaultTypes.join(',')));
            const data = await client.util.fetch('/search', { params: options });
            return {
                get shows() { return data.shows ? data.shows.items.map(x => new Show_1.default(x, client)) : []; },
                get tracks() { return data.tracks ? data.tracks.items.map(x => new Track_1.default(x, client)) : []; },
                get albums() { return data.albums ? data.albums.items.map(x => new Album_1.default(x, client)) : []; },
                get artists() { return data.artists ? data.artists.items.map(x => new Artist_1.default(x, client)) : []; },
                get episodes() { return data.episodes ? data.episodes.items.map(x => new Episode_1.default(x, client)) : []; },
                get playlists() { return data.playlists ? data.playlists.items.map(x => new Playlist_1.default(x, client)) : []; }
            };
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    return search;
}
exports.default = SearchManager;
