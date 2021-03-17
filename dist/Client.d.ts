import Util from "./Util";
import Collection from "./Collection";
import AuthManager, { GetUserTokenOptions } from "./managers/AuthManager";
import UserManager, { User } from './managers/UserManager';
import PlaylistManager, { Playlist } from "./managers/PlaylistManager";
import EpisodeManager, { Episode } from "./managers/EpisodeManager";
import ShowManager, { Show } from "./managers/ShowManager";
import BrowseManager, { Category } from "./managers/BrowseManager";
/**
 * Client options to set!
 */
export interface ClientOptions {
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
export default class Client {
    token: string;
    cacheOptions: Omit<ClientOptions, 'ready'>;
    onReady: () => void;
    cache: {
        users: Collection<User>;
        playlists: Collection<Playlist>;
        episodes: Collection<Episode>;
        shows: Collection<Show>;
        categories: Collection<Category>;
    };
    util: Util;
    auth: AuthManager;
    users: UserManager;
    playlists: PlaylistManager;
    episodes: EpisodeManager;
    shows: ShowManager;
    browse: BrowseManager;
    /**
     * The main spotify client class!
     *
     * @param token Your spotify oauth token
     * @example new Spotify.Client();
     */
    constructor(token?: string, options?: ClientOptions);
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
    login(clientID: string, clientSecret: string): Promise<void>;
    login(options: GetUserTokenOptions): Promise<void>;
}
