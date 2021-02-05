"use strict";
/**
 * Auth lib file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("../Error");
const axios_1 = __importDefault(require("axios"));
/**
 * Class of all methods related to auth
 */
class AuthManager {
    /**
     * Class of all methods related to auth
     *
     * @param oauth Your token
     */
    constructor(oauth) {
        this.token = oauth || 'NO TOKEN';
    }
    ;
    /**
     * The method used to get a new token by client id and client secret!
     *
     * @param options Your client id and client secret in object form
     * @example client.oauth.get({
     *     client_id: 'your-client-id',
     *     client_secret: 'your-client-secret'
     * }).then(console.log) // Will return you the token!
     */
    async get(options) {
        return new Promise(async (resolve, reject) => {
            if (!options.clientId)
                reject(new Error_1.MissingParamError("missing client id"));
            if (!options.clientSecret)
                reject(new Error_1.MissingParamError("missing client secret"));
            const token = this.token;
            try {
                const { data } = await axios_1.default({
                    method: "post",
                    url: "https://accounts.spotify.com/api/token",
                    params: {
                        grant_type: "client_credentials",
                        token,
                        client_id: options.clientId,
                        client_secret: options.clientSecret,
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
    ;
    /**
     * Used to refresh an current user token or get a new one!
     *
     * @param options Your client id, client secret, redirect uri and refresh token aka code
     */
    async refresh(options) {
        return new Promise(async (resolve, reject) => {
            if (!options.clientId)
                reject(new Error_1.MissingParamError("missing client id"));
            if (!options.clientSecret)
                reject(new Error_1.MissingParamError("missing client secret"));
            if (!options.redirectUrl)
                reject(new Error_1.MissingParamError("missing redirect uri"));
            if (!options.code)
                reject(new Error_1.MissingParamError("missing code"));
            try {
                const { data } = await axios_1.default({
                    method: "post",
                    url: "https://accounts.spotify.com/api/token",
                    params: {
                        grant_type: "authorization_code",
                        code: options.code,
                        redirect_uri: options.redirectUrl,
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: "Basic " +
                            Buffer.from(options.clientId + ":" + options.clientSecret).toString("base64"),
                    },
                });
                resolve({
                    accessToken: data.access_token,
                    tokenType: data.token_type,
                    scope: data.scope,
                    refreshToken: data.refresh_token,
                    expiresIn: data.expires_in
                });
            }
            catch (e) {
                reject(new Error_1.UnexpectedError(e));
            }
        });
    }
    ;
}
exports.default = AuthManager;
;
