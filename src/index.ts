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
import CacheManager from './CacheManager';

import * as Interface from "./structures/Interface";

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
    Spotify as Util,
    CacheManager,
    Interface
};

import AlbumStructure from "./structures/Album";
import ArtistStructure from "./structures/Artist";
import EpisodeStructure from "./structures/Episode";
import PlaylistStructure, { PlaylistTrack } from "./structures/Playlist";
import TrackStructure, { LinkedTrack } from "./structures/Track";
import PublicUser from "./structures/PublicUser";
import ShowStructure from "./structures/Show";

export const Structures = {
    Track: TrackStructure,
    Album: AlbumStructure,
    Artist: ArtistStructure,
    Episode: EpisodeStructure,
    Playlist: PlaylistStructure,
    Show: ShowStructure,
    PlaylistTrack,
    PublicUser,
    LinkedTrack
};
  
export default Client;