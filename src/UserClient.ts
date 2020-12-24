/**
 * UserClient class
 * Class which is for scoped tokens
 */
import { MissingParamError, UnexpectedError } from "./Error";
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
class UserClient extends Spotify{

    readonly client!: Client;

    auth: Auth;
    player: UserPlayer;
    startedAt: number;

    playlists: CacheManager<string, Playlist>;
    albums: CacheManager<string, Album>;
    shows: CacheManager<string, Show>;
    tracks: CacheManager<string, Track>;
    followers: {
        users: CacheManager<string, User>,
        artists: CacheManager<string, Artist>
    }

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
    constructor(token: string = 'NO TOKEN', client: Client){

        super(token);

        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.auth = new Auth();
        this.player = new UserPlayer(this.token, this.client);
        this.startedAt = Date.now();

        this.playlists = new CacheManager<string, Playlist>('id');
        this.albums = new CacheManager<string, Album>('id');
        this.shows = new CacheManager<string, Show>('id');
        this.tracks = new CacheManager<string, Track>('id');
        this.followers = {
            users: new CacheManager<string, User>('id'),
            artists: new CacheManager<string, Artist>('id')
        };

        this.country = null;
        this.name = null;
        this.externalUrls = null;
        this.totalFollowers = null;
        this.href = null;
        this.id = null;
        this.uri = null;
        this.product = null;
        this.images = [];

    };

    /**
     * **Example"**
     * ```js
     * user.uptime
     * ```
     * 
     * Uptime of the user client
     */
    get uptime(): number {
        return Date.now() - this.startedAt;
    };

    /**
     * **Example"**
     * ```js
     * const info = await user.info();
     * ```
     * 
     * Returns the user information
     */
    async info(): Promise<UserClient> {

        try{
            const data = await this.fetch({ link: 'v1/me' });

            this.country = data.country;
            this.name = data.display_name;
            this.externalUrls = data.external_urls;
            this.totalFollowers = data.followers.total;
            this.href = data.href;
            this.id = data.id;
            this.uri = data.uri;
            this.images = data.images;
            if(data.email) this.email = data.email;
            if(data.explicit_content) this.explicitContent = {
                filterEnabled: data.explicit_content.filter_enabled,
                filterLocked: data.explicit_content.filter_locked
            }
            if(data.product) this.product = data.product;

            return this;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async getTopArtists(options: AffinityOptions = {}): Promise<Artist[]> {

        try{
            const data = await this.fetch({ link: `v1/me/top/artists`, params: options });
            const items = data.map(x => new Artist(x, this.client));
            if(this.client.cacheOptions.cacheArtists) this.client.cache.artists.push(...items);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async getTopTracks(options: AffinityOptions = {}): Promise<Track[]> {

        try{
            const data = await this.fetch({ link: `v1/me/top/tracks`, params: options });
            const items = data.map(x => new Track(x, this.client));
            if(this.client.cacheOptions.cacheTracks) this.client.cache.tracks.push(...items);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async getAffinity(type: 'track' | 'artist', options: AffinityOptions = {}): Promise<any> {

        return type == 'track' ? await this.getTopTracks(options) : await this.getTopArtists(options);

    };

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
    async getPlaylists(options: LimitOffsetOptions = {}, force: boolean = false): Promise<Playlist[]> {

        if(!force && this.playlists.length) return this.playlists;

        try{
            const data = await this.fetch({ link: `v1/me/playlists`, params: options });
            const items = data.map(x => new Playlist(x, this.client));
            if(this.client.cacheOptions.cachePlaylists) this.client.cache.playlists.push(...items);
            this.playlists.push(...items);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async getAlbums(options: LimitOffsetOptions = {}, force: boolean = false): Promise<Album[]> {

        if(!force && this.albums.length) return this.albums;

        try{
            const data = await this.fetch({ link: `v1/me/albums`, params: options });
            const items = data.map(x => new Album(x, this.client));
            if(this.client.cacheOptions.cacheAlbums) this.client.cache.albums.push(...items);
            this.albums.push(...items);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async getShows(options: LimitOffsetOptions = {}, force: boolean = false): Promise<Show[]> {

        if(!force && this.shows.length) return this.shows;

        try{
            const data = await this.fetch({ link: `v1/me/shows`, params: options });
            const items = data.map(x => new Show(x, this.client));
            if(this.client.cacheOptions.cacheShows) this.client.cache.shows.push(...items);
            this.shows.push(...items);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async getTracks(options: LimitOffsetOptions = {}, force: boolean = false): Promise<Track[]> {

        if(!force && this.tracks.length) return this.tracks;

        try{
            const data = await this.fetch({ link: `v1/me/tracks`, params: options });
            const items = data.map(x => new Track(x, this.client));
            if(this.client.cacheOptions.cacheTracks) this.client.cache.tracks.push(...items);
            this.tracks.push(...items);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async deleteAlbum(id: string | string[]): Promise<void> {

        try{
            await this.fetch({ method: 'DELETE', link: `v1/me/albums`, params: { ids: Array.isArray(id) ? id.join(',') : id }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async deleteTrack(id: string | string[]): Promise<void> {

        try{
            await this.fetch({ method: 'DELETE', link: `v1/me/tracks`, params: { ids: Array.isArray(id) ? id.join(',') : id }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async deleteShow(id: string | string[]): Promise<void> {

        try{
            await this.fetch({ method: 'DELETE', link: `v1/me/shows`, params: { ids: Array.isArray(id) ? id.join(',') : id }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async addAlbum(id: string | string[]): Promise<void> {

        try{
            await this.fetch({ method: 'PUT', link: `v1/me/albums`, params: { ids: Array.isArray(id) ? id.join(',') : id }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async addTrack(id: string | string[]): Promise<void> {

        try{
            await this.fetch({ method: 'PUT', link: `v1/me/tracks`, params: { ids: Array.isArray(id) ? id.join(',') : id }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async addShow(id: string | string[]): Promise<void> {

        try{
            await this.fetch({ method: 'PUT', link: `v1/me/shows`, params: { ids: Array.isArray(id) ? id.join(',') : id }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async followsUser(...ids: string[]): Promise<boolean[]> {

        try{
            return await this.fetch({ link: 'v1/me/following/contains', params: { type: 'user', ids: ids.join(',') } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async followsArtist(...ids: string[]): Promise<boolean[]> {

        if(!ids.length) throw new MissingParamError('There should be atleast 1 id to verify!');

        try{
            return await this.fetch({ link: 'v1/me/following/contains', params: { type: 'artist', ids: ids.join(',') } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async follows(type: 'artist' | 'user', ...ids: string[]): Promise<boolean[]> {

        return type == 'artist' ? await this.followsArtist(...ids) : await this.followsUser(...ids);

    };

    /**
     * **Example:**
     * ```js
     * user.followUser('id');
     * user.followUser('id1', 'id2', 'id3'); // To follow many
     * ```
     *  
     * @param ids Ids of the user or users
     */
    async followUser(...ids: string[]): Promise<void> {
        
        try{
            await this.fetch({ method: 'PUT', link: `v1/me/following`, params: { ids: ids.join(','), type: 'user' } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    }

    /**
     * **Example:**
     * ```js
     * user.followPlaylist('id');
     * ```
     * 
     * @param id Id of the playlist
     */
    async followPlaylist(id: string): Promise<void> {

        try{
            await this.fetch({ method: 'PUT', link: `v1/playlists/${id}/followers`, headers: { "Content-Type": "application/json" } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * user.followArtist('id');
     * user.followArtist('id1', 'id2', 'id3'); // To follow many
     * ```
     *  
     * @param ids Ids of the artist or artists
     */
    async followArtist(...ids: string[]): Promise<void> {
        
        try{
            await this.fetch({ method: 'PUT', link: `v1/me/following`, params: { ids: ids.join(','), type: 'artist' } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    }

    /**
     * Aliases of the followUser followPlaylist and followArtist
     * 
     * @param type Type of the id. User, Artist or Playlist
     * @param ids Ids of the user or artist. Only 1 id can be used to follow playlist
     */
    async follow(type: 'user' | 'artist' | 'playlist' = 'user', ...ids: string[]): Promise<void> {

        if(type == 'user') await this.followUser(...ids);
        else if(type == 'artist') await this.followArtist(...ids);
        else await this.followPlaylist(ids[0]);

    };

    /**
     * **Example:**
     * ```js
     * user.unfollowUser('id');
     * user.unfollowUser('id1', 'id2', 'id3'); // To follow many
     * ```
     *  
     * @param ids Ids of the user or users
     */
    async unfollowUser(...ids: string[]): Promise<void> {
        
        try{
            await this.fetch({ method: 'PUT', link: `v1/me/following`, params: { ids: ids.join(','), type: 'user' } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    }

    /**
     * **Example:**
     * ```js
     * user.unfollowPlaylist('id');
     * ```
     * 
     * @param id Id of the playlist
     */
    async unfollowPlaylist(id: string): Promise<void> {

        try{
            await this.fetch({ method: 'DELETE', link: `v1/playlists/${id}/followers`, headers: { "Content-Type": "application/json" } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * user.unfollowArtist('id');
     * user.unfollowArtist('id1', 'id2', 'id3'); // To follow many
     * ```
     *  
     * @param ids Ids of the artist or artists
     */
    async unfollowArtist(...ids: string[]): Promise<void> {
        
        try{
            await this.fetch({ method: 'DELETE', link: `v1/me/following`, params: { ids: ids.join(','), type: 'artist' } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    }

    /**
     * Aliases of the unfollowUser unfollowPlaylist and unfollowArtist
     * 
     * @param type Type of the id. User, Artist or Playlist
     * @param ids Ids of the user or artist. Only 1 id can be used to unfollow playlist
     */
    async unfollow(type: 'user' | 'artist' | 'playlist' = 'user', ...ids: string[]): Promise<void> {

        if(type == 'user') await this.unfollowUser(...ids);
        else if(type == 'artist') await this.unfollowArtist(...ids);
        else await this.unfollowPlaylist(ids[0]);

    };

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
    async getFollowers(type: 'user' | 'artist' = 'user'): Promise<Artist[] | User[]> {

        try{
            let data = await this.fetch({ link: `v1/me/following`, params: { type } });

            if(type == 'user'){
                data = data.map(x => new User(x, this.client));
                if(this.client.cacheOptions.cacheUsers) this.client.cache.users.push(...data);
                if(this.client.cacheOptions.cacheFollowers) this.followers.users.push(...data);
                return data;
            }else{
                data = data.map(x => new Artist(x, this.client));
                if(this.client.cacheOptions.cacheArtists) this.client.cache.artists.push(...data);
                if(this.client.cacheOptions.cacheFollowers) this.followers.artists.push(...data);
                return data;
            }
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async login(
        options: {
            client_id: string;
            client_secret: string;
            redirect_uri: string;
            code: string;
        }
    ): Promise<void> {
        this.token = (await this.auth.refresh(options)).access_token;
        this.player = new UserPlayer(this.token, this.client);
        this.startedAt = Date.now();
    };
    
};

export default UserClient;