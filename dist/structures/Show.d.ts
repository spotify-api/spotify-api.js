/**
 * Show Structure
 */
import { Copyright, Image } from "./Interface";
import Episode from './Episode';
import Client from '../Client';
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
     * Refreshes this show in cache and returns you the new one!
     */
    fetch(): Promise<Show>;
    /**
     * Returns the episodes by fetching!
     *
     * @param limit Limit of your results
     * @param force If true, will directly fetch else will search for cache
     */
    getEpisodes(limit?: number, force?: boolean): Promise<Episode[]>;
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
