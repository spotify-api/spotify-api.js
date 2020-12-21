/**
 * Show Structure
 */
import { Copyright, Image } from "./Interface";
import Episode from './Episode';
import Client from '../Client';
/**
 * Show Structure
 */
export default class Show {
    readonly data: any;
    readonly client: Client;
    readonly episodes: Episode[];
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
    /**
     * **Example:**
     *
     * ```js
     * const show = new Show(data);
     * ```
     *
     * @param data Received raw data from the spotify api
     * @param client Spotify Client
     */
    constructor(data: any, client: Client);
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Refreshes this show in cache
     */
    fetch(): Promise<Show>;
    /**
     * Returns the episodes by fetching!
     *
     * @param force If true, will directly fetch else will search for cache
     * @param limit Limit of your results
     */
    getEpisodes(force?: boolean, limit?: number): Promise<Episode[]>;
}
