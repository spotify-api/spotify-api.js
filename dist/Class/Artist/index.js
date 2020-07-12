"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const spotifyData = require("spotify-url-info");
const hexRgb = require("hex-rgb");
class artist {
    constructor(oauth) {
        if (!oauth)
            throw new Error("(Spotify-api.js)No OAuth token was Provided");
        this.token = oauth;
    }
    async search(q, limit, options) {
        if (!q)
            throw new Error("(Spotify-api.js)No search Query was provided");
        if (!limit)
            limit = 1;
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=artist&market=US&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            if (!res["artists"].items.length)
                return "No results found";
            if (options) {
                if (!options.advanced)
                    Promise.reject("(spotify-api.js)Invalid options were provided");
                let i = 0;
                while (i < res.artists.items.length) {
                    const data = await spotifyData.getData(res.artists.items[i].external_urls.spotify);
                    res.artists.items[i].hex = data.dominantColor;
                    let match = hexRgb(data.dominantColor, { format: "array" });
                    let c = "white";
                    if (match[0] > 150)
                        c = "black";
                    res.artists.items[i].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(1)}/${c}/1080/${res.artists.items[i].uri}`;
                    i++;
                }
                return res.artists.items;
            }
            return res["artists"].items;
        }
        catch (e) {
            throw e.response.data;
        }
    }
    async get(artid, option) {
        if (!artid)
            throw new Error("No Artist ID was provided");
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/artists/${artid}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            if (option) {
                if (!option.advanced)
                    Promise.reject("(spotify-api.js)Invalid options were provided");
                let i = 0;
                const data = await spotifyData.getData(res.external_urls.spotify);
                res.hex = data.dominantColor;
                let match = hexRgb(data.dominantColor, { format: "array" });
                let c = "white";
                if (match[0] > 150)
                    c = "black";
                res.codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(1)}/${c}/1080/${res.uri}`;
                return res;
            }
            if (!option)
                return res;
        }
        catch (e) {
            throw e.response.data;
        }
    }
    async albums(artistid, limit, option) {
        if (!artistid)
            throw new Error("(spotify-api.js)No Artist ID was provided");
        if (!limit)
            limit = 1;
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/artists/${artistid}/albums?include_groups=single&market=US&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            if (option) {
                if (!option.advanced)
                    Promise.reject("(spotify-api.js)Invalid options were provided");
                let i = 0;
                while (i < res.items.length) {
                    const data = await spotifyData.getData(res.items[i].external_urls.spotify);
                    res.items[i].hex = data.dominantColor;
                    let match = hexRgb(data.dominantColor, { format: "array" });
                    let c = "white";
                    if (match[0] > 150)
                        c = "black";
                    res.items[i].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(1)}/${c}/1080/${res.items[i].uri}`;
                    i++;
                }
                return res.items;
            }
            if (!option)
                return res.items;
        }
        catch (e) {
            throw e.response.data;
        }
    }
    async top(id, option) {
        if (!id)
            throw new Error("(spotify-api.js)No Artist ID was provided");
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            if (option) {
                if (!option.advanced)
                    return res;
                let i = 0;
                while (i < res.tracks.length) {
                    const data = await spotifyData.getData(res.tracks[i].external_urls.spotify);
                    res.tracks[i].hex = data.dominantColor;
                    let match = hexRgb(data.dominantColor, { format: "array" });
                    let c = "white";
                    if (match[0] > 150)
                        c = "black";
                    res.tracks[i].codeImg = `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(1)}/${c}/1080/${res.tracks[i].uri}`;
                    i++;
                }
                return res;
            }
            if (!option)
                return res;
        }
        catch (e) {
            throw e.response.data;
        }
    }
}
exports.default = artist;
//# sourceMappingURL=index.js.map