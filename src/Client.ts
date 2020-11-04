/**
 * File where Client class exists...
 */

import Auth from './lib/Auth';
import User from './lib/User';
import Playlist from './lib/Playlist';
import Track from './lib/Track';
import Album from './lib/Album';
import Artist from './lib/Artist'
import Search from './lib/Search';
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
    utils: any;
    
    auth: Auth;
    users: User;
    playlists: Playlist;
    tracks: Track;
    albums: Album;
    artists: Artist;
    episodes: Episode;
    shows: Show;
    browse: Browse;
    user: UserClient;

    search: any;

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

        this.auth = new Auth(this.token);
        this.users = new User(this.token);
        this.playlists = new Playlist(this.token);
        this.tracks = new Track(this.token);
        this.albums = new Album(this.token);
        this.artists = new Artist(this.token);
        this.episodes = new Episode(this.token);
        this.shows = new Show(this.token);
        this.browse = new Browse(this.token);
        this.user = new UserClient(this.token);

        this.search = Search(this.token);
    };
    
};
