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
declare const version = "5.0.0";
export { version, Client, Auth, User, Playlist, Track, Album, Artist, Episode, Show, Browse, UserClient, UserPlayer, Spotify as Util, CacheManager, Interface };
import AlbumStructure from "./structures/Album";
import ArtistStructure from "./structures/Artist";
import EpisodeStructure from "./structures/Episode";
import PlaylistStructure from "./structures/Playlist";
import TrackStructure, { LinkedTrack } from "./structures/Track";
import PublicUser from "./structures/PublicUser";
import ShowStructure from "./structures/Show";
import { PlaylistOwner, PlaylistTrack } from "./structures/PlaylistUtils";
import SimplifiedAlbum from "./structures/SimplifiedAlbum";
import SimplifiedArtist from "./structures/SimplifiedArtist";
import SimplifiedEpisode from "./structures/SimplifiedEpisode";
import SimplifiedPlaylist from "./structures/SimplifiedPlaylist";
import SimplifiedShow from "./structures/SimplifiedShow";
import SimplifiedTrack from "./structures/SimplifiedTrack";
export declare const Structures: {
    Track: typeof TrackStructure;
    Album: typeof AlbumStructure;
    Artist: typeof ArtistStructure;
    Episode: typeof EpisodeStructure;
    Playlist: typeof PlaylistStructure;
    Show: typeof ShowStructure;
    PlaylistOwner: typeof PlaylistOwner;
    PlaylistTrack: typeof PlaylistTrack;
    PublicUser: typeof PublicUser;
    LinkedTrack: typeof LinkedTrack;
    SimplifiedAlbum: typeof SimplifiedAlbum;
    SimplifiedArtist: typeof SimplifiedArtist;
    SimplifiedEpisode: typeof SimplifiedEpisode;
    SimplifiedPlaylist: typeof SimplifiedPlaylist;
    SimplifiedShow: typeof SimplifiedShow;
    SimplifiedTrack: typeof SimplifiedTrack;
};
export default Client;
