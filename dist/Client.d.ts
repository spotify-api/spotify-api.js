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
import Spotify from './Spotify';
import UserClient from './UserClient';
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
    constructor(oauth?: string);
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
     * const search = await client.search('search', { limit: 10, search: ['track'] });
     * ```
     *
     * @param q Query
     * @param options Your options to selected
     */
    search(q: string, options?: {
        limit?: number;
        type?: ('track' | 'artist' | 'album' | 'playlist' | 'show' | 'episode')[];
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
    request(path: string, options: {
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        params?: any;
        headers?: any;
    }, callback: (err: any, data: any) => void): void;
}
