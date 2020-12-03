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

import Spotify from './Spotify';
import UserClient from './UserClient';
import { SearchReturn } from "./structures/Interface";

import { MissingParamError, UnexpectedError } from './Error';

/**
 * **Client class**
 * 
 * The class which collects all the methods
 */
export default class {
      
    token: string;
    utils: Spotify;
    startedAt: number;
    
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

    /**
     * @param oauth Token
     * 
     * Pass the spotify oauth `token`
     * ```js
     * const Spotify = require('spotify-api.js')
     * const client = new Spotify.Client('oauth token')
     * ```
     */
    constructor(oauth?: string) {
        this.token = oauth || 'NO TOKEN';
        this.utils = new Spotify(this.token)
        this.startedAt = Date.now();

        this.oauth = new Auth(this.token);
        this.users = new User(this.token);
        this.playlists = new Playlist(this.token);
        this.tracks = new Track(this.token);
        this.albums = new Album(this.token);
        this.artists = new Artist(this.token);
        this.episodes = new Episode(this.token);
        this.shows = new Show(this.token);
        this.browse = new Browse(this.token);
        this.user = new UserClient(this.token);
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
        this.users = new User(this.token);
        this.playlists = new Playlist(this.token);
        this.tracks = new Track(this.token);
        this.albums = new Album(this.token);
        this.artists = new Artist(this.token);
        this.episodes = new Episode(this.token);
        this.shows = new Show(this.token);
        this.browse = new Browse(this.token);
        this.user = new UserClient(this.token);
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
    async search(
        q: string, 
        options: {
            limit?: number;
            type?: ('track' | 'artist' | 'album' | 'playlist' | 'show' | 'episode')[];
        } = {}
    ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if(!q) reject(new MissingParamError('missing query'));
            if(!options.type) options.type = ['track', 'album', 'artist', 'playlist', 'show', 'episode'];

            try{
                resolve(
                    await this.utils.fetch({
                        link: `v1/search`,
                        params: {
                            q: encodeURIComponent(q),
                            type: options.type.join(','),
                            market: "US",
                            limit: options.limit || 20,
                        },
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
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
    
};
