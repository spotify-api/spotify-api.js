import Album from '../structures/Album';
import { handleError, UnexpectedError } from '../Errors';
import BaseManager from './BaseManager';
import Track from '../structures/Track';
import { GetMultipleOptions, PagingOptions, SearchOptions } from '../Types';

/**
 * Manages all the spotify album api endpoints
 */
export default class AlbumManager extends BaseManager{

    /**
     * Search albums!
     * 
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.albums.search('some query');
     */
    async search(query: string, options: Omit<SearchOptions, 'type'>): Promise<Album[]> {

        try{
            const albums = (await this.fetch('/search', {
                params: {
                    ...options,
                    type: 'album',
                    q: query
                }
            })).albums.items.map(x => new Album(x, this.client));

            if(this.client.cacheOptions.cacheAlbums){
                for(let i = 0; i < albums.length; i++) this.client.cache.albums.set(albums[i].id, albums[i]);
            }

            return albums;
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Returns spotify album information by id
     * 
     * @param id The spotify id of the album
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where the data needs to be fetched from
     * @example await client.albums.get('id');
     */
    async get(id: string, force: boolean = !this.client.cacheOptions.cacheAlbums, market: string = 'US'): Promise<Album | null> {

        try{
            if(!force){
                let existing = this.client.cache.albums.get(id);
                if(existing) return existing;
            }

            const album = new Album(await this.fetch(`/albums/${id}`, {
                params: { market }
            }), this.client);

            if(this.client.cacheOptions.cacheAlbums) this.client.cache.albums.set(album.id, album);
            return album;
        }catch(e){
            return handleError(e);
        }

    }

    /**
     * Get multiple albums at one fetch!
     * 
     * @param options Basic GetMultipleOptions
     * @example await client.albums.getMultiple({
     *     ids: ['123456789']
     * })
     */
    async getMultiple(options: GetMultipleOptions): Promise<Album[]> {

        try{
            const def = { market: 'US', ids: [] as any };
            Object.assign(def, options);

            if(!def.ids.length  || def.ids.length > 20) throw new UnexpectedError("You must provide more than 1 and less than 20 ids to fetch multiple albums!");
            def.ids = def.ids.join(',');

            const albums = (await this.fetch('/albums', { 
                params: def
            })).albums.map(x => new Album(x, this.client));

            if(this.client.cacheOptions.cacheAlbums){
                for(let i = 0; i < albums.length; i++) this.client.cache.albums.set(albums[i].id, albums[i]);
            }

            return albums;
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Returns all the tracks of the spotify album
     * 
     * @param id Id of the spotify album
     * @param options Basic PagingOptions
     * @example await client.albums.getTracks('id');
     */
    async getTracks(id: string, options: PagingOptions = { market: 'US' }): Promise<Track[]> {

        try{
            const tracks = (await this.fetch(`/albums/${id}/tracks`)).items.map(x => new Track(x, this.client));

            if(this.client.cacheOptions.cacheTracks){
                for(let i = 0; i < tracks.length; i++) this.client.cache.tracks.set(tracks[i].id, tracks[i]);
            }

            return tracks;
        }catch(e){
            return handleError(e) || [];
        }

    }

};

export type { Album };