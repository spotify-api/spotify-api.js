/**
 * All the spotify web api methods.
 */
export type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

/**
 * The options required for the Client.
 */
export interface ClientOptions {
    /** The ready event which is called when the token is aquired. */
    onReady?: () => void;
    /** The refresh which is called when there is a token refresh. */
    onRefresh?: () => void;
    /** Set true to refresh token if the token is needed to be acquired else put the refresh token here. */
    refreshToken?: boolean | string;
    /** Your spotify web api token. */
    token?: string;
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