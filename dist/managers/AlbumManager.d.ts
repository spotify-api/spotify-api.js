import Album from '../structures/Album';
import BaseManager from './BaseManager';
import Track from '../structures/Track';
import { GetMultipleOptions, Paging, PagingOptions, SearchOptions } from '../Types';
/**
 * Manages all the spotify album api endpoints
 */
export default class AlbumManager extends BaseManager {
    /**
     * Search albums!
     *
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.albums.search('some query');
     */
    search(query: string, options?: Omit<SearchOptions, 'type'>): Promise<Paging<Album>>;
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
     * Get multiple albums at one fetch!
     *
     * @param options Basic GetMultipleOptions
     * @example await client.albums.getMultiple({
     *     ids: ['123456789']
     * })
     */
    getMultiple(options: GetMultipleOptions): Promise<Album[]>;
    /**
     * Returns all the tracks of the spotify album
     *
     * @param id Id of the spotify album
     * @param options Basic PagingOptions
     * @example await client.albums.getTracks('id');
     */
    getTracks(id: string, options?: PagingOptions): Promise<Paging<Track>>;
}
export type { Album };
