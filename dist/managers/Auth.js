"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
const axios_1 = __importDefault(require("axios"));
const Error_1 = require("../Error");
/**
 * A manager to perform actions regarding the authorization to the web api.
 */
class AuthManager {
    /**
     * A manager to perform actions regarding the authorization to the web api.
     *
     * @param token The spotify web api token.
     * @example const auth = new AuthManager("token");
     */
    constructor(token) {
        this.token = token;
    }
    /**
     * Returns an api token from your spotify application client id and client secret!
     *
     * @param clientID Your spotify app's client id
     * @param clientSecret Your spotify app's client secret
     * @example await auth.getApiToken('id', 'secert');
     */
    async getApiToken(clientID, clientSecret) {
        try {
            const { data } = await axios_1.default({
                method: 'POST',
                url: 'https://accounts.spotify.com/api/token',
                params: {
                    grant_type: 'client_credentials',
                    token: this.token,
                    client_id: clientID,
                    client_secret: clientSecret
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });
            console.log(data);
            return data.access_token;
        }
        catch (e) {
            throw new Error_1.SpotifyAPIError(e);
        }
    }
}
exports.AuthManager = AuthManager;
