/**
 * Full Album structure
 */
import Util from '../Spotify';
import SimplifiedArtist from './SimplifiedArtist';
import SimplifiedTrack from './SimplifiedTrack';
import { Copyright, Image } from './Interface';
import { CodeImageReturn } from './Interface'

const util = new Util();

/**
 * Album structure class
 */
class Album {

    albumType: string;
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

    /**
     * **Example:**
     * 
     * ```js
     * const album = new Album(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){

        this.albumType = data.album_type;
        this.artists = data.artists.map(x => new SimplifiedArtist(x));
        this.availableMarkets = data.available_markets;
        this.copyrights = data.copyrights;
        this.externalIds = data.external_ids;
        this.externalUrls = data.external_urls;
        this.genres = data.genres;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.popularity = data.popularity;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.tracks = data.tracks.items.map(x => new SimplifiedTrack(x));
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
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt(): Date {
        return new Date(this.releaseDate);
    };

};

export default Album;