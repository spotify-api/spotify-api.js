import Artist from './Artist';
import { DominantColor } from './Interface';

class SimplifiedTrack {

    artists: Artist[];
    availableMarkets: string[];
    discNumber: number;
    durationMs: number;
    explicit: boolean;
    externalUrls: any;
    href: string;
    id: string;
    name: string;
    previewUrl: string;
    trackNumber: number;
    type: string;
    uri: string;
    codeImage?: string;
    dominantColor?: DominantColor;

    constructor(data){

        this.artists = data.artists.map(x => new Artist(x));
        this.availableMarkets = data.available_markets;
        this.discNumber = data.disc_number;
        this.durationMs = data.duration_ms;
        this.explicit = data.explicit;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.previewUrl = data.preview_url;
        this.trackNumber = data.track_number;
        this.type = data.type;
        this.uri = data.uri;
        
        if(data.codeImage){
            this.codeImage = data.codeImage;
            this.dominantColor = data.dominantColor;
        };

    };
};

export default SimplifiedTrack;