/**
 * UserClient class
 * Class which is for authroized current user tokens
 */
import { MissingParamError, UnexpectedError } from "./Error";
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
class UserClient extends Spotify{

    readonly client!: Client;

    auth: Auth;
    player: UserPlayer;
    startedAt: number;

    playlists: CacheManager<Playlist>;
    albums: CacheManager<Album>;
    shows: CacheManager<Show>;
    tracks: CacheManager<Track>;
    followers: {
        users: CacheManager<User>,
        artists: CacheManager<Artist>
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
     * User client class which can be used to access current user spotify api only
     * You can still access this by Client class but this class needs a scoped token only
     * And a current user scoped token works for both Client and UserClient
     * 
     * @param client Your Spotify Client
     * @example const user = new UserClient('token', client);
     */
    constructor(client: Client){

        super(client.token);

        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.auth = new Auth();
        this.player = new UserPlayer(this.client);
        this.startedAt = Date.now();

        this.playlists = new CacheManager<Playlist>('id');
        this.albums = new CacheManager<Album>('id');
        this.shows = new CacheManager<Show>('id');
        this.tracks = new CacheManager<Track>('id');
        this.followers = {
            users: new CacheManager<User>('id'),
            artists: new CacheManager<Artist>('id')
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
     * Uptime of the user client
     *
     * @readonly
     */
    get uptime(): number {
        return Date.now() - this.startedAt;
    };

    /**
     * Updates the current user's spotify information in the userclient class and returns this!
     * 
     * @example const info = await user.info();
     */
    async info(): Promise<this> {

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
     * Returns current user's top artists based on their affinity!
     * 
     * @param options Options to configure your results!
     * @example const topArtists = await user.getTopArtists();
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
     * Returns current user's top artists based on their affinity!
     * 
     * @param options Options to configure your results
     * @example const topTracks = await user.getTopTracks();
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
     * Returns current user's top artists or tracks based on their affinity!
     * Similar to getTopTracks and getTopArtists!
     * 
     * @param type Affinity type should be one of "track" or "artist"
     * @example const tracks = await user.getAffinity('track');
     * const artists = await user.getAffinity('artist');
     */
    async getAffinity(type: 'track' | 'artist', options: AffinityOptions = {}): Promise<any> {

        return type == 'track' ? await this.getTopTracks(options) : await this.getTopArtists(options);

    };

    /**
     * Returns current user's saved playlists!
     * Also saves into cache based on your cacheOptions
     * 
     * @param options Options to configure results
     * @param force If true then will directly fetch instead of searching cache!
     * @example const playlists = user.getPlaylists()
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
     * Returns current user's saved albums!
     * Also saves into cache based on your cacheOptions
     * 
     * @param options Options to configure results
     * @param force If true then will directly fetch instead of searching cache
     * @example const albums = await user.getAlbums();
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
     * Returns current user's saved shows!
     * Also saves into cache based on your cacheOptions
     * 
     * @param options Options to configure your results
     * @param force If true then will directly fetch instead of searching cache
     * @example const shows = await user.getShows();
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
     * Returns current user's saved tracks!
     * Also saves into cache based on your cacheOptions
     * 
     * @param options Configure your options
     * @param force If true then will directly fetch instead of searching cache
     * @example const tracks = await user.getTracks();
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
     * Deletes this album from your saved list!
     * 
     * @param ids Id of the albums
     * @example user.deleteAlbum('id');
     * user.deleteAlbum('id1', 'id2', 'id3'); 
     */
    async deleteAlbum(...ids: string[]): Promise<void> {

        try{
            await this.fetch({ method: 'DELETE', link: `v1/me/albums`, params: { ids: ids.join(',') }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Deletes this track from your saved list!
     * 
     * @param ids Id of the tracks
     * @example user.deleteTrack('id');
     * user.deleteTrack('id1', 'id2', 'id3'); 
     */
    async deleteTrack(...ids: string[]): Promise<void> {

        try{
            await this.fetch({ method: 'DELETE', link: `v1/me/tracks`, params: { ids: ids.join(',') }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Deletes this show from your saved list!
     * 
     * @param ids Id of the shows
     * @example user.deleteShow('id');
     * user.deleteShow('id1', 'id2', 'id3'); 
     */
    async deleteShow(...ids: string[]): Promise<void> {

        try{
            await this.fetch({ method: 'DELETE', link: `v1/me/shows`, params: { ids: ids.join(',') }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Adds those albums to your saved list!
     * 
     * @param ids Id of the albums
     * @example user.addAlbum('id');
     * user.addAlbum('id1', 'id2', 'id3'); 
     */
    async addAlbum(...ids: string[]): Promise<void> {

        try{
            await this.fetch({ method: 'PUT', link: `v1/me/albums`, params: { ids: ids.join(',') }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Adds those tracks to your saved list!
     * 
     * @param ids Id of the tracks
     * @example user.addTrack('id');
     * user.addTrack('id1', 'id2', 'id3'); 
     */
    async addTrack(...ids: string[]): Promise<void> {

        try{
            await this.fetch({ method: 'PUT', link: `v1/me/tracks`, params: { ids: ids.join(',') }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Adds those shows to your saved list!
     * 
     * @param ids Id of the shows
     * @example user.addShow('id');
     * user.addShow('id1', 'id2', 'id3'); 
     */
    async addShow(...ids: string[]): Promise<void> {

        try{
            await this.fetch({ method: 'PUT', link: `v1/me/shows`, params: { ids: ids.join(',') }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Verify if the current user follows those users!
     * 
     * @param ids All id's of the users to verify!
     * @example  user.followsUser('id');
     * user.followsUser('id1', 'id2', 'id3'); // For multiple verification
     */
    async followsUser(...ids: string[]): Promise<boolean[]> {

        try{
            return await this.fetch({ link: 'v1/me/following/contains', params: { type: 'user', ids: ids.join(',') } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Verify if the current user follows those artists
     * 
     * @param ids All id's of the artists to verify!
     * @example user.followsArtist('id');
     * user.followsArtist('id1', 'id2', 'id3'); // For multiple verification
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
     * Verify if the current user follows those users or artists
     * 
     * @param type Type could be artist or user which will state that whose id you have provided artist or user?
     * @param ids Ids of the users or artists
     * @example const followsUser = await user.follows('user', 'id', 'id2'); 
     * const followsArtist = await user.follows('artist', 'id', 'id2');
     * @deprecated This might be removed in upcomming versions! You can use followsUser or followsArtist instead of using this method!
     */
    async follows(type: 'artist' | 'user', ...ids: string[]): Promise<boolean[]> {

        return type == 'artist' ? await this.followsArtist(...ids) : await this.followsUser(...ids);

    };

    /**
     * Follow many or one spotify user by id!
     *  
     * @param ids Ids of the user or users
     * @example user.followUser('id');
     * user.followUser('id1', 'id2', 'id3'); // To follow many
     */
    async followUser(...ids: string[]): Promise<void> {
        
        try{
            await this.fetch({ method: 'PUT', link: `v1/me/following`, params: { ids: ids.join(','), type: 'user' } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    }

    /**
     * Follow a spotify playlist by id!
     *  
     * @param id Id of the spotify playlist!
     * @example user.followPlaylist('id');
     */
    async followPlaylist(id: string): Promise<void> {

        try{
            await this.fetch({ method: 'PUT', link: `v1/playlists/${id}/followers`, headers: { "Content-Type": "application/json" } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Follow many or one spotify artist by id!
     *  
     * @param ids Ids of the artist or artists
     * @example user.followArtist('id');
     * user.followArtist('id1', 'id2', 'id3'); // To follow many
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
     * You can only provide 1 id for playlist!
     * 
     * @param type Type of the id. User, Artist or Playlist
     * @param ids Ids of the user or artist. Only 1 id can be used to follow playlist
     * @deprecated This method may get removed in upcomming versions. You can use followUser, followArtist or followPlaylist instead!
     */
    async follow(type: 'user' | 'artist' | 'playlist' = 'user', ...ids: string[]): Promise<void> {

        if(type == 'user') await this.followUser(...ids);
        else if(type == 'artist') await this.followArtist(...ids);
        else await this.followPlaylist(ids[0]);

    };

    /**
     * Unfollow many or one spotify user by id!
     *  
     * @param ids Ids of the user or users
     * @example user.unfollowUser('id');
     * user.unfollowUser('id1', 'id2', 'id3'); // To follow many
     */
    async unfollowUser(...ids: string[]): Promise<void> {
        
        try{
            await this.fetch({ method: 'PUT', link: `v1/me/following`, params: { ids: ids.join(','), type: 'user' } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    }

    /**
     * Unfollow a spotify playlist by id!
     *  
     * @param ids Ids of the spotify playlist
     * @example user.unfollowPlaylist('id');
     * user.unfollowUser('id1', 'id2', 'id3'); // To follow many
     */
    async unfollowPlaylist(id: string): Promise<void> {

        try{
            await this.fetch({ method: 'DELETE', link: `v1/playlists/${id}/followers`, headers: { "Content-Type": "application/json" } })
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Unfollow many or one spotify artists by id!
     *  
     * @param ids Ids of the artist or artists
     * @example user.unfollowArtist('id');
     * user.unfollowArtist('id1', 'id2', 'id3'); // To follow many
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
     * @param type Type of the id. Should be one of "user", "artist", "playlist"!
     * @param ids Ids of the user or artist. Only 1 id can be used to unfollow playlist
     * @deprecated This method may get removed in upcomming versions! You can use unfollowUser, unfollowArtist or unfollowPlaylist itself!
     */
    async unfollow(type: 'user' | 'artist' | 'playlist' = 'user', ...ids: string[]): Promise<void> {

        if(type == 'user') await this.unfollowUser(...ids);
        else if(type == 'artist') await this.unfollowArtist(...ids);
        else await this.unfollowPlaylist(ids[0]);

    };

    /**
     * Get the list of followers of the current user. By default will return user followers
     * Will also cache based on your cache options!
     * 
     * @param type Type of followers needs to be returned! User or artist!
     * @example const usersFollowers = await user.getFollowers();
     * const artistsFollowers = await user.getFollowers('artist');
     */
    async getFollowers(type: 'user' | 'artist' = 'user'): Promise<Artist[] | User[]> {

        try{
            let data = await this.fetch({ link: `v1/me/following`, params: { type } });

            if(type == 'user'){
                data = data.map(x => new User(x, this.client));
                if(this.client.cacheOptions.cacheUsers){
                    this.client.cache.users.push(...data);
                    this.followers.users.push(...data);
                };
                return data;
            }else{
                data = data.map(x => new Artist(x, this.client));
                if(this.client.cacheOptions.cacheArtists){
                    this.client.cache.artists.push(...data)
                    this.followers.artists.push(...data)
                };
                return data;
            }
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

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
    async login(options: string): Promise<void>;
    async login(options: AuthRefreshOptions): Promise<void>;
    async login(options: AuthRefreshOptions | string): Promise<void> {
        this.token = typeof options == 'string' ? options : (await this.auth.refresh(options)).accessToken;
        this.client.login(this.token);
        this.player = new UserPlayer(this.client);
        this.startedAt = Date.now();
    };
    
};

export default UserClient;