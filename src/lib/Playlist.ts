/**
 * Playlist Manager file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import Client from "../Client";
import { Image } from "../structures/Interface";
import PlaylistStructure, { PlaylistTrack } from "../structures/Playlist";

/**
 * Class of all Spotify Api Methods related to playlists
 */
export default class PlaylistManager extends Spotify {

    client: Client;

    /**
     * Class of all Spotify Api Methods related to playlists
     * 
     * @param client Your Spotify Client
     */
    constructor(client: Client){
        super(client.token);
        this.client = client;
    }

    /**
     * Returns the information of Spotify Playlist by its id!
     * 
     * @param id Id of the playlist
	 * @param force If true then will fetch directly instead of searching cache
     * @example const playlist = await spotify.playlists.get("id"); // Get playlist data by id
     */
    async get(id: string, force: boolean = false): Promise<PlaylistStructure> {

        if(!id) throw new MissingParamError("missing id");
        if(!force){
            let existing = this.client.cache.playlists.get(id);
            if(existing) return existing;
        }
			
        try {
			const data = new PlaylistStructure(await this.fetch({ link: `v1/playlists/${id}` }), this.client);
			if(this.client.cacheOptions.cachePlaylists) this.client.cache.playlists.push(data);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Returns the tracks of the playlist by the playlist id!
     * 
     * @param id Id of the playlist
     * @param options Options to configure your search
     * @example const tracks = await spotify.playlists.getTracks("id", { limit: 1 }); // Get all tracks in an album by id. Has advanced option too...
     */
    async getTracks(id: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<PlaylistTrack[]> {

        if(!id) throw new MissingParamError("missing id");

        try{
            const data = await this.fetch({
                link: `v1/playlists/${id}/tracks`,
                params: {
                    market: "US",
                    limit: options.limit,
                    ...options.params
                },
            });

            return data.items.map(x => new PlaylistTrack(x, this.client));
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Returns the images of the playlist by the playlist id!
     * 
     * @param id Playlist id
     * @example const [coverImage] = await spotify.playlists.getCoverImage('id') // Get cover image of the playlist by id
     */
    async getImages(id: string): Promise<Image[]> {

        if(!id) throw new MissingParamError('missing playlist id');

        try{
            return await this.fetch({ link: `v1/playlists/${id}/images` });
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Follow a playlist by id! Will work only if you have a current user token!
     * 
     * @param id Id of the playlist
     */
    async follow(id: string): Promise<void> {
        await this.client.user.followPlaylist(id);
    }

    /**
     * Unfollow a playlist by id! Will work only if you have a current user token!
     * 
     * @param id Id of the playlist
     */
    async unfollow(id: string): Promise<void> {
        await this.client.user.unfollowPlaylist(id);
    }
    
};