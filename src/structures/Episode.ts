import type { Client } from "../Client";
import type { Show } from "./Show";
import type { CamelCaseObjectKeys } from "../Interface";
import { createCacheStruct } from "../Cache";
import { hexToRgb } from "../Util";
import type { 
    SimplifiedEpisode, 
    Episode as RawEpisode, 
    ExternalUrl, 
    Image, 
    Restriction, 
    ResumePoint, 
    SpotifyType 
} from "api-types";

/**
 * Spotify api's episode object.
 */
export class Episode {

    /** 
     * A URL to a 30 second preview (MP3 format) of the episode. null if not available. 
     */
    public audioPreviewURL?: string;

    /** 
     * A description of the episode. HTML tags are stripped away from this field, use html_description field in case HTML tags are needed. 
     */
    public description: string;

    /** 
     * The episode length in milliseconds. 
     */
    public duration: number;

    /** 
     * Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). 
     */
    public explicit: boolean;

    /** 
     * External URLs for this episode 
     */
    public externalURL: ExternalUrl;

    /** 
     * A description of the episode. This field may contain HTML tags. 
     */
    public htmlDescription: string;

    /** 
     * The Spotify ID for the episode. 
     */
    public id: string;

    /** 
     * The cover art for the episode in various sizes, widest first. 
     */
    public images: Image[];

    /** 
     * True if the episode is hosted outside of Spotify’s CDN. 
     */
    public isExternallyHosted: boolean;

    /** 
     * True if the episode is playable in the given market. Otherwise false. 
     */
    public isPlayable: boolean;
    
    /** 
     * A list of the languages used in the episode, identified by their ISO 639 code. 
     */
    public languages: string[];

    /** 
     * The name of the episode. 
     */
    public name: string;

    /** 
     * The date the episode was first released, for example "1981-12-15". Depending on the precision, it might be shown as "1981" or "1981-12". 
     */
    public releaseDate: string;

    /** 
     * The precision with which release_date value is known: "year", "month", or "day". 
     */
    public releaseDatePrecision: string;

    /** 
     * Included in the response when a content restriction is applied. 
     */
    public restrictions: Restriction[];

    /** 
     * The user’s most recent position in the episode. Set if the supplied access token is a user token and has the scope ‘user-read-playback-position’. 
     */
    public resumePoint?: CamelCaseObjectKeys<ResumePoint>;

    /** 
     * The object type: “episode”. 
     */
    public type: SpotifyType;

    /** 
     * The Spotify URI for the episode 
     */
    public uri: string;

    /**
     * The show which the episode belongs to.
     */
    public show?: Show;

    /**
     * To create a js object conataing camel case keys of the SimplifiedEpisode and Episode data with additional functions.
     * 
     * @param client The spotify client.
     * @example const episode = new Episode(fetchedData, client);
     */
    public constructor(data: SimplifiedEpisode | RawEpisode, client: Client) {
        this.audioPreviewURL = data.audio_preview_url as string;
        this.description = data.description;
        this.duration = data.duration_ms;
        this.externalURL = data.external_urls;
        this.explicit = data.explicit;
        this.htmlDescription = data.html_description;
        this.id = data.id;
        this.images = data.images;
        this.isExternallyHosted = data.is_externally_hosted;
        this.isPlayable = data.is_playable;
        this.languages = data.languages;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.restrictions = data.restrictions;
        this.type = data.type;
        this.uri = data.uri;

        // shows
        
        if (data.resume_point) {
            this.resumePoint = {
                fullyPlayed: data.resume_point.fully_played,
                resumePositionMs: data.resume_point.resume_position_ms
            }
        }

        if ('show' in data) this.show = createCacheStruct('shows', client, data.show)
    }

    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    public makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    
}