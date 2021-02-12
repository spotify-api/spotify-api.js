import Auth from './lib/Auth';
import { AffinityOptions, AuthRefreshOptions, ExplicitContent, Image, LimitOffsetOptions } from "./structures/Interface";
import Client from "./Client";
import Spotify from "./Spotify";
import UserPlayer from "./UserPlayer";
import Artist from "./structures/Artist";
import Track from "./structures/Track";
import Playlist from "./structures/Playlist";
import Album from "./structures/Album";
import Show from "./structures/Show";
import CacheManager from "./CacheManager";
import User from "./structures/User";
/**
 * User client class which can be used to access current user spotify api only
 * You can still access this by Client class but this class needs a scoped token only
 * And a current user scoped token works for both Client and UserClient
 */
declare class UserClient extends Spotify {
    readonly client: Client;
    auth: Auth;
    player: UserPlayer;
    startedAt: number;
    playlists: CacheManager<Playlist>;
    albums: CacheManager<Album>;
    shows: CacheManager<Show>;
    tracks: CacheManager<Track>;
    followers: {
        users: CacheManager<User>;
        artists: CacheManager<Artist>;
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
     * User client class which can be used to access current user spotify api only
     * You can still access this by Client class but this class needs a scoped token only
     * And a current user scoped token works for both Client and UserClient
     *
     * @param client Your Spotify Client
     * @example const user = new UserClient('token', client);
     */
    constructor(client: Client);
    /**
     * Uptime of the user client
     *
     * @readonly
     */
    get uptime(): number;
    /**
     * Updates the current user's spotify information in the userclient class and returns this!
     *
     * @example const info = await user.info();
     */
    info(): Promise<this>;
    /**
     * Returns current user's top artists based on their affinity!
     *
     * @param options Options to configure your results!
     * @example const topArtists = await user.getTopArtists();
     */
    getTopArtists(options?: AffinityOptions): Promise<Artist[]>;
    /**
     * Returns current user's top artists based on their affinity!
     *
     * @param options Options to configure your results
     * @example const topTracks = await user.getTopTracks();
     */
    getTopTracks(options?: AffinityOptions): Promise<Track[]>;
    /**
     * Returns current user's top artists or tracks based on their affinity!
     * Similar to getTopTracks and getTopArtists!
     *
     * @param type Affinity type should be one of "track" or "artist"
     * @example const tracks = await user.getAffinity('track');
     * const artists = await user.getAffinity('artist');
     */
    getAffinity(type: 'track' | 'artist', options?: AffinityOptions): Promise<any>;
    /**
     * Returns current user's saved playlists!
     * Also saves into cache based on your cacheOptions
     *
     * @param options Options to configure results
     * @param force If true then will directly fetch instead of searching cache!
     * @example const playlists = user.getPlaylists()
     */
    getPlaylists(options?: LimitOffsetOptions, force?: boolean): Promise<Playlist[]>;
    /**
     * Returns current user's saved albums!
     * Also saves into cache based on your cacheOptions
     *
     * @param options Options to configure results
     * @param force If true then will directly fetch instead of searching cache
     * @example const albums = await user.getAlbums();
     */
    getAlbums(options?: LimitOffsetOptions, force?: boolean): Promise<Album[]>;
    /**
     * Returns current user's saved shows!
     * Also saves into cache based on your cacheOptions
     *
     * @param options Options to configure your results
     * @param force If true then will directly fetch instead of searching cache
     * @example const shows = await user.getShows();
     */
    getShows(options?: LimitOffsetOptions, force?: boolean): Promise<Show[]>;
    /**
     * Returns current user's saved tracks!
     * Also saves into cache based on your cacheOptions
     *
     * @param options Configure your options
     * @param force If true then will directly fetch instead of searching cache
     * @example const tracks = await user.getTracks();
     */
    getTracks(options?: LimitOffsetOptions, force?: boolean): Promise<Track[]>;
    /**
     * Deletes this album from your saved list!
     *
     * @param ids Id of the albums
     * @example user.deleteAlbum('id');
     * user.deleteAlbum('id1', 'id2', 'id3');
     */
    deleteAlbum(...ids: string[]): Promise<void>;
    /**
     * Deletes this track from your saved list!
     *
     * @param ids Id of the tracks
     * @example user.deleteTrack('id');
     * user.deleteTrack('id1', 'id2', 'id3');
     */
    deleteTrack(...ids: string[]): Promise<void>;
    /**
     * Deletes this show from your saved list!
     *
     * @param ids Id of the shows
     * @example user.deleteShow('id');
     * user.deleteShow('id1', 'id2', 'id3');
     */
    deleteShow(...ids: string[]): Promise<void>;
    /**
     * Adds those albums to your saved list!
     *
     * @param ids Id of the albums
     * @example user.addAlbum('id');
     * user.addAlbum('id1', 'id2', 'id3');
     */
    addAlbum(...ids: string[]): Promise<void>;
    /**
     * Adds those tracks to your saved list!
     *
     * @param ids Id of the tracks
     * @example user.addTrack('id');
     * user.addTrack('id1', 'id2', 'id3');
     */
    addTrack(...ids: string[]): Promise<void>;
    /**
     * Adds those shows to your saved list!
     *
     * @param ids Id of the shows
     * @example user.addShow('id');
     * user.addShow('id1', 'id2', 'id3');
     */
    addShow(...ids: string[]): Promise<void>;
    /**
     * Verify if the current user follows those users!
     *
     * @param ids All id's of the users to verify!
     * @example  user.followsUser('id');
     * user.followsUser('id1', 'id2', 'id3'); // For multiple verification
     */
    followsUser(...ids: string[]): Promise<boolean[]>;
    /**
     * Verify if the current user follows those artists
     *
     * @param ids All id's of the artists to verify!
     * @example user.followsArtist('id');
     * user.followsArtist('id1', 'id2', 'id3'); // For multiple verification
     */
    followsArtist(...ids: string[]): Promise<boolean[]>;
    /**
     * Verify if the current user follows those users or artists
     *
     * @param type Type could be artist or user which will state that whose id you have provided artist or user?
     * @param ids Ids of the users or artists
     * @example const followsUser = await user.follows('user', 'id', 'id2');
     * const followsArtist = await user.follows('artist', 'id', 'id2');
     * @deprecated This might be removed in upcomming versions! You can use followsUser or followsArtist instead of using this method!
     */
    follows(type: 'artist' | 'user', ...ids: string[]): Promise<boolean[]>;
    /**
     * Follow many or one spotify user by id!
     *
     * @param ids Ids of the user or users
     * @example user.followUser('id');
     * user.followUser('id1', 'id2', 'id3'); // To follow many
     */
    followUser(...ids: string[]): Promise<void>;
    /**
     * Follow a spotify playlist by id!
     *
     * @param id Id of the spotify playlist!
     * @example user.followPlaylist('id');
     */
    followPlaylist(id: string): Promise<void>;
    /**
     * Follow many or one spotify artist by id!
     *
     * @param ids Ids of the artist or artists
     * @example user.followArtist('id');
     * user.followArtist('id1', 'id2', 'id3'); // To follow many
     */
    followArtist(...ids: string[]): Promise<void>;
    /**
     * Aliases of the followUser followPlaylist and followArtist
     * You can only provide 1 id for playlist!
     *
     * @param type Type of the id. User, Artist or Playlist
     * @param ids Ids of the user or artist. Only 1 id can be used to follow playlist
     * @deprecated This method may get removed in upcomming versions. You can use followUser, followArtist or followPlaylist instead!
     */
    follow(type?: 'user' | 'artist' | 'playlist', ...ids: string[]): Promise<void>;
    /**
     * Unfollow many or one spotify user by id!
     *
     * @param ids Ids of the user or users
     * @example user.unfollowUser('id');
     * user.unfollowUser('id1', 'id2', 'id3'); // To follow many
     */
    unfollowUser(...ids: string[]): Promise<void>;
    /**
     * Unfollow a spotify playlist by id!
     *
     * @param ids Ids of the spotify playlist
     * @example user.unfollowPlaylist('id');
     * user.unfollowUser('id1', 'id2', 'id3'); // To follow many
     */
    unfollowPlaylist(id: string): Promise<void>;
    /**
     * Unfollow many or one spotify artists by id!
     *
     * @param ids Ids of the artist or artists
     * @example user.unfollowArtist('id');
     * user.unfollowArtist('id1', 'id2', 'id3'); // To follow many
     */
    unfollowArtist(...ids: string[]): Promise<void>;
    /**
     * Aliases of the unfollowUser unfollowPlaylist and unfollowArtist
     *
     * @param type Type of the id. Should be one of "user", "artist", "playlist"!
     * @param ids Ids of the user or artist. Only 1 id can be used to unfollow playlist
     * @deprecated This method may get removed in upcomming versions! You can use unfollowUser, unfollowArtist or unfollowPlaylist itself!
     */
    unfollow(type?: 'user' | 'artist' | 'playlist', ...ids: string[]): Promise<void>;
    /**
     * Get the list of followers of the current user. By default will return user followers
     * Will also cache based on your cache options!
     *
     * @param type Type of followers needs to be returned! User or artist!
     * @example const usersFollowers = await user.getFollowers();
     * const artistsFollowers = await user.getFollowers('artist');
     */
    getFollowers(type?: 'user' | 'artist'): Promise<Artist[] | User[]>;
    /**
     * Login to the UserClient with a new token!
     * Logging into the userclient also logs in to your Spotify Client class too!
     *
     * @param options Could be AuthRefreshOptions or could be a token to restart!
     * @example user.login({
     *    clientId: 'id',
     *    clientSecret: 'secret',
     *    redirectUri: 'confirmation_redirect_uri',
     *    code: 'refresh-token-or-the-code-query'
     * }); // Will create a new one by options
     * user.login('token'); // Will setup the token directly!
     */
    login(options: string): Promise<void>;
    login(options: AuthRefreshOptions): Promise<void>;
}
export default UserClient;
