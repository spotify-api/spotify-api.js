/**
 * Public User Structure
 */
import { CodeImageReturn, Followers, Image } from "./Interface";
/**
 * Public User Class
 */
declare class PublicUser {
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
    constructor(data: any);
    /**
     * Returns the code image with dominant color
     */
    getCodeImage(): Promise<CodeImageReturn>;
    /**
     * Returns the uri data
     */
    getURIData(): Promise<any>;
}
export default PublicUser;
