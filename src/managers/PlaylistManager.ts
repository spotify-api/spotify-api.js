import { handleError } from "../Errors";
import Playlist, { PlaylistTrack, PlaylistTrackType } from "../structures/Playlist";
import { Image, PagingOptions, RawObject, SearchOptions } from "../Types";
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
     async search(query: string, options: Omit<SearchOptions, 'type'>): Promise<Playlist[]> {

        try{
            const playlists = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'playlist',
                    q: query
                }
            })).playlists.items.map(x => new Playlist(x, this.client));

            if(this.client.cacheOptions.cachePlaylists){
                for(let i = 0; i < playlists.length; i++) this.client.cache.playlists.set(playlists[i].id, playlists[i]);
            }

            return playlists;
        }catch(e){
            return handleError(e) || [];
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
    async getTracks(id: string, options: PagingOptions = { market: 'US' }): Promise<PlaylistTrackType[]> {

        try{
            const tracks = (await this.fetch(`/playlists/${id}/tracks`, {
                params: options as RawObject
            })).items.map(x => PlaylistTrack(x, this.client)) as PlaylistTrackType[];

            return tracks;
        }catch(e){
            return handleError(e) || [];
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

}

export type { Playlist };