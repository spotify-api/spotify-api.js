import Album from '../structures/Album';
import BaseManager from './BaseManager';
import Track from '../structures/Track';
import { PagingOptions } from '../Types';
/**
 * Manages all the spotify album api endpoints
 */
export default class AlbumManager extends BaseManager {
    /**
     * Returns spotify album information by id
     *
     * @param id The spotify id of the album
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where the data needs to be fetched from
     * @example await client.albums.get('id');
     */
    get(id: string, force?: boolean, market?: string): Promise<Album | null>;
    /**
     * Returns all the tracks of the spotify album
     *
     * @param id Id of the spotify album
     * @param options Basic PagingOptions
     * @example await client.albums.getTracks('id');
     */
    getTracks(id: string, options?: PagingOptions): Promise<Track[]>;
}
export type { Album };
