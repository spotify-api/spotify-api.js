import Client from '../Client';
import Track from './Track';
import { Image, Restriction, Copyright, RawObject, SpotifyTypes, SpotifyURI, PagingOptions, Paging } from '../Types';
import Artist from './Artist';
/**
 * Spotify api's album object!
 */
declare class Album {
    readonly data: any;
    readonly client: Client;
    albumType: 'album' | 'single' | 'compilation';
    availableMarkets: string[];
    externalUrls: RawObject;
    href: string;
    id: string;
    images: Image[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: string;
    type: SpotifyTypes;
    uri: SpotifyURI;
    label: string | null;
    restrictions: Restriction<'market' | 'product' | 'explicit'> | null;
    albumGroup?: 'album' | 'single' | 'compilation' | 'appears_on';
    totalTracks?: number;
    copyrights?: Copyright[];
    externalIds?: any;
    popularity?: number;
    genres?: string[];
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
     * Will send empty array if the album object supplied was simplified!
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
     * @param options Basic PagingOptions
     * @example await album.getTracks();
     */
    getTracks(options?: PagingOptions): Promise<Paging<Track>>;
    /**
     * Add this album to your save list!
     * @example await album.add();
     */
    add(): Promise<boolean>;
    /**
     * Remove this album from your save list!
     * @example await album.delete();
     */
    delete(): Promise<boolean>;
    /**
     * Returns a boolean stating is this albums saved on the user's savelist (library)
     * @example const isSaved = await album.saved();
     */
    saved(): Promise<boolean>;
}
export default Album;
