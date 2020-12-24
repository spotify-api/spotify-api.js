/**
 * Playlist lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import Client from "../Client";
import { Image } from "../structures/Interface";
import PlaylistStructure, { PlaylistTrack } from "../structures/Playlist";

/**
 * Class of all methods related to playlists
 */
class Playlist extends Spotify {

    client: Client;

    constructor(token: string, client: Client){
        super(token);
        this.client = client;
    }

    /**
     * **Example:**
     * ```js
     * const playlist = await spotify.playlists.get("id"); // Get playlist data by id
     * ```
     * 
     * @param id Id of the playlist
	 * @param force If true then will fetch directly instead of searching cache
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
     * **Example:**
     * ```js
     * const tracks = await spotify.playlists.getTracks("id", { limit: 1 }); // Get all tracks in an album by id. Has advanced option too...
     * ```
     * 
     * @param id Id of the playlist
     * @param options Options to configure your search
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
     * **Example:**
     * ```js
     * const [coverImage] = await spotify.playlists.getCoverImage('id') // Get cover image of the playlist by id
     * ```
     * 
     * @param id Playlist id
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
     * Follow a playlist by id
     * 
     * @param id Id of the playlist
     */
    async follow(id: string): Promise<void> {
        await this.client.user.followPlaylist(id);
    }
    
};

export default Playlist;