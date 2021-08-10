import { Client } from "./Client";

/**
 * All the spotify web api methods.
 */
export type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

/**
 * All the spotify element types
 */
export type SpotifyType = 'user' | 'episode' | 'playlist' | 'show' | 'track' | 'album' | 'artist';

/**
 * The auth identity to generate a token or the token itself.
 */
export type AuthIdentity = string | { clientID: string, clientSecret: string } | GetUserTokenOptions;

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
 * The structure of the spotify linked track object.
 */
export interface LinkedTrack {
    /** A map of url name and the url. */
    externalUrls: Record<string, string>;
    /** The api url where you can get the full details of the linked track. */
    href: string;
    /** The id of the linked track. */
    id: string;
    /** The type of spotify object. */
    type: SpotifyType;
    /** The uri of this object. */
    uri: string;
    /** A function which generates a code image for this linked track. */
    makeCodeImage(color?: string): string;
}