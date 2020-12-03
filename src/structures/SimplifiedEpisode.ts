/**
 * Episode Structure
 */
import Util from '../Spotify';
import { Image, DominantColor, ResumePoint, CodeImageReturn } from "./Interface";

const util = new Util();

/**
 * Simplified Episode class
 */
class SimplifiedEpisode {

    data: any;
    audioPreviewUrl: string;
    description: string;
    duration: number;
    explicit: boolean;
    externalUrls: any;
    href: string;
    id: string;
    images: Image[];
    isExternallyHosted: boolean;
    playable: boolean;
    language?: string;
    languages: string[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: string;
    type: string;
    uri: string;
    resumePoint?: ResumePoint;
    codeImage?: string;
    dominantColor?: DominantColor;

    /**
     * **Example:**
     * 
     * ```js
     * const episode = new SimplifiedEpisode(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){

        Object.defineProperty(this, 'data', { value: data, writable: false });

        this.audioPreviewUrl = data.audio_preview_url;
        this.description = data.description;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.isExternallyHosted = data.is_externally_hosted;
        this.playable = data.is_playable;
        if('language' in data) this.language = data.language
        this.languages = data.languages;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.type = data.type;
        this.uri = data.uri;

        if('resume_point' in data){
            this.resumePoint = {
                fullyPlayed: data.resume_point.fully_played,
                resumePoint: data.resume_point.resume_position_ms
            };
        };

    };

    /**
     * Returns the code image with dominant color
     */
    async getCodeImage(): Promise<CodeImageReturn> {
        return await util.getCodeImage(this.uri);
    };

    /**
     * Returns the uri data
     */
    async getURIData(): Promise<any> {
        return await util.getURIData(this.uri);
    };

    /**
     * Returns date structure of this.releaseDate
     * @readonly
     */
    get releasedAt(): Date {
        return new Date(this.releaseDate);
    };

};

export default SimplifiedEpisode;