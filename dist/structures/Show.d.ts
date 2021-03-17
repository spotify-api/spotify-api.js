import { Copyright, Image, RawObject } from "../Types";
import Episode from "./Episode";
import Client from "../Client";
/**
 * Spotify Api's Show Object!
 */
export default class Show {
    readonly data: any;
    readonly client: Client;
    episodes: Episode[];
    availableMarkets: string[];
    copyrights: Copyright[];
    description: string;
    explicit: boolean;
    externalUrls: RawObject;
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
    /**
     * Spotify Api's Show Object!
     *
     * @param data Received raw data from the spotify api
     * @param client Spotify Client
     * @example const show = new Show(data, client);
     */
    constructor(data: any, client: Client);
    /**
     * Returns a code image of the Show!
     *
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Fetches the show and refreshes the cache!
     */
    fetch(): Promise<Show>;
    /**
     * Returns the episodes by fetching!
     *
     * @param limit Limit of your results
     * @param force If true, will directly fetch else will search for cache
     * @example show.getEpisodes();
     */
    getEpisodes(options?: {
        limit?: number;
        offset?: number;
        market?: string;
    }, force?: boolean): Promise<Episode[]>;
}
