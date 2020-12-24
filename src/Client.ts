/**
 * File where Client class exists...
 */

import Auth from './lib/Auth';
import User from './lib/User';
import Playlist from './lib/Playlist';
import Track from './lib/Track';
import Album from './lib/Album';
import Artist from './lib/Artist'
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
import { Category } from './structures/Interface';

import Spotify from './Spotify';
import UserClient from './UserClient';
import CacheManager from './CacheManager';

import { MissingParamError, UnexpectedError } from './Error';

interface CacheOptions{
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

const DefaultCacheOptions = {
    cacheTracks: false,
    cacheUsers: false,
    cacheCategories: false,
    cacheEpisodes: false,
    cacheShows: false,
    cachePlaylists: false,
    cacheArtists: false,
    cacheAlbums: false,
    cacheCurrentUser: false,
    cacheFollowers: null
};

/**
 * **Client class**
 * 
 * The class which collects all the methods
 */
export default class Client {

    private cacheOnReady: (err?: any) => void;
      
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
        tracks: CacheManager<string, TrackStructure>,
        users: CacheManager<string, PublicUser>,
        categories: CacheManager<string, Category>,
        episodes: CacheManager<string, EpisodeStructure>,
        shows: CacheManager<string, ShowStructure>,
        playlists: CacheManager<string, PlaylistStructure>,
        artists: CacheManager<string, ArtistStructure>,
        albums: CacheManager<string, AlbumStructure>
    }

    /**
     * @param oauth Token
     * 
     * Pass the spotify oauth `token`
     * ```js
     * const Spotify = require('spotify-api.js')
     * const client = new Spotify.Client('oauth token')
     * ```
     */
    constructor(oauth?: string, cacheOptions: CacheOptions = DefaultCacheOptions) {

        this.token = oauth || 'NO TOKEN';
        this.utils = new Spotify(this.token)
        this.startedAt = Date.now();
        this.cacheOptions = cacheOptions;
        this.cacheOnReady = () => {};

        this.tracks = new Track(this.token, this);
        this.user = new UserClient(this.token, this);
        this.oauth = new Auth(this.token);
        this.users = new User(this.token, this);
        this.playlists = new Playlist(this.token, this);
        this.albums = new Album(this.token, this);
        this.artists = new Artist(this.token, this);
        this.episodes = new Episode(this.token, this);
        this.shows = new Show(this.token, this);
        this.browse = new Browse(this.token, this);

        this.cache = {
            tracks: new CacheManager<string, TrackStructure>('id'),
            users: new CacheManager<string, PublicUser>('id'),
            categories: new CacheManager<string, Category>('name'),
            episodes: new CacheManager<string, EpisodeStructure>('id'),
            shows: new CacheManager<string, ShowStructure>('id'),
            playlists: new CacheManager<string, PlaylistStructure>('id'),
            artists: new CacheManager<string, ArtistStructure>('id'),
            albums: new CacheManager<string, AlbumStructure>('id')
        };

        this.makeCache();

    };
    
    /**
     * Private caching init function
     */
    private async makeCache(): Promise<void> {
        const reject = e => this.cacheOnReady(e);

        if(this.cacheOptions.cacheCurrentUser){
            try{
                await this.user.info();
            }catch(e){ reject(e) } 
        }

        if((this.cacheOptions.cacheCurrentUser && this.cacheOptions.cacheFollowers == null) || this.cacheOptions.cacheFollowers) {
            try{
                await this.user.getFollowers();
                await this.user.getFollowers('artist');
            }catch(e){ reject(e) }
        }

        this.cacheOnReady(null);
    };

    /**
     * **Example:**
     * ```js
     * client.login('token');
     * ```
     * 
     * @param token string
     */
    login(token: string): void {
        if(!token) throw new MissingParamError('missing token');

        this.token = token;
        this.utils = new Spotify(this.token);
        this.startedAt = Date.now();

        this.oauth = new Auth(this.token);
        this.users = new User(this.token, this);
        this.playlists = new Playlist(this.token, this);
        this.tracks = new Track(this.token, this);
        this.albums = new Album(this.token, this);
        this.artists = new Artist(this.token, this);
        this.episodes = new Episode(this.token, this);
        this.shows = new Show(this.token, this);
        this.browse = new Browse(this.token, this);
        this.user = new UserClient(this.token, this);
    };

    /**
     * Uptime of the client
     */
    get uptime(): number {
        return Date.now() - this.startedAt;
    };

    /**
     * **Example:**
     * ```js
     * const search = await client.search('search', { limit: 10, type: ['track'] });
     * ```
     * 
     * @param q Query
     * @param options Your options to selected
     */
    async search(q: string,  options: { limit?: number; type?: ('track' | 'artist' | 'album' | 'playlist' | 'show' | 'episode')[]; params?: any; } = {} ): Promise<any> {
        if(!q) throw new MissingParamError('missing query');
        if(!options.type) options.type = ['track', 'album', 'artist', 'playlist', 'show', 'episode'];

        try{
            return await this.utils.fetch({
                link: `v1/search`,
                params: {
                    q,
                    type: options.type.join(','),
                    market: "US",
                    limit: options.limit || 20,
                },
            })
        }catch(e){
            throw new UnexpectedError(e);
        };
    };

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
    request(
        path: string,
        options: {
            method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
            params?: any;
            headers?: any;
        },
        callback: (err: any, data: any) => void
    ): void {
        this.utils.fetch({
            link: path,
            ...options
        })
        .then(x => callback(null, x))
        .catch(x => callback(x, null))
    };

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
    async getByURI(uri: string, force: boolean = false): Promise<any> {
        if(!uri.match(/spotify\:(track|album|artist|episode|show|user)\:(.*?)/g)) throw new TypeError('Invalid uri form');
        let split = uri.split(':');
        let id = split[2];

        switch(split[1]) {
            case 'album': return await this.albums.get(id, force);
            case 'artist': return await this.artists.get(id, force);
            case 'episode': return await this.episodes.get(id, force);
            case 'show': return await this.shows.get(id, force);
            case 'user': return await this.users.get(id, force);
            case 'track': return await this.tracks.get(id, force);
            default: throw new Error('Invalid uri form');
        };
        
    };
    
};
