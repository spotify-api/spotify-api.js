import { ClientOptions, FetchOptions } from "./Interface";
import { AuthManager } from "./managers/Auth";
/**
 * The basic client to interact with the Spotify Web API.
 */
export declare class Client {
    /**
     * The token of the spotify web client.
     */
    token: string;
    /**
     * The manager to perform actions regarding the authorization to the web api.
     */
    auth: AuthManager;
    /**
     * The version of spotify web api. For future purposes.
     */
    version: `v${number}`;
    /**
     * The refresh event of the client.
     */
    onRefresh: () => void;
    /**
     * The refresh token for the client.
     */
    refreshToken: string;
    /**
     * Boolean stating should the client retry when the request is rate limited or not by default it is true.
     */
    retryOnRateLimit?: boolean;
    /**
     * The basic client to interact with the Spotify Web API.
     *
     * @param options The options necessary for the client.
     * @example const client = new Client({ token: "someToken" });
     */
    constructor(options: ClientOptions);
    /**
     * Used to fetch data from spotify rest api.
     *
     * @param url The path from spotify api to fetch!
     * @param options The additional options required to fetch from the api.
     * @example await client.fetch('/users/id');
     */
    fetch(url: string, options?: FetchOptions): any;
}
