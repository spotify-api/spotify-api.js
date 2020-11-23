/**
 * Public User Structure
 */
import { CodeImageReturn } from "./Interface";
/**
 * Public User Class
 */
declare class PlaylistOwner {
    data: any;
    displayName: string;
    externalUrls: any;
    href: string;
    id: string;
    type: string;
    uri: string;
    codeImage: string;
    /**
     * **Example:**
     *
     * ```js
     * const user = new PlaylistOwner(data);
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
export default PlaylistOwner;
