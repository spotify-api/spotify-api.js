"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
class Track extends Spotify_1.default {
    async search(q, options) {
        return new Promise(async (resolve, reject) => {
            if (!q)
                reject(new Error_1.MissingParamError("missing query"));
            if (!options)
                options = {};
            try {
                const res = await this.fetch({
                    link: `v1/search`,
                    params: {
                        q: encodeURIComponent(q),
                        type: "track",
                        market: "US",
                        limit: options.limit || 20,
                    },
                });
                let items = res.tracks.items;
                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    }
                    ;
                }
                ;
                resolve(items);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    ;
    async get(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            try {
                const data = await this.fetch({
                    link: `v1/tracks/${id}`,
                });
                const codeImage = await this.getCodeImage(data.uri);
                data.codeImage = codeImage.image;
                data.dominantColor = codeImage.dominantColor;
                resolve(data);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    ;
    async audioFeatures(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            try {
                const res = await this.fetch({
                    link: `v1/audio-features/${id}`,
                });
                resolve(res);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    ;
    async audioAnalysis(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            try {
                const res = await this.fetch({
                    link: `v1/audio-analysis/${id}`,
                });
                resolve(res);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    ;
}
;
exports.default = Track;
//# sourceMappingURL=Track.js.map