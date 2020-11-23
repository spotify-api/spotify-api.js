/**
 * SimplifiedTrack Structure
 */
import Artist from './Artist';
import { DominantColor, CodeImageReturn, Restriction } from './Interface';
import LinkedTrack from "./LinkedTrack";
/**
 * SimplifiedTrack Class
 */
declare class SimplifiedTrack {
    data: any;
    availableMarkets: string[];
    discNumber: number;
    duration: number;
    explicit: boolean;
    externalUrls: any;
    href: string;
    id: string;
    name: string;
    previewUrl: string;
    trackNumber: number;
    type: string;
    uri: string;
    local: boolean | null;
    restrictions: Restriction | null;
    playable?: boolean;
    linkedFrom?: LinkedTrack;
    codeImage?: string;
    dominantColor?: DominantColor;
    /**
     * **Example:**
     *
     * ```js
     * const track = new SimplifiedTrack(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data: any);
    /**
     * Returns the array of Artist
     * @readonly
     */
    get artists(): Artist[];
    /**
     * Returns the code image with dominant color
     */
    getCodeImage(): Promise<CodeImageReturn>;
    /**
     * Returns the uri data
     */
    getURIData(): Promise<any>;
    /**
     * Check wheater if it is restricted or not
     * @readonly
     */
    get restricted(): boolean;
}
export default SimplifiedTrack;
