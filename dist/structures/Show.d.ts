/**
 * Show Structure
 */
import { Copyright, DominantColor, Image, CodeImageReturn } from "./Interface";
import SimplifiedEpisode from "./SimplifiedEpisode";
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
    constructor(data: any);
    /**
     * Returns the array of simplified episodes
     * @readonly
     */
    get episodes(): SimplifiedEpisode[];
    /**
     * Returns the code image with dominant color
     */
    getCodeImage(): Promise<CodeImageReturn>;
    /**
     * Returns the uri data
     */
    getURIData(): Promise<any>;
}
