/**
 * File where exports all required only functions, classes
 */
import Client from './Client';
import Auth from './lib/Oauth';
import User from './lib/User';
import Playlist from './lib/Playlist';
import Track from './lib/Track';
import Album from './lib/Album';
import Artist from './lib/Artist';
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
declare const version = "4.1.0";
export { version, Client, Auth, User, Playlist, Track, Album, Artist, Spotify as Util };
declare const _default: {
    version: string;
    Client: typeof Client;
    Auth: typeof Auth;
    User: typeof User;
    Playlist: typeof Playlist;
    Track: typeof Track;
    Album: typeof Album;
    Artist: typeof Artist;
    Util: typeof Spotify;
};
export default _default;
