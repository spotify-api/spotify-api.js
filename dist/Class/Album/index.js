"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const spotifyData = require("spotify-api.js");
const hexRgb = require('hex-rgb');
class Album {
    constructor(oauth) {
        this.token = oauth;
    }
    async search(q, limit) {
        if (!q)
            throw new Error("(spotify-api.js)No query was Provided");
        if (!limit)
            limit = 1;
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=album&market=US&limit=${limit}`);
            if (!res["albums"].items.length)
                return 'No results found';
            const data = spotifyData.getData(res["albums"].items[0].external_urls.spotify);
            const match = hexRgb(data.dominantColor, { format: 'array' });
            let c = 'white';
            if (match[0] > 150)
                c = 'black';
            res["albums"].items[0].hex = data.dominantColor;
            res["albums"].items[0].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(1)}/${c}/1080/spotify:album:${res["albums"].items[0].id}`;
            return res;
        }
        catch (e) {
            Promise.reject('(Spotify-api.js)Invalid Token');
        }
    }
}
exports.default = Album;
//# sourceMappingURL=index.js.map