import Util from "./Util";
import Collection from "./utils/Collection";
import UserClient from "./UserClient";

import AuthManager, { AuthRefresh, GetUserTokenOptions } from "./managers/AuthManager";
import UserManager, { User } from './managers/UserManager';
import PlaylistManager, { Playlist } from "./managers/PlaylistManager";
import EpisodeManager, { Episode } from "./managers/EpisodeManager";
import ShowManager, { Show } from "./managers/ShowManager";
import BrowseManager, { Category } from "./managers/BrowseManager";
import TrackManager, { Track } from "./managers/TrackManager";
import AlbumManager, { Album } from "./managers/AlbumManager";
import ArtistManager, { Artist } from "./managers/ArtistManager";
import SearchManager, { SearchMethod } from "./managers/SearchManager";

/**
 * Client options to set!
 */
export interface ClientOptions{
    cacheTracks?: boolean;
    cacheUsers?: boolean;
    cacheCategories?: boolean;
    cacheEpisodes?: boolean;
    cacheShows?: boolean;
    cachePlaylists?: boolean;
    cacheArtists?: boolean;
    cacheAlbums?: boolean;
    cacheCurrentUser?: boolean;
    ready?: () => void;
}

/**
 * The main spotify client class!
 */
export default class Client{

    token: string;
    cacheOptions: Omit<ClientOptions, 'ready'>;
    onReady: () => void;

    cache: {
        users: Collection<User>;
        playlists: Collection<Playlist>;
        episodes: Collection<Episode>;
        shows: Collection<Show>;
        categories: Collection<Category>;
        tracks: Collection<Track>;
        albums: Collection<Album>;
        artists: Collection<Artist>;
    };

    util!: Util;
    auth!: AuthManager;
    users!: UserManager;
    playlists!: PlaylistManager;
    episodes!: EpisodeManager;
    shows!: ShowManager;
    browse!: BrowseManager;
    tracks!: TrackManager;
    albums!: AlbumManager;
    artists!: ArtistManager;
    search!: SearchMethod;

    user!: UserClient;

    /**
     * The main spotify client class!
     * 
     * @param token Your spotify oauth token
     * @example new Spotify.Client();
     */
    constructor(token: string = 'NO TOKEN', options: ClientOptions = {}){
        this.token = token;
        this.onReady = options.ready || (() => {});

        delete options.ready;
        this.cacheOptions = options;

        this.cache = {
            users: new Collection(),
            playlists: new Collection(),
            episodes: new Collection(),
            shows: new Collection(),
            categories: new Collection(),
            tracks: new Collection(),
            albums: new Collection(),
            artists: new Collection()
        }

        Object.defineProperty(this, 'util', { value: new Util(this.token), writable: true });
        Object.defineProperty(this, 'auth', { value: new AuthManager(this.token), writable: true });
        Object.defineProperty(this, 'users', { value: new UserManager(this) });
        Object.defineProperty(this, 'playlists', { value: new PlaylistManager(this) });
        Object.defineProperty(this, 'episodes', { value: new EpisodeManager(this) });
        Object.defineProperty(this, 'shows', { value: new ShowManager(this) });
        Object.defineProperty(this, 'browse', { value: new BrowseManager(this) });
        Object.defineProperty(this, 'tracks', { value: new TrackManager(this) });
        Object.defineProperty(this, 'albums', { value: new AlbumManager(this) });
        Object.defineProperty(this, 'artists', { value: new ArtistManager(this) });
        Object.defineProperty(this, 'search', { value: SearchManager(this) });
        Object.defineProperty(this, 'user', { value: new UserClient(this) });

        if(this.token != 'NO TOKEN'){
            if(this.cacheOptions.cacheCurrentUser) this.user.info().then(x => this.onReady());
            else this.onReady();
        }
    }

    /**
     * Relogin to the spotify client!
     * 
     * @param clientID Your spotify api client id or options to get user token
     * @param clientSecret Required only if you provide client id else optional for user token!
     * @example await client.login('client_id', 'client_secret'); // or 
     * await client.login({
     *    clientID: 'id',
     *    clientSecret: 'secret',
     *    code: 'code', // If attempting to get user token through authorization
     *    refreshToken: 'token', // If attempting to refresh token!
     *    redirectURL: 'url' // Needs to be the same what you have enetered while authorizing the token!
     * }) 
     */
    async login(token: string): Promise<void>;
    async login(clientID: string, clientSecret: string): Promise<void>;
    async login(options: GetUserTokenOptions): Promise<void | AuthRefresh>;
    async login(options: string | GetUserTokenOptions, clientSecret?: string): Promise<void | AuthRefresh> {
        if(typeof clientSecret == 'string'){
            this.token = await this.auth.getApiToken(options as string, clientSecret);
            this.util.token = this.token;
            this.auth.token = this.token;
            this.onReady();
        } else if(typeof options == 'string' && !clientSecret){
            this.token = options;
            this.util.token = this.token;
            this.auth.token = this.token;
            this.onReady();
        } else {
            const data = await this.auth.getUserToken(options as GetUserTokenOptions);
            this.token = data.accessToken;
            this.util.token = this.token;
            this.auth.token = this.token;
            if(this.cacheOptions.cacheCurrentUser) await this.user.info();
            this.onReady();
            return data;
        }
    }

}