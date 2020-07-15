"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Spotify_1 = __importDefault(require("../../Spotify"));
class track extends Spotify_1.default {
    async search(q, limit, options) {
        if (!q)
            throw new Error("No search Query was provided");
        if (!limit)
            limit = 1;
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&market=US&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            if (!res["tracks"].items.length)
                return "No results found";
            if (options) {
                if (!options.advanced)
                    Promise.reject("(spotify-api.js)Invalid options were provided");
                let i = 0;
                while (i < res.tracks.items.length) {
                    const data = await this.getData(res.tracks.items[i].uri);
                    res.tracks.items[i].hex = data.dominantColor;
                    let match = this.hexRgb(data.dominantColor);
                    let c = "white";
                    if (match[0] > 150)
                        c = "black";
                    res.tracks.items[i].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(1)}/${c}/1080/${res.tracks.items[i].uri}`;
                    i++;
                }
                return res.tracks.items;
            }
            if (!options)
                return res["tracks"].items;
        }
        catch (e) {
            throw e.response.data;
        }
    }
    async get(trackid) {
        if (!trackid)
            throw new Error("No track ID was provided");
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/tracks/${trackid}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            let spot = res.uri;
            let data = await this.getData(spot);
            const match = this.hexRgb(data.dominantColor);
            let c = "white";
            if (match[0] > 150)
                c = "black";
            res.hex = data.dominantColor;
            res.codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(1)}/${c}/1080/spotify:track:${res.id}`;
            return res;
        }
        catch (e) {
            throw e.response.data;
        }
    }
    async audioFeatures(trackid) {
        if (!trackid)
            throw new Error("(spotify-api.js)No Track ID was provided");
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/audio-features/${trackid}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            return res;
        }
        catch (e) {
            throw e.response.data;
        }
    }
    async analysis(trackid) {
        if (!trackid)
            throw new Error("(spotify-api.js)No Track ID was provided");
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/audio-analysis/${trackid}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            return res;
        }
        catch (e) {
            throw e.response.data;
        }
    }
}
exports.default = track;
//# sourceMappingURL=index.js.map