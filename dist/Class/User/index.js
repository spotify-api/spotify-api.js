"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Spotify_1 = __importDefault(require("../../Spotify"));
class User extends Spotify_1.default {
    async get(userid) {
        if (!userid)
            throw new Error("(spotify-api.js)No User ID was provided");
        try {
            const { data: res } = await axios_1.default.get(`https://api.spotify.com/v1/users/${userid}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            res.codeImg = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${res.uri}`;
            return res;
        }
        catch (e) {
            throw e.response.data;
        }
    }
}
exports.default = User;
//# sourceMappingURL=index.js.map