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
    Auth: any,
    User: any,
    Playlist: any,
    Track: any,
    Album: any,
    Artist: any
  };
  
  oauth: any;
  users: any;
  playlists: any;
  tracks: any;
  albums: any;
  artists: any;

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
