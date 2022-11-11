import axios, { Axios, AxiosError } from "axios";
import { SpotifyAPIError  } from "./Error";
import { AuthManager } from "./managers/Auth";
import { UserManager } from "./managers/User";
import { ArtistManager } from "./managers/Artist";
import { BrowseManager } from "./managers/Browse";
import { AlbumManager } from "./managers/Album";
import { EpisodeManager } from "./managers/Episode";
import { PlaylistManager } from "./managers/Playlist";
import { ShowManager } from "./managers/Show";
import { TrackManager } from "./managers/Track";
import { UserClient } from "./managers/UserClient";
import { createCacheStructArray } from "./Cache";

import type { 
    ClientOptions, 
    FetchOptions, 
    ClientRefreshMeta, 
    GetUserTokenOptions, 
    CacheSettings, 
    ClientSearchOptions, 
    SearchContent
} from "./Interface";

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
     * A manager to perform actions which belongs to the spotify user web api.
     */
    public users!: UserManager;

    /**
     * A manager to perform actions which belongs to the spotify artist web api.
     */
    public artists!: ArtistManager;

    /**
     * A manager to perform actions which belongs to the spotify browse web api.
     */
    public browse!: BrowseManager;

    /**
     * A manager to perform actions which belongs to the spotify album web api.
     */
    public albums!: AlbumManager;

    /**
     * A manager to perform actions which belongs to the spotify episode web api.
     */
    public episodes!: EpisodeManager;

    /**
     * A manager to perform actions which belongs to the spotify playlist web api.
     */
    public playlists!: PlaylistManager;

    /**
     * A manager to perform actions which belongs to the spotify show web api.
     */
    public shows!: ShowManager;

    /**
     * A manager to perform actions which belongs to the spotify track web api.
     */
    public tracks!: TrackManager;

    /**
     * The client which handles all the current user api endpoints and with the details of the current user.
     */
    public user!: UserClient;

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
    public refreshMeta?: ClientRefreshMeta;

    /** 
     * Boolean stating should the client retry when the request is rate limited or not by default it is true. 
     */
    public retryOnRateLimit?: boolean = true;

    /**
     * Cache settings for the client.
     */
    public cacheSettings: CacheSettings = {};

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
        this.users = new UserManager(this);
        this.artists = new ArtistManager(this);
        this.browse = new BrowseManager(this);
        this.albums = new AlbumManager(this);
        this.episodes = new EpisodeManager(this);
        this.playlists = new PlaylistManager(this);
        this.shows = new ShowManager(this);
        this.tracks = new TrackManager(this);
        this._init(options);

        if (typeof options.cacheSettings == "object") this.cacheSettings = options.cacheSettings;
        else if (options.cacheSettings == true) this.cacheSettings = {
            users: true,
            artists: true,
            tracks: true,
            episodes: true,
            shows: true,
            albums: true,
            playlists: true
        };
    }

    /**
     * Creates a client and returns it as promise when its ready.
     * 
     * @param options The same client options provided for the constructor but "onReady" and "onFail" fields should not be provided.
     * @example const client = await Client.create({ token: "token" });
     */
    public static create(options: Omit<ClientOptions, 'onReady' | 'onFail'>): Promise<Client> {
        return new Promise((onReady, onFail) => new Client({ ...options, onReady, onFail }));
    }

    /**
     * Search a query in spotify through web api across various types.
     * 
     * @param query The query to search.
     * @param options The types, limit, offset, market query paramaters.
     * @example const { tracks, albums } = await client.search('some query', { types: ['track', 'album'] });
     */
    public async search(query: string, options: ClientSearchOptions): Promise<SearchContent> {
        const response: SearchContent = {};
        const fetchedData = await this.fetch('/search', {
            params: {
                q: query,
                type: options.types.join(','),
                market: options.market,
                limit: options.limit,
                offset: options.offset,
                include_external: options.includeExternalAudio ? 'audio' : undefined
            }
        });

        if (fetchedData.albums) response.albums = createCacheStructArray('albums', this, fetchedData.albums.items);
        if (fetchedData.tracks) response.tracks = createCacheStructArray('tracks', this, fetchedData.tracks.items);
        if (fetchedData.episodes) response.episodes = createCacheStructArray('episodes', this, fetchedData.episodes.items);
        if (fetchedData.shows) response.shows = createCacheStructArray('shows', this, fetchedData.shows.items);
        if (fetchedData.artists) response.artists = createCacheStructArray('artists', this, fetchedData.artists.items);

        return response;
    }

    /**
     * Used to fetch data from spotify rest api.
     * 
     * @param url The path from spotify api to fetch!
     * @param options The additional options required to fetch from the api.
     * @example await client.fetch('/users/id');
     */
    public fetch(url: string, options: FetchOptions = {}) {
        return axios({
            url: `https://api.spotify.com/${this.version}${url}`,
            method: options.method || 'GET',
            params: options.params,
            headers: {
                Authorization: "Bearer " + this.token,
                Accept: 'application/json',
                ...options.headers
            },
            data: options.body
        }).then(response => response.data, async (error: AxiosError) => {
            if (!error.response) throw new SpotifyAPIError(error);
            else if (error.response.status == 404) return null;
            else if (error.response.status == 429 && this.retryOnRateLimit) {
                const retryAfter = error.response.headers['Retry-After'];
                if (typeof retryAfter == "number") await new Promise(r => setTimeout(r, retryAfter * 1000));
            } else if (
                // @ts-ignore
                error.response.data?.error?.message == "Invalid access token" ||
                // @ts-ignore
                error.response.data?.error?.message == "The access token expired" &&
                this.refreshMeta
            ) await this.refreshFromMeta();
            else throw new SpotifyAPIError(error);

            return this.fetch(url, options);
        });
    }

    /**
     * Refreshes the token from meta.
     */
    public async refreshFromMeta() {
        if (!this.refreshMeta) return;
        if ('refreshToken' in this.refreshMeta!) {
            this.auth.getUserToken(this.refreshMeta as GetUserTokenOptions)
                .then(context => {
                    this.token = context.accessToken;
                    if (context.refreshToken) this.refreshMeta!.refreshToken = context.refreshToken;

                    new UserClient(this).patchInfo().then(x => {
                        this.user = x;
                        this.onRefresh();
                    });
                });
        } else {
            this.auth.getApiToken(this.refreshMeta!.clientID, this.refreshMeta!.clientSecret)
                .then(token => {
                    this.token = token;
                    this.onRefresh();
                });
        }

        this.auth = new AuthManager(this.token);
    }

    /**
     * A function to initate the client through options and client options.
     */
    private async _init(options: ClientOptions) {
        if (!options.token) throw new SpotifyAPIError('No token was provided in [ClientOptions]');

        try {
            if (typeof options.token == "string") {
                if (options.refreshToken) console.trace("[SpotifyClientWarn]: You have provided a token and used `refreshToken` option. Try to provide clientID, clientSecret or user authenication details.");
                this.token = options.token;

                if (options.userAuthorizedToken) this.user = await new UserClient(this).patchInfo();
            } else if ('token' in options.token) {
                this.token = options.token.token;
                this.refreshMeta = options.token;

                if (options.userAuthorizedToken) this.user = await new UserClient(this).patchInfo();
            } else if (('redirectURL' in options.token) || ('refreshToken' in options.token)) {
                const context = await this.auth.getUserToken(options.token as GetUserTokenOptions);

                this.refreshMeta = options.token;
                if (context.refreshToken) this.refreshMeta.refreshToken = context.refreshToken;

                this.token = context.accessToken;
                this.user = await new UserClient(this).patchInfo();
            } else if ('clientID' in options.token) {
                this.refreshMeta = options.token;
                this.token = await this.auth.getApiToken(options.token.clientID, options.token.clientSecret);
            } else throw new SpotifyAPIError('Improper [ClientOptions] provided!.');

            options.onReady?.(this);
        } catch (error) {
            // Only possible error here that could be thrown is AxiosError from getApiToken and getUserToken.
            error = new SpotifyAPIError(error as AxiosError);
            if (options.onFail) options.onFail(error);
            else throw error;
        }
    }

}
