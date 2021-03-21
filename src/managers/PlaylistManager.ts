import { handleError } from "../Errors";
import Playlist, { PlaylistTrack, PlaylistTrackType } from "../structures/Playlist";
import { Image, Paging, PagingOptions, RawObject, SearchOptions } from "../Types";
import { CreatePlaylist } from "../UserClient";
import BaseManager from "./BaseManager";

/**
 * A class which manages the playlists
 */
export default class PlaylistManager extends BaseManager{

    /**
     * Search playlists!
     * 
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.playlists.search('some query');
     */
     async search(query: string, options?: Omit<SearchOptions, 'type'>): Promise<Paging<Playlist>> {

        try{
            const data = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'playlist',
                    q: query
                }
            })).playlists;

            const playlists = data.items.map(x => new Playlist(x, this.client));

            if(this.client.cacheOptions.cachePlaylists){
                for(let i = 0; i < playlists.length; i++) this.client.cache.playlists.set(playlists[i].id, playlists[i]);
            }

            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: playlists
            };
        }catch(e){
            return handleError(e) || {
                limit: 0,
                offset: 0,
                total: 0,
                items: []
            };
        }

    }

    /**
     * Get a spotify playlist information by spotify id!
     * 
     * @param id Spotify playlist id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where the data needs to be fetched from
     * @example await client.playlists.get('id');
     */
    async get(id: string, force: boolean = !this.client.cacheOptions.cachePlaylists, market: string = 'US'): Promise<Playlist | null> {

        if(!force){
            let existing = this.client.cache.playlists.get(id);
            if(existing) return existing;
        }

        try{
            const playlist = new Playlist(await this.fetch(`/playlists/${id}`, {
                params: { market }
            }), this.client);
            if(this.client.cacheOptions.cachePlaylists) this.client.cache.playlists.set(playlist.id, playlist);
            return playlist;
        }catch(e){
            return handleError(e);
        }

    }

    /**
     * Return all the tracks of the spotify playlist!
     * 
     * @param id The id of the playlist
     * @param options Basic PagingOptions
     * @example await client.playlists.getTracks('id');
     */
    async getTracks(id: string, options: PagingOptions = { market: 'US' }): Promise<Paging<PlaylistTrackType>> {

        try{
            const data = (await this.fetch(`/playlists/${id}/tracks`, { params: options as RawObject }));
            const tracks = data.items.map(x => PlaylistTrack(x, this.client)) as PlaylistTrackType[];

            return {
                limit: data.limit,
                offset: data.offset,
                total: data.total,
                items: tracks
            };
        }catch(e){
            return handleError(e) || {
                limit: 0,
                offset: 0,
                total: 0,
                items: []
            };
        }

    }

    /**
     * Returns the images of the playlists!
     * 
     * @param id ID of the playlist
     * @example client.playlists.getImages(id);
     */
    async getImages(id: string): Promise<Image[]> {

        try{
            return await this.fetch(`/playlists/${id}/images`);
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Verify if many or some user follows a playlist!
     * 
     * @param playlistID Spotify playlist id
     * @param ids Array of user ids to verify
     * @example const [firstUserFollows, secondUserFollows] = await client.playlists.userFollows('playlist_id', 'userid1', 'userid2');
     */
    async userFollows(playlistID: string, ...ids: string[]): Promise<boolean[]> {

        try{
            return await this.fetch(`/playlists/${playlistID}/followers/contains`, {
                params: {
                    ids: ids.join(',')
                }
            });
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Follow a playlist!
     * 
     * @param id ID of the spotify playlist
     * @param options Options consisting of public field
     * @example await client.playlists.follow('id');
     */
    async follow(id: string, options?: { public?: boolean }): Promise<boolean> {
        return await this.client.user.followPlaylist(id, options);
    }

    /**
     * Unfollow a playlist!
     * 
     * @param id ID of the spotify playlist
     * @example await client.playlists.unfollow('id');
     */
    async unfollow(id: string): Promise<boolean> {
        return await this.client.user.unfollowPlaylist(id);
    }

    /**
     * Verify if the current user follows a playlist
     * 
     * @param id ID of the spotify playlist
     * @example const followsPlaylist = await client.playlists.follows('id');
     */
    async follows(id: string): Promise<boolean> {
        return await this.client.user.followsPlaylist(id);
    }

    /**
     * Create a spotify playlist for yourself or for the current user!
     * 
     * @param options Options to create a playlist!
     * @example await client.playlists.create({
     *     name: 'Funky playlist',
     *     description: 'My own cool playlist created by spotify-api.js',
     *     public: true,
     *     collaborative: false,
     *     userID: client.user.id // By default will be the current user id!
     * });
     */
    async create(options: CreatePlaylist): Promise<Playlist | null> {
        return await this.client.user.createPlaylist(options);
    }

    /**
     * Edit a spotify playlist using id
     * 
     * @param id ID of the spotify playlist
     * @param options CreatePlaylist object but userID field should not be provided!
     * @example await client.playlists.edit('id', {
     *     description: 'Edited new description'
     * });
     */
    async edit(id: string, options: Omit<CreatePlaylist, 'userID'>): Promise<boolean> {
       return await this.client.user.editPlaylist(id, options); 
    }

}

export type { Playlist };