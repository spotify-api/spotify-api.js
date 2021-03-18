import Album from '../structures/Album';
import { handleError } from '../Errors';
import BaseManager from './BaseManager';
import Track from '../structures/Track';
import { PagingOptions } from '../Types';

/**
 * Manages all the spotify album api endpoints
 */
export default class AlbumManager extends BaseManager{

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