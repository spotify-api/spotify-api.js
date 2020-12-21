import Client from '../Client';
import Show from './Show';
import { Image, ResumePoint } from "./Interface";
/**
 * Episode class
 */
declare class Episode {
    readonly data: any;
    readonly client: Client;
    audioPreviewUrl: string | null;
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
    /**
     * **Example:**
     *
     * ```js
     * const episode = new Episode(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     * @param client Spotify client
     */
    constructor(data: any, client: Client);
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Show object
     * @readonly
     */
    get show(): Show | null;
    /**
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt(): Date;
    /**
     * Refreshes the episode info
     */
    fetch(): Promise<Episode>;
}
export default Episode;
