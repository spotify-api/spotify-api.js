import axios from "axios";
import { ClientOptions, FetchOptions } from "./Interface";
import { SpotifyAPIError  } from "./Error";
import { AuthManager } from "./managers/Auth";

/** 
 * Just a noop function. 
 */
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
     * Boolean stating should the client retry when the request is rate limited or not by default it is true. 
     */
    public retryOnRateLimit?: boolean = true;

    /**
     * The basic client to interact with the Spotify Web API.
     * 
     * @param options The options necessary for the client.
     * @example const client = new Client({ token: "someToken" });
     */
    public constructor(options: ClientOptions) {
        if (typeof options.token == "string") {
            this.token = options.token;
            options.onReady?.();
        }

        this.onRefresh = options.onRefresh || NOOP;
        this.retryOnRateLimit = options.retryOnRateLimit ?? true;
        this.auth = new AuthManager(this.token);
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
            if (error.response.status == 429 && this.retryOnRateLimit) {
                const retryAfter = error.response.headers['Retry-After'];
                if (typeof retryAfter == "number") await new Promise(r => setTimeout(r, retryAfter * 1000));
                return this.fetch(url, options)
            } else throw new SpotifyAPIError(error);
        }
    }

}