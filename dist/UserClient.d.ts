import Auth from './lib/Auth';
import { AffinityOptions, ExplicitContent, Image, LimitOffsetOptions } from "./structures/Interface";
import Client from "./Client";
import Spotify from "./Spotify";
import UserPlayer from "./UserPlayer";
import Artist from "./structures/Artist";
import Track from "./structures/Track";
import Playlist from "./structures/Playlist";
import Album from "./structures/Album";
import Show from "./structures/Show";
import CacheManager from "./CacheManager";
import User from "./structures/PublicUser";
/**
 * User client class which can be used to access user client only
 * You can still access this by Client class but this class
 * needs a scoped token only
 */
declare class UserClient extends Spotify {
    readonly client: Client;
    auth: Auth;
    player: UserPlayer;
    startedAt: number;
    playlists: CacheManager<string, Playlist>;
    albums: CacheManager<string, Album>;
    shows: CacheManager<string, Show>;
    tracks: CacheManager<string, Track>;
    followers: {
        users: CacheManager<string, User>;
        artists: CacheManager<string, Artist>;
    };
    country: string | null;
    name: string | null;
    externalUrls: any;
    totalFollowers: number | null;
    href: string | null;
    id: string | null;
    images: Image[];
    product: string | null;
    uri: string | null;
    explicitContent?: ExplicitContent;
    email?: string;
    /**
     * **Example:**
     * ```js
     * const user = new UserClient('token');
     * ```
     * @param token Scoped token
     * @param client Spotify Client
     */
    constructor(token: string | undefined, client: Client);
    /**
     * **Example"**
     * ```js
     * user.uptime
     * ```
     *
     * Uptime of the user client
     */
    get uptime(): number;
    /**
     * **Example"**
     * ```js
     * const info = await user.info();
     * ```
     *
     * Returns the user information
     */
    info(): Promise<UserClient>;
    /**
     * **Example"**
     * ```js
     * const topArtists = await user.getTopArtists();
     * ```
     *
     * Top artists based on your affinity
     *
     * @param options AffinityOptions
     */
    getTopArtists(options?: AffinityOptions): Promise<Artist[]>;
    /**
     * **Example"**
     * ```js
     * const topTracks = await user.getTopTracks();
     * ```
     *
     * Top tracks based on your affinity
     *
     * @param options AffinityOptions
     */
    getTopTracks(options?: AffinityOptions): Promise<Track[]>;
    /**
     * **Example:**
     * ```js
     * const tracks = await user.getAffinity('track');
     * const artists = await user.getAffinity('track');
     * ```
     *
     * Aliases function for user.getTopTracks user.getTopArtists
     *
     * @param type Affinity type
     */
    getAffinity(type: 'track' | 'artist', options?: AffinityOptions): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const playlists = user.getPlaylists()
     * ```
     *
     * Returns your saved playlists
     *
     * @param options Options to configure results
     * @param force If true then will directly fetch instead of caching
     */
    getPlaylists(options?: LimitOffsetOptions, force?: boolean): Promise<Playlist[]>;
    /**
     * **Example:**
     * ```js
     * const albums = await user.getAlbums();
     * ```
     *
     * Returns your saved albums
     *
     * @param options Options to configure results
     * @param force If true then will directly fetch instead of caching
     */
    getAlbums(options?: LimitOffsetOptions, force?: boolean): Promise<Album[]>;
    /**
     * **Example:**
     * ```js
     * const shows = await user.getShows();
     * ```
     *
     * Returns your saved shows
     *
     * @param options Options to configure your results
     * @param force If true then will directly fetch instead of caching
     */
    getShows(options?: LimitOffsetOptions, force?: boolean): Promise<Show[]>;
    /**
     * **Example:**
     * ```js
     * const tracks = await user.getTracks();
     * ```
     *
     * Returns user's saved tracks
     *
     * @param options Configure your options
     * @param force If true then will directly fetch instead of searching in cache
     */
    getTracks(options?: LimitOffsetOptions, force?: boolean): Promise<Track[]>;
    /**
     * **Example:**
     * ```js
     * user.deleteAlbum('id');
     * user.deleteAlbum(['id1', 'id2', 'id3']);
     * ```
     *
     * Deletes your saved album
     *
     * @param id Id of the album or albums
     */
    deleteAlbum(id: string | string[]): Promise<void>;
    /**
     * **Example:**
     * ```js
     * user.deleteTrack('id');
     * user.deleteTrack(['id1', 'id2', 'id3']);
     * ```
     *
     * Deletes your saved track
     *
     * @param id Id of the track or tracks
     */
    deleteTrack(id: string | string[]): Promise<void>;
    /**
     * **Example:**
     * ```js
     * user.deleteShow('id');
     * user.deleteShow(['id1', 'id2', 'id3']);
     * ```
     *
     * Deletes your saved show
     *
     * @param id Id of the show or shows
     */
    deleteShow(id: string | string[]): Promise<void>;
    /**
     * **Example:**
     * ```js
     * user.addAlbum('id');
     * user.addAlbum(['id1', 'id2', 'id3']);
     * ```
     *
     * Saves a new album
     *
     * @param id Id of the album or albums
     */
    addAlbum(id: string | string[]): Promise<void>;
    /**
     * **Example:**
     * ```js
     * user.addTrack('id');
     * user.addTrack(['id1', 'id2', 'id3']);
     * ```
     *
     * Saves a new track
     *
     * @param id Id of the track or tracks
     */
    addTrack(id: string | string[]): Promise<void>;
    /**
     * **Example:**
     * ```js
     * user.addShow('id');
     * user.addShow(['id1', 'id2', 'id3']);
     * ```
     *
     * Saves a new show
     *
     * @param id Id of the track or tracks
     */
    addShow(id: string | string[]): Promise<void>;
    /**
     * **Example:**
     * ```js
     * user.followsUser('id');
     * user.followsUser('id1', 'id2', 'id3'); // For multiple verification
     * ```
     *
     * Verify if the current user follows the user
     *
     * @param ids All ids of the user to verify!
     */
    followsUser(...ids: string[]): Promise<boolean[]>;
    /**
     * **Example:**
     * ```js
     * user.followsArtist('id');
     * user.followsArtist('id1', 'id2', 'id3'); // For multiple verification
     * ```
     *
     * Verify if the current user follows the artist
     *
     * @param ids All ids of the artists to verify!
     */
    followsArtist(...ids: string[]): Promise<boolean[]>;
    /**
     * **Example:**
     * ```js
     * const followsUser = await user.follows('user', 'id', 'id2');
     * const followsArtist = await user.follows('artist', 'id', 'id2')
     * ```
     *
     * Verify if the current user follows the user or artist
     *
     * @param type Type could be artist or user which will state that whose id you have provided artist or user?
     * @param ids Ids of the user or artist
     */
    follows(type: 'artist' | 'user', ...ids: string[]): Promise<boolean[]>;
    /**
     * **Example:**
     * ```js
     * user.followUser('id');
     * user.followUser('id1', 'id2', 'id3'); // To follow many
     * ```
     *
     * @param ids Ids of the user or users
     */
    followUser(...ids: string[]): Promise<void>;
    /**
     * **Example:**
     * ```js
     * user.followPlaylist('id');
     * ```
     *
     * @param id Id of the playlist
     */
    followPlaylist(id: string): Promise<void>;
    /**
     * **Example:**
     * ```js
     * user.followArtist('id');
     * user.followArtist('id1', 'id2', 'id3'); // To follow many
     * ```
     *
     * @param ids Ids of the artist or artists
     */
    followArtist(...ids: string[]): Promise<void>;
    /**
     * Aliases of the followUser followPlaylist and followArtist
     *
     * @param type Type of the id. User, Artist or Playlist
     * @param ids Ids of the user or artist. Only 1 id can be used to follow playlist
     */
    follow(type?: 'user' | 'artist' | 'playlist', ...ids: string[]): Promise<void>;
    /**
     * **Example:**
     * ```js
     * user.unfollowUser('id');
     * user.unfollowUser('id1', 'id2', 'id3'); // To follow many
     * ```
     *
     * @param ids Ids of the user or users
     */
    unfollowUser(...ids: string[]): Promise<void>;
    /**
     * **Example:**
     * ```js
     * user.unfollowPlaylist('id');
     * ```
     *
     * @param id Id of the playlist
     */
    unfollowPlaylist(id: string): Promise<void>;
    /**
     * **Example:**
     * ```js
     * user.unfollowArtist('id');
     * user.unfollowArtist('id1', 'id2', 'id3'); // To follow many
     * ```
     *
     * @param ids Ids of the artist or artists
     */
    unfollowArtist(...ids: string[]): Promise<void>;
    /**
     * Aliases of the unfollowUser unfollowPlaylist and unfollowArtist
     *
     * @param type Type of the id. User, Artist or Playlist
     * @param ids Ids of the user or artist. Only 1 id can be used to unfollow playlist
     */
    unfollow(type?: 'user' | 'artist' | 'playlist', ...ids: string[]): Promise<void>;
    /**
     * **Example:**
     * ```js
     * const usersFollowers = await user.getFollowers();
     * const artistsFollowers = await user.getFollowers('artist');
     * ```
     *
     * Get the list of followers of the current user By default will return user followers
     *
     * @param type Type of followers needs to be returned! User or artist!
     */
    getFollowers(type?: 'user' | 'artist'): Promise<Artist[] | User[]>;
    /**
     * **Example:**
     * ```js
     * user.login({
     *    client_id: 'id',
     *    client_secret: 'secret',
     *    redirect_uri: 'confirmation_redirect_uri',
     *    code: 'refresh-token-or-the-code-query'
     * })
     * ```
     *
     * @param options Login by Auth.refresh
     */
    login(options: {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
        code: string;
    }): Promise<void>;
}
export default UserClient;
