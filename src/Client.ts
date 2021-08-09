import axios, { AxiosError, AxiosResponse } from "axios";
import { ClientOptions, FetchOptions } from "./Interface";

/**
 * The basic client to interact with the Spotify Web API.
 */
export class Client {

    /**
     * The token of the spotify web client.
     */
    public token!: string;

    /**
     * The version of spotify web api. For future purposes.
     */
    public version: `v${number}` = 'v1';

    /**
     * The basic client to interact with the Spotify Web API.
     * 
     * @param options The options necessary for the client.
     * @example const client = new Client({ token: "someToken" });
     */
    public constructor(options: ClientOptions | string) {
        if (typeof options == "string") this.token = options;
        else if (typeof options.token == "string") this.token = options.token;
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
            if (error.status == 429) {
                const retryAfter = error.headers['Retry-After'];
                if (typeof retryAfter == "number") await new Promise(r => setTimeout(r, retryAfter * 1000));
                return this.fetch(url, options)
            } else throw error;
        }
    }

}