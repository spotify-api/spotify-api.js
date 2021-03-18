import { Copyright, Image, PagingOptions, RawObject, SpotifyTypes, SpotifyURI } from "../Types";
import Episode from "./Episode";
import Client from "../Client";
import Collection from "../Collection";

/**
 * Spotify Api's Show Object!
 */
export default class Show {

    readonly data: any;
    readonly client!: Client;

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
    constructor(data: any, client: Client){

        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.availableMarkets = data.available_markets;
        this.copyrights = data.copyrights;
        this.description = data.description;
        this.explicit = data.explicit;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.isExternallyHosted = data.is_externally_hosted;
        this.languages = data.languages;
        this.mediaType = data.media_type;
        this.name = data.name;
        this.publisher = data.publisher;
        this.type = data.type;
        this.uri = data.uri;
        this.episodes = data.episodes.items.map(x => new Episode(x, this.client));

    }

    /**
     * Returns a code image of the Show!
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Fetches the show and refreshes the cache!
     */
    async fetch(): Promise<Show> {
        return await this.client.shows.get(this.id, true) as Show;
    }

    /**
     * Returns the episodes by fetching!
     * 
     * @param options Basic PagingOptions
     * @example await show.getEpisodes();
     */
    async getEpisodes(options?: PagingOptions): Promise<Episode[]> {
        const episodes = await this.client.shows.getEpisodes(this.id, options);
        this.episodes = episodes;
        return episodes;
    }

};