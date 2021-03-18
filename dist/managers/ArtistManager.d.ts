import Artist from '../structures/Artist';
import BaseManager from './BaseManager';
import { PagingOptions } from '../Types';
import Album from '../structures/Album';
import Track from '../structures/Track';
/**
 * All artist api methods managed!
 */
export default class ArtistManager extends BaseManager {
    /**
     * Get a spotify artist information by spotify id!
     *
     * @param id Spotify artist id
     * @param force If true, will directly fetch else will search for cache first!
     * @example await client.artists.get('id');
     */
    get(id: string, force?: boolean, market?: string): Promise<Artist | null>;
    /**
     * Returns the albums of the artist
     *
     * @param id ID of the artist
     * @param options Basic PagingOptions
     * @example await client.artists.getAlbums('id');
     */
    getAlbums(id: string, options?: PagingOptions): Promise<Album[]>;
    /**
     * Returns the top tracks of the artist
     *
     * @param id ID of the artist
     * @param options Basic PagingOptions
     * @example await client.albums.getTopTracks('id');
     */
    getTopTracks(id: string, options?: PagingOptions): Promise<Track[]>;
    /**
     * Returns artists realted to the artist of whose id is provided!
     *
     * @param id ID of the artist
     * @param options Basic PagingOptions
     * @example await client.albums.getRelatedArtists('id');
     */
    getRelatedArtists(id: string, options?: PagingOptions): Promise<Artist[]>;
}
export type { Artist };
