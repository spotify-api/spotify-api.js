import { Image, DominantColor, ResumePoint, CodeImageReturn } from "./Interface";
/**
 * Simplified Episode class
 */
declare class SimplifiedEpisode {
    data: any;
    audioPreviewUrl: string;
    description: string;
    duration: number;
    explicit: boolean;
    externalUrls: any;
    href: string;
    id: string;
    images: Image[];
    isExternallyHosted: boolean;
    playable: boolean;
    languages: string[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: string;
    type: string;
    uri: string;
    resumePoint?: ResumePoint;
    codeImage?: string;
    dominantColor?: DominantColor;
    /**
     * **Example:**
     *
     * ```js
     * const episode = new SimplifiedEpisode(data);
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
    /**
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt(): Date;
}
export default SimplifiedEpisode;
