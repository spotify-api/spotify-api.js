import type { Episode, ExternalUrl, RecommendationSeed, SpotifyType, SearchType, Device, Cursor } from "spotify-types";
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
 * The auth identity to generate a token or the token itself.
 */
export type AuthIdentity = string 
    | { clientID: string, clientSecret: string } 
    | GetUserTokenOptions 
    | TokenWithRefreshOptions;

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
    /** The fail event which is called when something wrong happens in the client initialisation. */
    onFail?: (error) => void;
    /** The refresh which is called when there is a token refresh. */
    onRefresh?: () => void;
    /** Set true to refresh token if the token is needed to be acquired if expired by default it is false. */
    refreshToken?: boolean;
    /** Your spotify web api token or some authenication details to generate one. */
    token: AuthIdentity;
    /** If the token provided is a string and is user authroized set this to true. */
    userAuthorizedToken?: boolean;
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
    body?: Record<string, string | boolean | number | (string | boolean | number)[]>;
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
 * Option structure to supply the access token with the refresh options.
 */
export interface TokenWithRefreshOptions extends ClientRefreshMeta {
    /** The access token which has already been obtained from the api. */
    token: string;
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
    refreshToken?: string;
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
    /** The episode search results. */
    episodes?: Episode[];
    /** The show search results. */
    shows?: Show[];
    /** The track search results. */
    tracks?: Track[];
    /** The artists search results. */
    artists?: Artist[];
    /** the album search results. */
    albums?: Album[];
}

/** The options structure required for [PlaylistManager.reorderItems] function. */
export interface PlaylistReorderOptions {
    /** The uris of the tracks or episodes. */
    uris?: string[];
    /** The position of the first item to be reordered. */
    rangeStart?: number;
    /** The position where the items should be inserted. */
    insertBefore?: number;
    /** The amount of items to be reordered. */
    rangeLength?: number;
    /** The playlist’s snapshot ID against which you want to make the changes. */
    snapshotID?: string;
}

/** The saved object type. */
export interface Saved<T> {
    /** The timestamp when the item was added at. */
    addedAt: number;
    /** The saved item. */
    item: T;
}

/** The context object of the player. */
 export interface PlayerContext {
    /** External URLs for this context. */
    externalURL: ExternalUrl;
    /** A link to the Web API endpoint providing full details of the track. */
    href: string;
    /** The object type. */
    type: SpotifyType;
    /** The Spotify URI for the context. */
    uri: string;
}

/** The recently played object which is returned by the [Player.getRecentlyPlayed] function. */
export interface RecentlyPlayed {
    /** The cursors to check other pages of recently played. */
    cursors: Cursor;
    /** The items which have been recently played. */
    items: {
        /** The track which has been played recently. */
        track: Track,
        /** The timestamp when it was played. */
        playedAt: string
    }[];
}

/** The current playback returned by the [Player.getCurrentPlayback] function. */
export interface CurrentPlayback extends CurrentlyPlaying {
    shuffleState: boolean;
    repeatState: 'track' | 'off' | 'context';
    device: CamelCaseObjectKeys<Device>;
}

/** The object structure containg the details of the currently playing which is returned by [Player.getCurrentlyPlaying] function. */
export interface CurrentlyPlaying {
    timestamp: number;
    progress: number;
    isPlaying: boolean;
    currentPlayingType: string;
    item: Track | Episode | null;
    context: PlayerContext | null;
}

/**
 * The scopes for the user authorization process.
 * @see https://developer.spotify.com/documentation/general/guides/scopes/
 */
export enum Scopes {
    /** Write access to user-provided images. */
    ImageUpload = "ugc-image-upload",
    /** Read access to a user’s recently played tracks. */
    ReadRecentlyPlayed = "user-read-recently-played",
    /** Read access to a user’s player state. */
    ReadPlaybackState = "user-read-playback-state",
    /** Read access to a user's top artists and tracks. */
    ReadTopArtistsAndUsers = "user-top-read",
    /** Remote control playback of Spotify. This scope is currently available to Spotify iOS and Android SDKs. */
    RemoteControl = "app-remote-control",
    /** Write access to a user's public playlists. */
    ModifyPublicPlaylists = "playlist-modify-public",
    /** Write access to a user’s playback state */
    WritePlaybackState = "user-modify-playback-state",
    /** Write access to a user's private playlists. */
    ModifyPrivatePlaylists = "playlist-modify-private",
    /** Read access to user's private playlists. */
    ReadPrivatePlaylists = "playlist-read-private",
    /** Write/delete access to the list of artists and other users that the user follows. */
    ModifyFollowers = "user-follow-modify",
    /** Read access to the list of artists and other users that the user follows. */
    ReadFollowers = "user-follow-read",
    /** Read access to a user’s currently playing content. */
    ReadCurrentlyPlaying = "user-read-currently-playing",
    /** Write/delete access to a user's "Your Music" library. */
    ModifyUserLibrary = "user-library-modify",
    /** Read access to a user's library. */
    ReadUserLibrary = "user-library-read",
    /** Read access to a user’s playback position in a content. */
    ReadPlaybackPosition = "user-read-playback-position",
    /** Read access to user’s email address. */
    ReadUserEmail = "user-read-email",
    /** Read access to user’s subscription details (type of user account). */
    ReadUserPrivateDetails = "user-read-private",
    /** Include collaborative playlists when requesting a user's playlists. */
    ReadCollaborativePlaylists = "playlist-read-collaborative",
    /** Control playback of a Spotify track. This scope is currently available to the Web Playback SDK. The user must have a Spotify Premium account. */
    Streaming = "streaming"
}

/**
 * The time range type from the spotify api used for the [/me/top/{type}] endpoint.
 */
export enum TimeRange {
    /** Time range of several years. */
    Long = "long_term",
    /** Time range of 6 months. */
    Medium = "medium_term",
    /** Time range of 4 weeks. */
    Short = "short_term"
}