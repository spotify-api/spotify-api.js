/**
 * Show Structure
 */
import { Copyright, DominantColor, Image, CodeImageReturn } from "./Interface";
import SimplifiedEpisode from "./SimplifiedEpisode";
import Util from '../Spotify';

const util = new Util();

/**
 * Show Structure
 */
export default class Show {

    data: any;
    availableMarkets: string[];
    copyrights: Copyright[];
    description: string;
    explicit: boolean;
    externalUrls: any;
    href: string;
    id: string;
    images: Image[];
    isExternallyHosted: boolean;
    languages: string[];
    mediaType: string;
    name: string;
    publisher: string;
    type: string;
    uri: string;
    totalEpisodes?: number;
    codeImage?: string;
    dominantColor?: DominantColor;

    /**
     * **Example:**
     * 
     * ```js
     * const show = new Show(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){

        Object.defineProperty(this, 'data', { value: data, writable: false });

        this.availableMarkets = data.available_markets;
        this.copyrights = data.copyrights;
        this.description = data.description;
        this.explicit = data.explicit;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.isExternallyHosted = data.is_externally_hosted;
        this.languages = data.languages;
        this.mediaType = data.media_type;
        this.name = data.name;
        this.publisher = data.publisher;
        this.type = data.type;
        this.uri = data.uri;
        this.totalEpisodes = data.total_episodes;

    };

    /**
     * Returns the array of simplified episodes
     * @readonly
     */
    get episodes(): SimplifiedEpisode[] {
        return this.data.episodes.items.map(x => new SimplifiedEpisode(x));
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

};