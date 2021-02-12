/**
 * File where Client class exists...
 */
import AuthManager from './lib/Auth';
import UserManager from './lib/User';
import PlaylistManager from './lib/Playlist';
import TrackManager from './lib/Track';
import AlbumManager from './lib/Album';
import ArtistManager from './lib/Artist';
import EpisodeManager from './lib/Episode';
import ShowManager from './lib/Show';
import BrowseManager from './lib/Browse';
import Track from './structures/Track';
import Episode from './structures/Episode';
import Show from './structures/Show';
import Playlist from './structures/Playlist';
import Artist from './structures/Artist';
import Album from './structures/Album';
import User from './structures/User';
import { Category, RawObject, CacheOptions } from './structures/Interface';
import Spotify from './Spotify';
import UserClient from './UserClient';
import CacheManager from './CacheManager';
/**
 * **The Spotify Api Client**
 *
 * The class which collects all the spotiify api methods
 */
export default class Client {
    cacheOnReady: (err?: any) => void;
    token: string;
    utils: Spotify;
    startedAt: number;
    cacheOptions: CacheOptions;
    madeCache: boolean;
    oauth: AuthManager;
    users: UserManager;
    playlists: PlaylistManager;
    tracks: TrackManager;
    albums: AlbumManager;
    artists: ArtistManager;
    episodes: EpisodeManager;
    shows: ShowManager;
    browse: BrowseManager;
    user: UserClient;
    cache: {
        tracks: CacheManager<Track>;
        users: CacheManager<User>;
        categories: CacheManager<Category>;
        episodes: CacheManager<Episode>;
        shows: CacheManager<Show>;
        playlists: CacheManager<Playlist>;
        artists: CacheManager<Artist>;
        albums: CacheManager<Album>;
    };
    /**
     * The constructor of the main spotify class
     *
     * @param oauth Your spotify oauth token
     * @param cacheOptions Your cache options to set mostly all of the options are set to false
     * @example const Spotify = require('spotify-api.js');
     * const client = new Spotify.Client('oauth token');
     */
    constructor(oauth?: string, cacheOptions?: CacheOptions);
    /**
     * Private caching init function
     * @private
     */
    private makeCache;
    /**
     * Login to the client with a different token!
     *
     * @param token string
     * @example client.login(token);
     */
    login(token: string): void;
    /**
     * Returns the uptime of the client in ms
     * @readonly
     */
    get uptime(): number;
    /**
     * Search across spotify api!
     *
     * @param q Query
     * @param options Your options to selected
     * @example const search = await client.search('search', { limit: 10, type: ['track'] });
     */
    search(q: string, options?: {
        limit?: number;
        type?: ('track' | 'artist' | 'album' | 'playlist' | 'show' | 'episode')[];
        params?: any;
    }): Promise<any>;
    /**
     * Do a custom request on the spotify api
     *
     * @param path Path to request
     * @param options Options to request
     * @param callback Callback when request is over
     * @example client.request('v1/me', {}, (err, data) => {
     *     if(err) return console.error(err);
     *     if(data) {
     *         console.log('Success!');
     *         console.log(data);
     *     };
     * });
     */
    request(path: string, options: RawObject, callback: (err: any, data: any) => void): void;
}
