"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const spotifyData = require('spotify-url-info');
class track {
    constructor(oauth) {
        if (!oauth)
            throw new Error('(Spotify-api.js)No OAuth token was Provided');
        this.token = oauth;
    }
    async search(q, limit) {
        if (!q)
            throw new Error('(Spotify-api.js)No search Query was provided');
        if (!limit)
            limit = 1;
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=artist&market=US&limit=${limit}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!res['artists'].items.length)
                Promise.reject('(Spotify-api.js)No results found');
            return res['artists'].items;
        }
        catch (e) {
            Promise.reject('(Spotify-api.js)Invalid Token');
        }
    }
    async get(artid) {
        if (!artid)
            throw new Error("No Artist ID was provided");
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/artists/${artid}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            });
            return res;
        }
        catch (e) {
            Promise.reject('(Spotify-api.js)Invalid Token or ID');
        }
    }
    async advanced(query) {
        if (!query)
            throw new Error('(Spotify-api.js)No query was provided');
        try {
            const res = await this.search(query, 1);
            let spot = res[0].external_urls.spotify;
            let data = await spotifyData.getData(spot);
            res[0].hex = data.dominantColor;
            res[0].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(1)}/white/1080/spotify:artist:${res[0].id}`;
            return res;
        }
        catch (_a) {
            Promise.reject('(Spotify-api.js)Invalid Token');
        }
    }
}
exports.default = track;
//# sourceMappingURL=index.js.map