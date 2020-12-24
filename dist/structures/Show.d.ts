/**
 * Show Structure
 */
import { Copyright, Image } from "./Interface";
import Episode from './Episode';
import Client from '../Client';
import CacheManager from '../CacheManager';
/**
 * Show Structure
 */
export default class Show {
    readonly data: any;
    readonly client: Client;
    episodes: Episode[] | CacheManager<string, Episode>;
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
    /**
     * This method uses the client.user.deleteShow method
     * This method deletes this show from your saved list
     */
    delete(): Promise<void>;
    /**
     * This method uses the client.user.addShow method
     * This method adds this show to your saved list
     */
    add(): Promise<void>;
}
