/**
 * Public User Structure
 */
import { CodeImageReturn, Image } from "./Interface";
/**
 * Public User Class
 */
declare class PublicUser {
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
