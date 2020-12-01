/**
 * Public User Structure
 */
import { CodeImageReturn, Image } from "./Interface";
import Util from '../Spotify';

const util = new Util();

/**
 * Public User Class
 */
class PublicUser {

    data: any;
    displayName: string;
    externalUrls: any;
    totalFollowers?: number;
    href: string;
    id: string;
    type: string;
    uri: string;
    images: Image[];
    codeImage: string;

    /**
     * **Example:**
     * 
     * ```js
     * const user = new PublicUser(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){

        Object.defineProperty(this, 'data', { value: data });

        this.displayName = data.display_name;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;
        if('followers' in data) this.totalFollowers = data.followers.total;
        this.images = data.images;
        this.codeImage = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${data.uri}`;

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

export default PublicUser;