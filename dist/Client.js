"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
const Error_1 = require("./Error");
const Auth_1 = require("./managers/Auth");
const NOOP = () => { };
/**
 * The basic client to interact with the Spotify Web API.
 */
class Client {
    /**
     * The basic client to interact with the Spotify Web API.
     *
     * @param options The options necessary for the client.
     * @example const client = new Client({ token: "someToken" });
     */
    constructor(options) {
        var _a, _b;
        /**
         * The version of spotify web api. For future purposes.
         */
        this.version = 'v1';
        /**
         * The refresh event of the client.
         */
        this.onRefresh = NOOP;
        /**
         * The refresh token for the client.
         */
        this.refreshToken = "";
        /**
         * Boolean stating should the client retry when the request is rate limited or not by default it is true.
         */
        this.retryOnRateLimit = true;
        this.onRefresh = options.onRefresh || NOOP;
        this.retryOnRateLimit = (_a = options.retryOnRateLimit) !== null && _a !== void 0 ? _a : true;
        this.auth = new Auth_1.AuthManager(this.token);
        if (typeof options.token == "string") {
            this.token = options.token;
            (_b = options.onReady) === null || _b === void 0 ? void 0 : _b.call(options, this.token);
        }
        else if ('clientID' in options.token) {
            this.auth.getApiToken(options.token.clientID, options.token.clientSecret).then(options.onReady);
        }
    }
    /**
     * Used to fetch data from spotify rest api.
     *
     * @param url The path from spotify api to fetch!
     * @param options The additional options required to fetch from the api.
     * @example await client.fetch('/users/id');
     */
    async fetch(url, options = {}) {
        try {
            const response = await axios_1.default({
                url: `https://api.spotify.com/${this.version}${url}`,
                method: options.method || 'GET',
                params: options.params,
                headers: {
                    Authorization: "Bearer " + this.token,
                    Accept: 'application/json',
                    ...options.headers
                },
                data: options.body
            });
            return response.data;
        }
        catch (error) {
            if (error.response.status == 429 && this.retryOnRateLimit) {
                const retryAfter = error.response.headers['Retry-After'];
                if (typeof retryAfter == "number")
                    await new Promise(r => setTimeout(r, retryAfter * 1000));
                return this.fetch(url, options);
            }
            else
                throw new Error_1.SpotifyAPIError(error);
        }
    }
}
exports.Client = Client;
