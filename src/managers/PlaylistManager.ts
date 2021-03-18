import { handleError } from "../Errors";
import Playlist, { PlaylistTrack, PlaylistTrackType } from "../structures/Playlist";
import { Image, RawObject } from "../Types";
import BaseManager from "./BaseManager";

/**
 * A class which manages the playlists
 */
export default class PlaylistManager extends BaseManager{

    /**
     * Get a spotify playlist information by spotify id!
     * 
     * @param id Spotify playlist id
     * @param force If true, will directly fetch else will search for cache first!
     * @example await client.playlists.get('id');
     */
    async get(id: string, force: boolean = !this.client.cacheOptions.cachePlaylists): Promise<Playlist | null> {

        if(!force){
            let existing = this.client.cache.playlists.get(id);
            if(existing) return existing;
        }

        try{
            const playlist = new Playlist(await this.fetch(`/playlists/${id}`), this.client);
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
     * @param options Options such as limit and offset
     * @example await client.playlists.getTracks('id');
     */
    async getTracks(id: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<PlaylistTrackType[]> {

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

}

export type { Playlist };