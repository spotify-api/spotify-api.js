import { Copyright, Image, Paging, PagingOptions, RawObject, SpotifyTypes, SpotifyURI } from "../Types";
import Episode from "./Episode";
import Client from "../Client";
/**
 * Spotify Api's Show Object!
 */
export default class Show {
    readonly data: any;
    readonly client: Client;
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
    episodes?: Episode[];
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
    getEpisodes(options?: PagingOptions): Promise<Paging<Episode>>;
    /**
     * Add this show to your save list!
     * @example await show.add();
     */
    add(): Promise<boolean>;
    /**
     * Remove this show from your save list!
     * @example await show.delete();
     */
    delete(): Promise<boolean>;
    /**
     * Returns a boolean stating is this shows saved on the user's savelist (library)
     * @example const isSaved = await show.saved();
     */
    saved(): Promise<boolean>;
}
