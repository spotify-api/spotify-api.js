import { LinkedTrack, Restriction } from "./Interface";

export default class {

    album: any;
    artists: any[];
    availableMarkets: string[];
    discNumber: number;
    durationMs: number;
    explicit: boolean;
    externalIds: any;
    externalUrls: any;
    href: string;
    id: string;
    name: string;
    popularity: number;
    previewUrl: string;
    trackNumber: number;
    type: string;
    uri: string;
    playable?: boolean;
    linkedForm?: LinkedTrack;
    restrictions?: Restriction;

    constructor(data){

        this.album = data.album;
        this.artists = data.artists;
        this.availableMarkets = data.available_markets;
        this.discNumber = data.disc_number;
        this.durationMs = data.duration_ms;
        this.explicit = data.explicit;
        this.externalIds = data.external_ids;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.popularity = data.popularity;
        this.previewUrl = data.preview_url;
        this.trackNumber = data.track_number;
        this.type = data.type;
        this.uri = data.uri;
        this.playable = data.is_playable;
        this.linkedForm = data.linked_form;
        this.restrictions = data.restrictions;
        
    };
};