import { Copyright, Image, PagingOptions, RawObject, SpotifyTypes, SpotifyURI } from "../Types";
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
    type: SpotifyTypes;
    uri: SpotifyURI;
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
     * @param options Basic PagingOptions
     * @example await show.getEpisodes();
     */
    getEpisodes(options?: PagingOptions): Promise<Episode[]>;
}
