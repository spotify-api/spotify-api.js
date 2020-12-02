import { Restriction, CodeImageReturn, DominantColor } from "./Interface";
import SimplifiedArtist from "./SimplifiedArtist";
import LinkedTrack from "./LinkedTrack";
import SimplifiedAlbum from "./SimplifiedAlbum";
/**
 * Track class
 */
declare class Track {
    data: any;
    availableMarkets: string[];
    discNumber: number;
    duration: number;
    explicit: boolean;
    externalIds: any;
    externalUrls: any;
    href: string;
    id: string;
    name: string;
    popularity: number;
    previewUrl: string;
    trackNumber: number;
    type: string;
    uri: string;
    local: boolean;
    playable?: boolean;
    linkedFrom?: LinkedTrack;
    restrictions?: Restriction;
    codeImage?: string;
    dominantColor?: DominantColor;
    /**
     * **Example:**
     *
     * ```js
     * const track = new Track(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     */
    constructor(data: any);
    /**
     * Album object
     * @readonly
     */
    get album(): SimplifiedAlbum;
    /**
     * Returns the array of SimplifiedArtist
     * @readonly
     */
    get artists(): SimplifiedArtist[];
    /**
     * Returns the code image with dominant color
     */
    getCodeImage(): Promise<CodeImageReturn>;
    /**
     * Returns the uri data
     */
    getURIData(): Promise<any>;
}
export default Track;
