/**
 * Album Manager file
 */

import { MissingParamError, UnexpectedError } from "../Error";
import Spotify from "../Spotify";
import Client from "../Client";
import Album from '../structures/Album';
import Track from "../structures/Track";

/**
 * Class of all Spotify Api Methods related to albums
 */
export default class AlbumManager extends Spotify {

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
     * Search albums across spotify api efficiently!
     * 
     * @param q Your query
     * @param options Options such as limit and params
     * @example const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album.
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
     * Returns a Spotify Album information by Album id!
     * 
     * @param id Id of the album
     * @param force If true then will directly fetch instead of searching cache
     * @example const album = await spotify.albums.get("album id"); // Get album by id...
     */
    async get(id: string, force: boolean = false): Promise<Album> {

        if(!id) throw new MissingParamError("missing id");
        if(!force){
            let existing = this.client.cache.albums.get(id);
            if(existing) return existing;
        }

        try{
            const data = new Album(await this.fetch({ link: `v1/albums/${id}` }), this.client);
            if(this.client.cacheOptions.cacheAlbums) this.client.cache.albums.push(data);
            return data;
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Returns array of tracks present in the album by album id!
     * 
     * @param id Id of the song
     * @param options Options such as limit and params
     * @example const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album.
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

    /**
     * This is uses the client.user.deleteAlbum method
     * This deletes from your savelist
     * 
     * @param ids Id of the albums
     */
    async delete(...ids: string[]): Promise<void> {
        await this.client.user.deleteAlbum(...ids);
    };

    /**
     * This uses the client.user.addAlbum method
     * This adds new albums to the saved list 
     * 
     * @param ids Id of the albums
     */
    async add(...ids: string[]): Promise<void> {
        await this.client.user.addAlbum(...ids);
    };

};