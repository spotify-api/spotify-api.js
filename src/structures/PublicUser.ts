/**
 * Public User Structure
 */
import { CodeImageReturn, Followers, Image } from "./Interface";
import Util from '../Spotify';

const util = new Util();

/**
 * Public User Class
 */
class PublicUser {

    displayName: string;
    externalUrls: any;
    followers: Followers;
    href: string;
    id: string;
    type: string;
    uri: string;
    images: Image[];
    codeImage?: string;

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

        this.displayName = data.display_name;
        this.externalUrls = data.external_urls;
        this.followers = data.followers;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;
        this.images = data.images;

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