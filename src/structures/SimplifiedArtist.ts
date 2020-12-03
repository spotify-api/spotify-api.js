/**
 * Simplified artist structure
 */

import Util from '../Spotify';
import { CodeImageReturn, DominantColor } from './Interface';

const util = new Util();

/**
 * SimplifiedArtist Class
 */
class SimplifiedArtist {

    externalUrls: any;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
    codeImage?: string;
    dominantColor?: DominantColor;

    /**
     * **Example:**
     * 
     * ```js
     * const artist = new SimplifiedArtist(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){

        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
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

};

export default SimplifiedArtist;