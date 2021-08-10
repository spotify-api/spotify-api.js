import axios from "axios";
import { ClientOptions, FetchOptions, ClientRefreshMeta, GetUserTokenOptions, CacheSettings } from "./Interface";
import { SpotifyAPIError  } from "./Error";
import { AuthManager } from "./managers/Auth";

const NOOP = () => {};

/**
 * The basic client to interact with the Spotify Web API.
 */
export class Client {

    /**
     * The token of the spotify web client.
     */
    public token!: string;

    /**
     * The manager to perform actions regarding the authorization to the web api.
     */
    public auth!: AuthManager;

    /**
     * The version of spotify web api. For future purposes.
     */
    public version: `v${number}` = 'v1';

    /**
     * The refresh event of the client.
     */
    public onRefresh: () => void = NOOP;

    /**
     * The metadata for continous refresh of token.
     */
    public refreshMeta!: ClientRefreshMeta;

    /** 
     * Boolean stating should the client retry when the request is rate limited or not by default it is true. 
     */
    public retryOnRateLimit?: boolean = true;

    /**
     * Cache settings for the client.
     */
    public cacheSettings: CacheSettings = {
        users: true
    };

    /**
     * The basic client to interact with the Spotify Web API.
     * 
     * @param options The options necessary for the client.
     * @example const client = new Client({ token: "someToken" });
     */
    public constructor(options: ClientOptions) {
        this.onRefresh = options.onRefresh || NOOP;
        this.retryOnRateLimit = options.retryOnRateLimit ?? true;
        this.auth = new AuthManager(this.token);

        if (typeof options.token == "string") {
            if (options.refreshToken) console.trace("[SpotifyWarn]: You have provided a token and used `refreshToken` option. Try to provide clientID, clientSecret or user authenication details.");
            this.token = options.token;
            options.onReady?.(this);
        } else if ('clientID' in options.token) {
            this.refreshMeta = options.token;
            this.auth.getApiToken(options.token.clientID, options.token.clientSecret)
                .then(token => {
                    this.token = token;
                    options.onReady?.(this);
                });
        } else if ('redirectURL' in options.token) {
            this.refreshMeta = options.token;
            this.auth.getUserToken(this.refreshMeta as GetUserTokenOptions)
                .then(context => {
                    this.token = context.accessToken;
                    this.refreshMeta.refreshToken = context.refreshToken;
                    options.onReady?.(this);
                });
        } else throw new SpotifyAPIError('Improper [ClientOptions] provided!.');

        if (typeof options.cacheSettings == "object") this.cacheSettings = options.cacheSettings;
    }

    /**
     * Used to fetch data from spotify rest api.
     * 
     * @param url The path from spotify api to fetch!
     * @param options The additional options required to fetch from the api.
     * @example await client.fetch('/users/id');
     */
    public async fetch(url: string, options: FetchOptions = {}) {
        try {
            const response = await axios({
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
        } catch(error) {
            if (error.response.status = 404) return null;
            else if (error.response.status == 429 && this.retryOnRateLimit) {
                const retryAfter = error.response.headers['Retry-After'];
                if (typeof retryAfter == "number") await new Promise(r => setTimeout(r, retryAfter * 1000));
            } else if (error.response.data.error.message == "Invalid access token" && this.refreshMeta) await this.refreshFromMeta();
            else throw new SpotifyAPIError(error);

            return this.fetch(url, options);
        }
    }

    private async refreshFromMeta() {
        if ('refreshToken' in this.refreshMeta) {
            this.auth.getUserToken(this.refreshMeta as GetUserTokenOptions)
                .then(context => {
                    this.token = context.accessToken;
                    this.refreshMeta.refreshToken = context.refreshToken;
                    this.onRefresh();
                });
        } else {
            this.auth.getApiToken(this.refreshMeta.clientID, this.refreshMeta.clientSecret)
                .then(token => {
                    this.token = token;
                    this.onRefresh();
                });
        }

        this.auth = new AuthManager(this.token);
    }

}