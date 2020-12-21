import Artist from './Artist';
import Track from './Track';
import { Copyright, Image, Restriction } from './Interface';
import Client from '../Client';
/**
 * Album structure class
 */
declare class Album {
    readonly data: any;
    readonly client: Client;
    readonly tracks: Track[];
    albumType: 'album' | 'single' | 'compilation';
    availableMarkets: string[];
    externalUrls: any;
    href: string;
    id: string;
    images: Image[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: string;
    type: string;
    uri: string;
    label: string | null;
    restrictions: Restriction | null;
    totalTracks?: number;
    copyrights?: Copyright[];
    externalIds?: any;
    popularity?: number;
    genres?: any[];
    /**
     * **Example:**
     *
     * ```js
     * const album = new Album(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     * @param client Spotify Client
     */
    constructor(data: any, client: Client);
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Returns the array of simplified artist
     * @readonly
     */
    get artists(): Artist[];
    /**
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt(): Date;
    /**
     * Returns a fresh current album object instead of caching
     */
    fetch(): Promise<Album>;
    /**
     * Returns the tracks of the album
     *
     * @param force If true will directly fetch instead of searching cache
     * @param limit Limit your results
     */
    getTracks(force?: boolean, limit?: number): Promise<Track[]>;
}
export default Album;
