/**
 * SimplifiedAlbum Structure
 */
import { CodeImageReturn, Image, Restriction } from "./Interface";
import SimplifiedArtist from "./SimplifiedArtist";
/**
 * SimplifiedAlbum class
 */
declare class SimplifiedAlbum {
    private data;
    albumGroup?: string;
    albumType: string;
    availableMarkets: string[];
    externalUrls: any;
    href: string;
    id: string;
    images: Image[];
    name: string;
    releaseDate?: string;
    releaseDatePrecision?: string;
    restrictions?: Restriction;
    type: string;
    uri: string;
    /**
     * **Example:**
     *
     * ```js
     * const album = new SimplifiedAlbum(data);
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
     * Returns the array of simplified artist
     * @readonly
     */
    get artists(): SimplifiedArtist[];
    /**
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt(): Date | null;
}
export default SimplifiedAlbum;
