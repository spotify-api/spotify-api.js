/**
 * Album lib file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import Client from "../Client";
import AlbumStructure from '../structures/Album';
import Track from "../structures/Track";

/**
 * Class of all methods related to albums
 */
class Album extends Spotify {

    client: Client;

    constructor(token: string, client: Client){
        super(token);
        this.client = client;
    }

    /**
     * **Example:**
     * ```js
     * const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album. Has advanced option too...
     * ```
     * 
     * @param q Your query
     * @param options Options such as limit, advanced and params
     */
    async search(q: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<Album[]> {

        if(!q) throw new MissingParamError("missing query!");

        try{
            const data = await this.fetch({
                link: "v1/search",
                params: {
                    q,
                    market: "US",
                    limit: options.limit,
                    type: "album",
                    ...options.params
                },
            });

            let items = data.albums.items.map(x => new Album(x, this.client));
            if(this.client.cacheOptions.cacheAlbums) this.client.cache.albums.push(...items);
            return items;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * const album = await spotify.albums.get("album id"); // Get album by id...
     * ```
     * 
     * @param id Id of the album
     * @param force If true then will directly fetch instead of searching cache
     */
    async get(id: string, force: boolean = false): Promise<AlbumStructure> {

        if(!id) throw new MissingParamError("missing id");
        if(!force){
            let existing = this.client.cache.albums.get(id);
            if(existing) return existing;
        }

        try{
            const data = new AlbumStructure(await this.fetch({ link: `v1/albums/${id}` }), this.client);
            if(this.client.cacheOptions.cacheAlbums) this.client.cache.albums.push(data);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album. Has advanced option too...
     * ```
     * 
     * @param id Id of the song
     * @param options Options such as limit, advanced and params
     */
    async getTracks(id: string, options: { limit?: number; params?: any; } = { limit: 20 }): Promise<Track[]> {

        if(!id) throw new MissingParamError("missing id!");

        try{
            const data = await this.fetch({
                link: `v1/albums/${id}/tracks`,
                params: {
                    limit: options.limit || 20,
                    market: "US",
                    offset: "0",
                    ...options.params
                },
            });

            let items = data.items.map(x => new Track(x, this.client));
            if(this.client.cacheOptions.cacheTracks) this.client.cache.tracks.push(data);
            return items;
        }catch(e){
            throw new UnexpectedError(e);
        };

    };

};

export default Album;