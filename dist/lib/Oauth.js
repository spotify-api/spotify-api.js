"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const axios_1 = __importDefault(require("axios"));
class Auth {
    constructor(oauth) {
        if (!oauth)
            throw new Error_1.MissingParamError("missing oauth");
        this.token = oauth;
    }
    async get(options) {
        return new Promise(async (resolve, reject) => {
            if (!options.client_id)
                reject(new Error_1.MissingParamError("missing client id"));
            if (!options.client_secret)
                reject(new Error_1.MissingParamError("missing client secret"));
            const token = this.token;
            try {
                const { data } = await axios_1.default({
                    method: "post",
                    url: "https://accounts.spotify.com/api/token",
                    params: {
                        grant_type: "client_credentials",
                        token,
                        client_id: options.client_id,
                        client_secret: options.client_secret,
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
                resolve(data.access_token);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    /**
     *
     * @param options
     * @param token
     * Refreshes an Authorization token
     */
    async refresh(options, token) {
        return new Promise(async (resolve, reject) => {
            if (!options.client_id)
                reject(new Error_1.MissingParamError("missing client id"));
            if (!options.client_secret)
                reject(new Error_1.MissingParamError("missing client secret"));
            if (!options.redirect_uri)
                reject(new Error_1.MissingParamError("missing redirect uri"));
            if (!token)
                reject(new Error_1.MissingParamError("missing token"));
            try {
                const { data } = await axios_1.default({
                    method: "post",
                    url: "https://accounts.spotify.com/api/token",
                    params: {
                        grant_type: "authorization_code",
                        code: token,
                        redirect_uri: options.redirect_uri,
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: "Basic " +
                            Buffer.from(options.client_id + ":" + options.client_secret).toString("base64"),
                    },
                });
                resolve(data);
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    /**
     *
     * @param options
     * Builds an Authorization string.
     */
    build(options) {
        if (!options.client_id)
            throw new Error_1.MissingParamError("missing client id");
        if (!options.client_secret)
            throw new Error_1.MissingParamError("missing client secret");
        if (!options.redirect_uri)
            throw new Error_1.MissingParamError("missing redirect uri");
        return ("https://accounts.spotify.com/en/authorize?" +
            "client_id=" +
            options.client_id +
            "&" +
            "redirect_uri=" +
            options.redirect_uri +
            "&" +
            "response_type=code");
    }
}
exports.default = Auth;
//# sourceMappingURL=Oauth.js.map