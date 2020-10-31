/**
 * File where exports all required only functions, classes
 */

import Client from './Client'

import Auth from './lib/Oauth';
import User from './lib/User';
import Playlist from './lib/Playlist';
import Track from './lib/Track';
import Album from './lib/Album';
import Artist from './lib/Artist'
import Spotify from './Spotify';

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
const version = '4.1.0'
  
export { 
    version, 
    Client,
    Auth,
    User,
    Playlist,
    Track,
    Album,
    Artist,
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
    Util: Spotify
};