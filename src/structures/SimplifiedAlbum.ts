/**
 * SimplifiedAlbum Structure
 */
import { CodeImageReturn, Image, Restriction } from "./Interface";
import SimplifiedArtist from "./SimplifiedArtist";
import Util from '../Spotify';

const util = new Util();

/**
 * SimplifiedAlbum class
 */
class SimplifiedAlbum {

    private data: any;

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
    constructor(data){

        Object.defineProperty(this, 'data', { value: data, writable: false });

        this.albumGroup = data.album_group;
        this.albumType = data.album_type;
        this.availableMarkets = data.available_markets || [];
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.restrictions = data.restrictions;
        this.type = data.type;
        this.uri = data.uri;

    };

    /**
     * Returns the code image with dominant color
     */
    async getCodeImage(): Promise<CodeImageReturn> {
        return await util.getCodeImage(this.uri);
    };

    /**
     * Returns the uri data
     */
    async getURIData(): Promise<any> {
        return await util.getURIData(this.uri);
    };

    /**
     * Returns the array of simplified artist
     * @readonly
     */
    get artists(): SimplifiedArtist[] {
        return this.data.artists.map(x => new SimplifiedArtist(x));
    };

    /**
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt(): Date | null {
        return this.releaseDate ? new Date(this.releaseDate) : null;
    };

};

export default SimplifiedAlbum;