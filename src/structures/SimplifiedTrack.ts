import Artist from './Artist';
import { DominantColor, CodeImageReturn, LinkedTrack, Restriction } from './Interface';
import Util from '../Spotify';

const util = new Util();

class SimplifiedTrack {

    artists: Artist[];
    availableMarkets: string[];
    discNumber: number;
    duration: number;
    explicit: boolean;
    externalUrls: any;
    href: string;
    id: string;
    name: string;
    previewUrl: string;
    trackNumber: number;
    type: string;
    uri: string;
    local: boolean | null;
    restrictions: Restriction | null;
    playable?: boolean;
    linkedFrom?: LinkedTrack;
    codeImage?: string;
    dominantColor?: DominantColor;

    constructor(data){

        this.artists = data.artists.map(x => new Artist(x));
        this.availableMarkets = data.available_markets;
        this.discNumber = data.disc_number;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.previewUrl = data.preview_url;
        this.trackNumber = data.track_number;
        this.type = data.type;
        this.uri = data.uri;
        
        if('linked_form' in data){
            this.playable = data.is_playable;
            this.linkedFrom = data.linked_from;
        };

        this.restrictions = data.restrictions || null;
        this.local = data.is_local || null;

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
     * Check wheater if it is restricted or not
     * @readonly
     */
    get restricted(): boolean {
        return Boolean(this.restrictions);
    };

};

export default SimplifiedTrack;