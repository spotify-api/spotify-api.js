import Client from '../Client';
import Track from './Track';
import { Image, Restriction, Copyright } from '../Types';
/**
 * Spotify api's album object!
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
     *
    get artists(): Artist[] {
        return this.data.artists.map(x => new Artist(x, this.client));
    }; **/
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
}
export default Album;
