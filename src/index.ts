/**
 * File where exports all required only functions, classes
 */

import Client from './Client'

import Auth from './lib/Auth';
import User from './lib/User';
import Playlist from './lib/Playlist';
import Track from './lib/Track';
import Album from './lib/Album';
import Artist from './lib/Artist'
import Browse from './lib/Browse';
import Episode from './lib/Episode';
import Show from './lib/Show';

import Spotify from './Spotify';
import UserClient from './UserClient';
import UserPlayer from './UserPlayer';

/**
 * To view up the version of the package.
 * 
 * **Example:**
 * ```js
 * const spotify = require('spotify-api.js');
 * console.log(spotify.version);
 * ```
 * 
 * Always try to update your spotify-api.js to v4.x.x
 */
const version = '5.0.0'
  
export { 
    version, 
    Client,
    Auth,
    User,
    Playlist,
    Track,
    Album,
    Artist,
    Episode,
    Show,
    Browse,
    UserClient,
    UserPlayer,
    Spotify as Util
};
  
export default { 
    version, 
    Client,
    Auth,
    User,
    Playlist,
    Track,
    Album,
    Artist,
    Episode,
    Show,
    Browse,
    UserClient,
    UserPlayer,
    Util: Spotify
};