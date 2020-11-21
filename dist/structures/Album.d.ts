import SimplifiedArtist from './SimplifiedArtist';
import SimplifiedTrack from './SimplifiedTrack';
import { Copyright, DominantColor, Image, Restriction } from './Interface';
import { CodeImageReturn } from './Interface';
/**
 * Album structure class
 */
declare class Album {
    albumType: 'album' | 'single' | 'compilation';
    artists: SimplifiedArtist[];
    availableMarkets: string[];
    copyrights: Copyright[];
    externalIds: any;
    externalUrls: any;
    genres: any[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    releaseDate: string;
    releaseDatePrecision: string;
    tracks: SimplifiedTrack[];
    type: string;
    uri: string;
    label: string | null;
    restrictions: Restriction | null;
    codeImage?: string;
    dominantColor?: DominantColor;
    /**
     * **Example:**
     *
     * ```js
     * const album = new Album(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data: any);
    /**
     * Returns the code image with dominant color
     */
    getCodeImage(): Promise<CodeImageReturn>;
    /**
     * Returns the uri data
     */
    getURIData(): Promise<any>;
    /**
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt(): Date;
    /**
     * Check wheater if it is restricted or not
     * @readonly
     */
    get restricted(): boolean;
}
export default Album;
