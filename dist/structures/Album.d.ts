import Artist from './Artist';
import Track from './Track';
import { Copyright, Image, Restriction } from './Interface';
import Client from '../Client';
/**
 * Structure for the Spotify Api's Album Object!
 */
declare class Album {
    readonly data: any;
    readonly client: Client;
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
     * Returns a code image of the Album!
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Returns the array of tracks in the album!
     * @readonly
     */
    get tracks(): Track[];
    /**
     * Returns the array of artists of the album!
     * @readonly
     */
    get artists(): Artist[];
    /**
     * Returns the Date object when the album was released!
     * @readonly
     */
    get releasedAt(): Date;
    /**
     * Refetches the album and refreshes the cache!
     */
    fetch(): Promise<Album>;
    /**
     * Refetches the tracks of the album!
     *
     * @param limit Limit your results
     * @param force If true will directly fetch instead of searching cache
     */
    getTracks(limit?: number, force?: boolean): Promise<Track[]>;
    /**
     * Deletes the album from your saved list! Will only work if you have a current user token!
     */
    delete(): Promise<void>;
    /**
     * Adds this album to your saved list! Deletes the album from your saved list! Will only work if you have a current user token!
     */
    add(): Promise<void>;
}
export default Album;
