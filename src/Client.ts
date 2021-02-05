/**
 * File where Client class exists...
 */

import AuthManager from './lib/Auth';
import UserManager from './lib/User';
import PlaylistManager from './lib/Playlist';
import TrackManager from './lib/Track';
import AlbumManager from './lib/Album';
import ArtistManager from './lib/Artist'
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

import { MissingParamError, UnexpectedError } from './Error';

const DefaultCacheOptions = {
    cacheTracks: false,
    cacheUsers: false,
    cacheCategories: false,
    cacheEpisodes: false,
    cacheShows: false,
    cachePlaylists: false,
    cacheArtists: false,
    cacheAlbums: false,
    cacheCurrentUser: false
};

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
        tracks: CacheManager<Track>,
        users: CacheManager<User>,
        categories: CacheManager<Category>,
        episodes: CacheManager<Episode>,
        shows: CacheManager<Show>,
        playlists: CacheManager<Playlist>,
        artists: CacheManager<Artist>,
        albums: CacheManager<Album>
    }

    /**
     * The constructor of the main spotify class
     * 
     * @param oauth Your spotify oauth token
     * @param cacheOptions Your cache options to set mostly all of the options are set to false
     * @example const Spotify = require('spotify-api.js');
     * const client = new Spotify.Client('oauth token');
     */
    constructor(oauth?: string, cacheOptions: CacheOptions = DefaultCacheOptions) {

        this.token = oauth || 'NO TOKEN';
        this.utils = new Spotify(this.token);
        this.startedAt = Date.now();
        this.cacheOptions = cacheOptions;
        this.cacheOnReady = () => {};
        this.madeCache = false;

        this.tracks = new TrackManager(this);
        this.user = new UserClient(this);
        this.oauth = new AuthManager(this.token);
        this.users = new UserManager(this);
        this.playlists = new PlaylistManager(this);
        this.albums = new AlbumManager(this);
        this.artists = new ArtistManager(this);
        this.episodes = new EpisodeManager(this);
        this.shows = new ShowManager(this);
        this.browse = new BrowseManager(this);

        this.cache = {
            tracks: new CacheManager<Track>('id'),
            users: new CacheManager<User>('id'),
            categories: new CacheManager<Category>('name'),
            episodes: new CacheManager<Episode>('id'),
            shows: new CacheManager<Show>('id'),
            playlists: new CacheManager<Playlist>('id'),
            artists: new CacheManager<Artist>('id'),
            albums: new CacheManager<Album>('id')
        };

        this.makeCache();

    };
    
    /**
     * Private caching init function
     * @private
     */
    private async makeCache(): Promise<void> {
        const reject = e => this.cacheOnReady(e);

        if(this.cacheOptions.cacheCurrentUser){
            try{
                await this.user.info();
            }catch(e){ reject(e) } 
        }

        this.cacheOnReady(null);
        this.madeCache = true;
    };

    /**
     * Login to the client with a different token!
     * 
     * @param token string
     * @example client.login(token);
     */
    login(token: string): void {
        if(!token) throw new MissingParamError('missing token');

        this.token = token;
        this.utils = new Spotify(this.token);
        this.startedAt = Date.now();
        this.madeCache = false;

        this.oauth = new AuthManager(this.token);
        this.users = new UserManager(this);
        this.playlists = new PlaylistManager(this);
        this.tracks = new TrackManager(this);
        this.albums = new AlbumManager(this);
        this.artists = new ArtistManager(this);
        this.episodes = new EpisodeManager(this);
        this.shows = new ShowManager(this);
        this.browse = new BrowseManager(this);
        this.user = new UserClient(this);

        this.makeCache();
    };

    /**
     * Returns the uptime of the client in ms
     * @readonly
     */
    get uptime(): number {
        return Date.now() - this.startedAt;
    };

    /**
     * Search across spotify api!
     * 
     * @param q Query
     * @param options Your options to selected
     * @example const search = await client.search('search', { limit: 10, type: ['track'] });
     */
    async search(q: string,  options: { limit?: number; type?: ('track' | 'artist' | 'album' | 'playlist' | 'show' | 'episode')[]; params?: any; } = {} ): Promise<any> {
        if(!q) throw new MissingParamError('missing query');
        if(!options.type) options.type = ['track', 'album', 'artist', 'playlist', 'show', 'episode'];

        try{
            return await this.utils.fetch({
                link: `v1/search?q=${encodeURIComponent(q)}&type=${options.type.join(',')}&market=US&limit=${options.limit || 20}`,
            })
        }catch(e){
            throw new UnexpectedError(e);
        };
    };

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
    request(
        path: string,
        options: RawObject,
        callback: (err: any, data: any) => void
    ): void {
        this.utils.fetch({ link: path, ...options  }).then(x => callback(null, x), x => callback(x, null))
    };
    
};
