/**
 * LinkedTrack Structure
 */

import Util from '../Spotify';
import { CodeImageReturn } from './Interface'

const util = new Util();

/**
 * LinkedTrack Class
 */
class LinkedTrack{

    data: any;
    externalUrls: any;
    href: string;
    id: string;
    type: string;
    uri: string;

    /**
     * **Example:**
     * 
     * ```js
     * const track = new LinkedTrack(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){

        Object.defineProperty(this, 'data', { value: data, writable: false });

        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
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

export default LinkedTrack;