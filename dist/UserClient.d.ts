import Spotify from "./Spotify";
import UserPlayer from "./UserPlayer";
import Auth from './lib/Auth';
/**
 * User client class which can be used to access user client only
 * You can still access this by Client class but this class
 * needs a scoped token only
 */
declare class UserClient extends Spotify {
    auth: Auth;
    player: UserPlayer;
    startedAt: number;
    /**
     * **Example:**
     * ```js
     * const user = new UserClient('token');
     * ```
     * @param token Scoped token
     */
    constructor(token?: string);
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
    info(): Promise<any>;
    /**
     * **Example"**
     * ```js
     * const topArtists = await user.getTopArtists();
     * ```
     *
     * Top artists based on your affinity
     */
    getTopArtists(): Promise<any>;
    /**
     * **Example"**
     * ```js
     * const topTracks = await user.getTopTracks();
     * ```
     *
     * Top tracks based on your affinity
     */
    getTopTracks(): Promise<any>;
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
    getAffinity(type: 'track' | 'artist'): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const playlists = user.getPlaylists()
     * ```
     *
     * Returns your saved playlists
     *
     * @param limit Limit of your results
     */
    getPlaylists(limit?: number): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const albums = await user.getAlbums();
     * ```
     *
     * Returns your saved albums
     *
     * @param limit Limit of your results
     */
    getAlbums(limit?: number): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const shows = await user.getShows();
     * ```
     *
     * Returns your saved shows
     *
     * @param limit Limit of your results
     */
    getShows(limit?: number): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const tracks = await user.getTracks();
     * ```
     *
     * Returns user's saved tracks
     *
     * @param limit Limit of your results
     */
    getTracks(limit?: number): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.deleteAlbum('id');
     * user.deleteAlbum('id1,id2,id3'); // For multiple deletion use commas
     * ```
     *
     * Deletes your saved album
     *
     * @param id Id of the album
     */
    deleteAlbum(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.deleteTrack('id');
     * user.deleteTrack('id1,id2,id3'); // For multiple deletion use commas
     * ```
     *
     * Deletes your saved track
     *
     * @param id Id of the track
     */
    deleteTrack(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.deleteShow('id');
     * user.deleteShow('id1,id2,id3'); // For multiple deletion use commas
     * ```
     *
     * Deletes your saved show
     *
     * @param id Id of the show
     */
    deleteShow(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.addAlbum('id');
     * user.addAlbum('id1,id2,id3'); // For multiple use commas
     * ```
     *
     * Add albums to your saved list
     *
     * @param id Id of the album
     */
    addAlbum(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.addTrack('id');
     * user.addTrack('id1,id2,id3'); // For multiple use commas
     * ```
     *
     * Add tracks to your saved list
     *
     * @param id Id of the track
     */
    addTrack(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.addShpw('id');
     * user.addShow('id1,id2,id3'); // For multiple use commas
     * ```
     *
     * Add albums to your saved list
     *
     * @param id Id of the album
     */
    addShow(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.followsUser('id');
     * user.followsUser('id1,id2,id3'); // For multiple verification
     * ```
     *
     * Verify if the current user follows the user
     *
     * @param id Id of the user
     */
    followsUser(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.followsArtist('id');
     * user.followsArtist('id1,id2,id3'); // For multiple verification
     * ```
     *
     * Verify if the current user follows the artist
     *
     * @param id Id of the artist
     */
    followsArtist(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const followsUser = await user.follows('id', false); // false if the id is a user's id, by default it is false
     * const followsArtist = await user.follows('id', true); // true if the id is a artist's id.
     * ```
     *
     * Verify if the current user follows the user or artist
     *
     * @param id Id of the user
     * @param isArtist Boolean states the user is an artist or not
     */
    follows(id: string, isArtist?: boolean): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.followUser('id');
     * user.followUser('id1,id2,id3'); // To follow many
     * ```
     *
     * @param id Id of the user
     */
    followUser(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.followPlaylist('id');
     * ```
     *
     * @param id Id of the playlist
     */
    followPlaylist(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.followArtist('id');
     * user.followArtist('id1,id2,id3'); // To follow many
     * ```
     *
     * @param id Id of the artist
     */
    followArtist(id: string): Promise<any>;
    /**
     * Aliases of the followUser followPlaylist and followArtist
     *
     * @param id Id of the artist, user or playlist
     * @param type type of the id
     */
    follow(id: string, type: 'user' | 'artist' | 'playlist'): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.unfollowUser('id');
     * user.unfollowUser('id1,id2,id3'); // For many unfollow
     * ```
     *
     * @param id Id of the user
     */
    unfollowUser(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.unfollowPlaylist('id');
     * ```
     *
     * @param id Id of the playlist
     */
    unfollowPlaylist(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * user.unfollowArtist('id');
     * user.unfollowArtist('id1,id2,id3'); // For many unfollow
     * ```
     *
     * @param id Id of the artist
     */
    unfollowArtist(id: string): Promise<any>;
    async: any;
    /**
     * **Example:**
     * ```js
     * const usersFollowing = await user.following();
     * const artistsFollowing = await user.following(true);
     * ```
     *
     * Get the list of followers of the current user
     *
     * @param isArtist Should the list be of artist then true else false
     */
    following(isArtist?: boolean): Promise<any>;
    /**
     * Aliases of the unfollowUser unfollowPlaylist and unfollowArtist
     *
     * @param id Id of the artist, user or playlist
     * @param type type of the id
     */
    unfollow(id: string, type: 'user' | 'artist' | 'playlist'): Promise<any>;
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
