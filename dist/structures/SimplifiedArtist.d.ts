/**
 * Simplified artist structure
 */
import { CodeImageReturn } from './Interface';
/**
 * SimplifiedArtist Class
 */
declare class SimplifiedArtist {
    externalUrls: any;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
    /**
     * **Example:**
     *
     * ```js
     * const artist = new SimplifiedArtist(data);
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
export default SimplifiedArtist;
