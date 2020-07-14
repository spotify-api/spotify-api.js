"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class auth {
    constructor(oauth) {
        this.token = oauth;
    }
    async get(options, uri) {
        let token = this.token;
        if (!options)
            throw new Error("(Spotify-api.js) No Authorization option was provided");
        if (!options.client_id)
            throw new Error("(Spotify-api.js) No Client ID was provided");
        if (!options.client_secret)
            throw new Error("(Spotify.js) No Client Secret was provided");
        let base = Buffer.from(`${options.client_id}:${options.client_secret}`).toString("base64");
        const { data: res } = await axios_1.default({
            method: "post",
            url: "https://accounts.spotify.com/api/token",
            params: {
                grant_type: "client_credentials",
                token,
                client_secret: options.client_secret,
                client_id: options.client_id,
                redirect_uri: "https://www.discord.com",
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return res.access_token;
    }
}
exports.default = auth;
//# sourceMappingURL=index.js.map