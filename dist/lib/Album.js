"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
class Album extends Spotify_1.default {
    async search(q, options) {
        return new Promise(async (resolve, reject) => {
            if (!q)
                throw new Error_1.MissingParamError("missing query!");
            if (!options)
                options = {};
            try {
                const res = await this.fetch({
                    link: "v1/search",
                    params: {
                        q: encodeURIComponent(q),
                        market: "US",
                        limit: options.limit || 20,
                        type: "album",
                    },
                });
                let items = res.albums.items;
                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    }
                }
                resolve(items);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    async get(id) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id"));
            try {
                resolve(await this.fetch({
                    link: `v1/albums/${id}`,
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    async getTracks(id, options) {
        return new Promise(async (resolve, reject) => {
            if (!id)
                reject(new Error_1.MissingParamError("missing id!"));
            if (!options)
                options = {};
            try {
                const res = await this.fetch({
                    link: `v1/albums/${id}/tracks`,
                    params: {
                        limit: options.limit || 20,
                        market: "US",
                        offset: "0",
                    },
                });
                let items = res.items;
                if (options.advanced) {
                    for (let i = 0; i < items.length; i++) {
                        let data = await this.getCodeImage(items[i].uri);
                        items[i].codeImage = data.image;
                        items[i].dominantColor = data.dominantColor;
                    }
                }
                resolve(items);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
}
exports.default = Album;
//# sourceMappingURL=Album.js.map