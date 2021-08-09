import { Client } from "./Client";

/**
 * All the spotify web api methods.
 */
export type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

/**
 * The auth identity to generate a token or the token itself.
 */
export type AuthIdentity = string | { clientID: string, clientSecret: string };

/**
 * The options required for the Client.
 */
export interface ClientOptions {
    /** The ready event which is called when the token is aquired. */
    onReady?: (client: Client) => void;
    /** The refresh which is called when there is a token refresh. */
    onRefresh?: () => void;
    /** Set true to refresh token if the token is needed to be acquired if expired by default it is false. */
    refreshToken?: boolean;
    /** Your spotify web api token or some authenication details to generate one. */
    token: AuthIdentity;
    /** Boolean stating should the client retry when the request is rate limited or not by default it is true. */
    retryOnRateLimit?: boolean;
}

/** The options necessary for the fetch function in Client. */
export interface FetchOptions {
    /** The headers to apply. */
    headers?: Record<string, string>;
    /** The method type. */
    method?: Methods;
    /** Search query parameters. */
    params?: Record<string, string>;
    /** The json body to send if available. */
    body?: Record<string, string | boolean | number>;
}

/** The meta details for the client refresh meta. */
export interface ClientRefreshMeta {
    clientID: string;
    clientSecret: string;
    refreshToken?: string;
    redirectURI?: string;
}