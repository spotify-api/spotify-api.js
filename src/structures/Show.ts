import type { Client } from "../Client";
import type { Episode } from "./Episode";
import { createCacheStructArray } from "../Cache";
import { hexToRgb } from "../Util";

import type {
    SimplifiedShow,
    Show as RawShow,
    Copyright,
    ExternalUrl,
    Image,
    SpotifyType
} from "api-types";

/**
 * Spotify api's show object.
 */
export class Show {

    /** 
     * A list of the countries in which the show can be played, identified by their ISO 3166-1 alpha-2 code. 
     */
    public availableMarkets: string[];

    /** 
     * The copyright statements of the show. 
     */
    public copyrights: Copyright[];

    /**
     * A description of the show. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed. 
     */
    public description: string;

    /**
     * Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown). 
     */
    public explicit: boolean;

    /** 
     * External URLs for this show. 
     */
    public externalURL: ExternalUrl;
    
    /** 
     * A description of the show. This field may contain HTML tags. 
     */
    public htmlDescription: string;

    /** 
     * The Spotify ID for the show. 
     */
    public id: string;

    /** 
     * The cover art for the show in various sizes, widest first. 
     */
    public images: Image[];

    /** 
     * True if all of the show’s episodes are hosted outside of Spotify’s CDN. This field might be null in some cases. 
     */
    public isExternallyHosted: boolean;

    /** 
     * A list of the languages used in the show, identified by their ISO 639 code. 
     */
    public languages: string[];

    /** 
     * The media type of the show. 
     */
    public mediaType: string;

    /** 
     * The name of the show. 
     */
    public name: string;

    /** 
     * The publisher of the show. 
     */
    public publisher: string;

    /** 
     * The object type: “show”. 
     */
    public type: SpotifyType;

    /** 
     * The Spotify URI for the show. 
     */
    public uri: string;

    /**
     * The episodes of the show.
     */
    public episodes?: Episode[];

    /**
     * To create a js object conataing camel case keys of the SimplifiedShow and Show data with additional functions.
     * 
     * @param client The spotify client.
     * @example const show = new Show(fetchedData, client);
     */
    public constructor(data: SimplifiedShow | RawShow, client: Client) {
        this.availableMarkets = data.available_markets;
        this.description = data.description;
        this.copyrights = data.copyrights;
        this.explicit = data.explicit;
        this.externalURL = data.external_urls;
        this.htmlDescription = data.html_description;
        this.id = data.id;
        this.images = data.images;
        this.isExternallyHosted = data.is_externally_hosted;
        this.languages = data.languages;
        this.mediaType = data.media_type;
        this.name = data.name;
        this.publisher = data.publisher;
        this.type = data.type;
        this.uri = data.uri;
        
        if ('episodes' in data) this.episodes = createCacheStructArray('episodes', client, (data as RawShow).episodes);
    }

    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    public makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    
}