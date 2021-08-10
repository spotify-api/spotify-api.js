import { Client } from "./Client";
import type { SpotifyType } from "api-types";

/**
 * All the spotify web api methods.
 */
export type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

/**
 * The auth identity to generate a token or the token itself.
 */
export type AuthIdentity = string | { clientID: string, clientSecret: string } | GetUserTokenOptions;

/**
 * Converts a string type into camelcase.
 */
export type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;

/**
 * Converts an object with camel case keys.
 */
export type CamelCaseObjectKeys<T> = {
    [K in keyof T as CamelCase<string &K>]: T[K]
};

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
    /** The cache settings for the client. */
    cacheSettings?: CacheSettings | boolean;
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
    params?: Record<string, any>;
    /** The json body to send if available. */
    body?: Record<string, string | boolean | number>;
}

/** The meta details for the client refresh meta. */
export interface ClientRefreshMeta {
    /** The spotify application client id. */
    clientID: string;
    /** The spotify application client secret. */
    clientSecret: string;
    /** The refresh token if available. */
    refreshToken?: string;
    /** The redirect url provided for authenication if available. */
    redirectURL?: string;
}

/**
 * Option structure required to get user token.
 */
export interface GetUserTokenOptions {
    /** The spotify application client id. */
    clientID: string;
    /** The spotify application client secret. */
    clientSecret: string;
    /** The refresh token if available. */
    refreshToken?: string;
    /** The redirect url provided for the authenication. */
    redirectURL: string;
    /** The code query acquired from the authorization if available. */
    code?: string;
}

/**
 * The context containing the details of the spotify user token.
 */
export interface UserTokenContext {
    /** The actual access token. */
    accessToken: string;
    /** Token type. Probably 'Bearer'. */
    tokenType: string;
    /** The duration in seconds in which the token will expire. */
    expiresIn: number;
    /** The refresh token to get a new one after the actual one expired. */
    refreshToken: string;
    /** The scopes to get the token. */
    scope: string;
}

/**
 * The settings of the cache for the ClientOptions.
 */
export interface CacheSettings {
    /** Cache setting for spotify users. */
    users: boolean;
    /** Cache setting for spotify artists. */
    artists: boolean;
}

/** The options structure for search functions in the various managers. */
export interface SearchOptions {
    /** If true, the response will include any relevant audio content that is hosted externally. */
    includeExternalAudio?: boolean;
    /** The offset index of the results. */
    offset?: number;
    /** The limit of the results. */
    limit?: number;
    /** If a country code is specified, only content that is playable in that market is returned. */
    market?: number;
}