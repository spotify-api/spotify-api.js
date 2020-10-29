import Auth from './lib/Oauth';
import User from './lib/User';
import Playlist from './lib/Playlist';
import Track from './lib/Track';
import Album from './lib/Album';
import Artist from './lib/Artist'

import Spotify from './Spotify';

export default class {
  
  token: string;
  utils: any;
  lib: {
    Auth,
    User,
    Playlist,
    Track,
    Album,
    Artist,
  };
  
  oauth: Auth;
  users: User;
  playlists: Playlist;
  tracks: Track;
  albums: Album;
  artists: Artist;

  /**
   * 
   * @param oauth {string} 
   * Pass the spotify oauth `token`
   * ```js
   * const Spotify = require('spotify-api.js')
   * const client = new Spotify.Client('oauth token')
   * ```
   */
  constructor(oauth: string) {
    this.token = oauth;
    this.utils = new Spotify(this.token)
    this.lib = {
      Auth, User, Playlist, Track, Album, Artist
    };

    this.oauth = new Auth(this.token);
    this.users = new User(this.token);
    this.playlists = new Playlist(this.token);
    this.tracks = new Track(this.token);
    this.albums = new Album(this.token);
    this.artists = new Artist(this.token);
  };
  
};
