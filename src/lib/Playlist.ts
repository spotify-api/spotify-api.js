// @ts-nocheck

/**
 * Playlist lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import { Image } from "../structures/Interface";
import PlaylistStructure from "../structures/Playlist";
import { PlaylistTrack } from "../structures/PlaylistUtils";

/**
 * Class of all methods related to playlists
 */
class Playlist extends Spotify {

    /**
     * **Example:**
     * ```js
     * const playlist = await spotify.playlists.get("id"); // Get playlist data by id
     * ```
     * 
     * @param id Id of the playlist
	 * @param options options to configure
     */
    async get(
	    id: string,
		options: { advanced?: boolean } = {}
	): Promise<PlaylistStructure> {

        return new Promise(async (resolve, reject) => {
            if (!id) reject(new MissingParamError("missing id"));
			
            try {
				let res = await this.fetch({ link: `v1/playlists/${id}`, });
				
				if(options.advanced){
					let data = await this.getCodeImage(res[i].uri);
                    res.codeImage = data.image;
                    res.dominantColor = data.dominantColor;
				};
				
                resolve(new PlaylistStructure(res))
            } catch (e) {
                reject(new UnexpectedError(e));
            }
        });

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
    async getTracks(
        id: string,
        options: {
            limit?: number;
            advanced?: boolean;
            params?: any;
        } = {
            limit: 20
        }
    ): Promise<PlaylistTrack[]> {

        return new Promise(async (resolve, reject) => {
            if(!id) reject(new MissingParamError("missing id"));

            try {
                const res = await this.fetch({
                    link: `v1/playlists/${id}/tracks`,
                    params: {
                        market: "US",
                        limit: options.limit,
                        ...options.params
                    },
                });

                resolve(res.items.map(x => new PlaylistTrack(x)));
            } catch (e) {
                reject(new UnexpectedError(e));
            }
        });
    };

    /**
     * **Example:**
     * ```js
     * const coverImage = await spotify.playlists.getCoverImage('id') // Get cover image of the playlist by id
     * ```
     * 
     * @param id Playlist id
     */
    async getCoverImage(id: string): Promise<Image[]> {

        return new Promise(async(resolve, reject) => {
            try{
                if(!id) reject(new MissingParamError('missing playlist id'));

                resolve(
                    await this.fetch({
                        link: `v1/playlists/${id}/images`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });

    };
    
};

export default Playlist;