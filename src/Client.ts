import Util from "./Util";
import Collection from "./Collection";
import AuthManager, { GetUserTokenOptions } from "./managers/AuthManager";
import UserManager, { User } from './managers/UserManager';
import PlaylistManager, { Playlist } from "./managers/PlaylistManager";
import EpisodeManager, { Episode } from "./managers/EpisodeManager";
import ShowManager, { Show } from "./managers/ShowManager";
import BrowseManager, { Category } from "./managers/BrowseManager";
import TrackManager, { Track } from "./managers/TrackManager";

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
    };

    util!: Util;
    auth!: AuthManager;
    users!: UserManager;
    playlists!: PlaylistManager;
    episodes!: EpisodeManager;
    shows!: ShowManager;
    browse!: BrowseManager;
    tracks!: TrackManager;

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
            tracks: new Collection()
        }

        Object.defineProperty(this, 'util', { value: new Util(this.token), writable: true });
        Object.defineProperty(this, 'auth', { value: new AuthManager(this.token), writable: true });
        Object.defineProperty(this, 'users', { value: new UserManager(this) });
        Object.defineProperty(this, 'playlists', { value: new PlaylistManager(this) });
        Object.defineProperty(this, 'episodes', { value: new EpisodeManager(this) });
        Object.defineProperty(this, 'shows', { value: new ShowManager(this) });
        Object.defineProperty(this, 'browse', { value: new BrowseManager(this) });
        Object.defineProperty(this, 'tracks', { value: new TrackManager(this) });
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
    async login(clientID: string, clientSecret: string): Promise<void>;
    async login(options: GetUserTokenOptions): Promise<void>;
    async login(options: string | GetUserTokenOptions, clientSecret?: string): Promise<void> {
        if(typeof clientSecret == 'string'){
            this.token = await this.auth.getApiToken(options as string, clientSecret);
        } else {
            this.token = (await this.auth.getUserToken(options as GetUserTokenOptions)).accessToken;
        }

        this.util.token = this.token;
        this.auth.token = this.token;
    }

}