/**
 * File where exports all required only functions, classes
 */
import Client from './Client';
import Auth from './lib/Auth';
import User from './lib/User';
import Playlist from './lib/Playlist';
import Track from './lib/Track';
import Album from './lib/Album';
import Artist from './lib/Artist';
import Browse from './lib/Browse';
import Episode from './lib/Episode';
import Show from './lib/Show';
import Search from './lib/Search';
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
declare const version = "5.0.0";
export { version, Client, Auth, User, Playlist, Track, Album, Artist, Episode, Show, Browse, Search, UserClient, UserPlayer, Spotify as Util };
declare const _default: {
    version: string;
    Client: typeof Client;
    Auth: typeof Auth;
    User: typeof User;
    Playlist: typeof Playlist;
    Track: typeof Track;
    Album: typeof Album;
    Artist: typeof Artist;
    Episode: typeof Episode;
    Show: typeof Show;
    Browse: typeof Browse;
    Search: (token: string) => any;
    UserClient: typeof UserClient;
    UserPlayer: typeof UserPlayer;
    Util: typeof Spotify;
};
export default _default;
