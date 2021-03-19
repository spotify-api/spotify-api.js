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
                get shows() { return makePaging(data.shows, Show_1.default, client); },
                get tracks() { return makePaging(data.tracks, Track_1.default, client); },
                get albums() { return makePaging(data.albums, Album_1.default, client); },
                get artists() { return makePaging(data.artists, Artist_1.default, client); },
                get episodes() { return makePaging(data.episodes, Episode_1.default, client); },
                get playlists() { return makePaging(data.playlists, Playlist_1.default, client); }
            };
        }
        catch (e) {
            return Errors_1.handleError(e);
        }
    }
    return search;
}
exports.default = SearchManager;
function makePaging(data, type, client) {
    return data ? {
        limit: data.limit,
        offset: data.offset,
        total: data.total,
        items: data.items.map(x => new type(x, client))
    } : {
        limit: 0,
        offset: 0,
        total: 0,
        items: []
    };
}
