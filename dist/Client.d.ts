/**
 * File where Client class exists...
 */
import Auth from './lib/Auth';
import User from './lib/User';
import Playlist from './lib/Playlist';
import Track from './lib/Track';
import Album from './lib/Album';
import Artist from './lib/Artist';
import Episode from './lib/Episode';
import Show from './lib/Show';
import Browse from './lib/Browse';
import TrackStructure from './structures/Track';
import EpisodeStructure from './structures/Episode';
import ShowStructure from './structures/Show';
import PlaylistStructure from './structures/Playlist';
import ArtistStructure from './structures/Artist';
import AlbumStructure from './structures/Album';
import PublicUser from './structures/PublicUser';
import { Category, RawObject } from './structures/Interface';
import Spotify from './Spotify';
import UserClient from './UserClient';
import CacheManager from './CacheManager';
interface CacheOptions {
    cacheTracks?: boolean;
    cacheUsers?: boolean;
    cacheCategories?: boolean;
    cacheEpisodes?: boolean;
    cacheShows?: boolean;
    cachePlaylists?: boolean;
    cacheArtists?: boolean;
    cacheAlbums?: boolean;
    cacheCurrentUser?: boolean;
    cacheFollowers?: boolean | null;
}
/**
 * **Client class**
 *
 * The class which collects all the methods
 */
export default class Client {
    private cacheOnReady;
    token: string;
    utils: Spotify;
    startedAt: number;
    cacheOptions: CacheOptions;
    oauth: Auth;
    users: User;
    playlists: Playlist;
    tracks: Track;
    albums: Album;
    artists: Artist;
    episodes: Episode;
    shows: Show;
    browse: Browse;
    user: UserClient;
    cache: {
        tracks: CacheManager<string, TrackStructure>;
        users: CacheManager<string, PublicUser>;
        categories: CacheManager<string, Category>;
        episodes: CacheManager<string, EpisodeStructure>;
        shows: CacheManager<string, ShowStructure>;
        playlists: CacheManager<string, PlaylistStructure>;
        artists: CacheManager<string, ArtistStructure>;
        albums: CacheManager<string, AlbumStructure>;
    };
    /**
     * @param oauth Token
     *
     * Pass the spotify oauth `token`
     * ```js
     * const Spotify = require('spotify-api.js')
     * const client = new Spotify.Client('oauth token')
     * ```
     */
    constructor(oauth?: string, cacheOptions?: CacheOptions);
    /**
     * Private caching init function
     */
    private makeCache;
    /**
     * **Example:**
     * ```js
     * client.login('token');
     * ```
     *
     * @param token string
     */
    login(token: string): void;
    /**
     * Uptime of the client
     */
    get uptime(): number;
    /**
     * **Example:**
     * ```js
     * const search = await client.search('search', { limit: 10, type: ['track'] });
     * ```
     *
     * @param q Query
     * @param options Your options to selected
     */
    search(q: string, options?: {
        limit?: number;
        type?: ('track' | 'artist' | 'album' | 'playlist' | 'show' | 'episode')[];
        params?: any;
    }): Promise<any>;
    /**
     * **Example:**
     * ```js
     * client.request('me', {}, (err, data) => {
     *     if(err) return console.error(err);
     *     if(data) {
     *         console.log('Success!');
     *         console.log(data);
     *     };
     * });
     * ```
     *
     * @param path Path to request
     * @param options Options to request
     * @param callback Callback when request is over
     */
    request(path: string, options: RawObject, callback: (err: any, data: any) => void): void;
    /**
     * **Example:**
     *
     * ```js
     * let uriInfo = await client.getByURI("spotify:album:0sNOF9WDwhWunNAHPD3Baj");
     * ```
     *
     * @param uri Uri
     * @param force If true then will directly fetch instead of searching cache
     */
    getByURI(uri: string, force?: boolean): Promise<any>;
}
export {};
