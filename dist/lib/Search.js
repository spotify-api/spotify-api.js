"use strict";
/**
 * Search file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
/**
 * Search through various mediums!
 *
 * @param token Your oauth token
 */
exports.default = (token) => {
    const Util = new Spotify_1.default(token);
    return async (q, options) => {
        return new Promise(async (resolve, reject) => {
            if (!q)
                reject(new Error_1.MissingParamError('missing query'));
            if (!options)
                options = {};
            if (!Array.isArray(options.type))
                options.type = ['track', 'artist', 'album'];
            try {
                resolve(await Util.fetch({
                    link: `v1/search`,
                    params: {
                        q: encodeURIComponent(q),
                        type: options.type.join(','),
                        market: "US",
                        limit: options.limit || 20,
                    },
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    };
};
//# sourceMappingURL=Search.js.map