import type { Episode, ExternalUrl, RecommendationSeed, SpotifyType } from "api-types";
import type { Track } from "./structures/Track";
import type { User } from "./structures/User";
import type { Playlist } from "./structures/Playlist";
import type { Artist } from './structures/Artist';
import type { Album } from './structures/Album';
import type { Show } from './structures/Show';
import type { Client } from "./Client";

/**
 * All the spotify web api methods.
 */
export type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

/**
 * All the spotify search types.
 */
export type SearchType = 'album' | 'artist' | 'track' |  'show' | 'episode';

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
    users?: boolean;
    /** Cache setting for spotify artists. */
    artists?: boolean;
    /** Cache setting for spotify tracks. */
    tracks?: boolean;
    /** Cache setting for spotify playlists. */
    playlists?: boolean;
    /** Cache setting for spotify albums. */
    albums?: boolean;
    /** Cache setting for spotify episodes. */
    episodes?: boolean;
    /** Cache setting for spotify shows. */
    shows?: boolean;
    /** Cache setting for spotify playlist tracks. */
    playlistTracks?: boolean;
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
    market?: string;
}

/** The linked track object for the [linkedFrom] field in [Track]. */
export interface LinkedTrack {
    /** A map of url name and the url. */
    externalURL: ExternalUrl;
    /** The id of the linked track. */
    id: string;
    /** The type of spotify object. */
    type: SpotifyType;
    /** The uri of this object. */
    uri: string;
}

/** The playlist track object. */
export interface PlaylistTrack {
    /** The date and time the track or episode was added.  */
    addedAt?: string;
    /** The Spotify user who added the track or episode. */
    addedBy?: User;
    /** Whether this track or episode is a local file or not. */
    isLocal: boolean;
    /** Information about the track or episode. */
    track: Track | Episode | null;
}

/** The object returned by [Browse.getFeaturedPlaylists] function. */
export interface FeaturedPlaylistContent {
    /** The message of the featured playlists. */
    message: string;
    /** The featured playlists. */
    playlists: Playlist[];
}

/**
 * The collection of recommendation seed objects with tracks provided from the spotify api.
 */
export interface Recommendations {
    /** An array of recommendation seed objects. */
    seeds: RecommendationSeed[];
    /** An array of track object (simplified) ordered according to the parameters supplied. */
    tracks: Track[];
}

/** The options structure for search functions in the client. */
export interface ClientSearchOptions extends SearchOptions {
    /** The list of item types to search across. */
    types: SearchType[];
}

/** The object structure returned by the [Client.search] function. */
export interface SearchContent {
    episodes?: Episode[];
    shows?: Show[];
    tracks?: Track[];
    artists?: Artist[];
    albums?: Album[];
}