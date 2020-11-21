import Artist from './Artist';
import { DominantColor, CodeImageReturn, LinkedTrack, Restriction } from './Interface';
declare class SimplifiedTrack {
    artists: Artist[];
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
     * Check wheater if it is restricted or not
     * @readonly
     */
    get restricted(): boolean;
}
export default SimplifiedTrack;
