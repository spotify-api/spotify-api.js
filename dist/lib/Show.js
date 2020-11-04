"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const Spotify_1 = __importDefault(require("../Spotify"));
class Show extends Spotify_1.default {
    async get(id) {
        return new Promise(async (reject, resolve) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                resolve(await this.fetch({
                    link: `v1/shows/${id}`
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
    async getEpisodes(id, limit) {
        return new Promise(async (reject, resolve) => {
            if (!id)
                reject(new Error_1.MissingParamError('missing id'));
            try {
                resolve(await this.fetch({
                    link: `v1/shows/${id}/episodes`,
                    params: {
                        market: 'US',
                        limit: limit || 20
                    }
                }));
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
            ;
        });
    }
    ;
}
;
exports.default = Show;
//# sourceMappingURL=Show.js.map