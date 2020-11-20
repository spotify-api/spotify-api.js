import { Image, Restriction } from "./Interface";
import SimplifiedArtist from "./SimplifiedArtist";

export default class {

    albumGroup?: string;
    albumType: string;
    artists: SimplifiedArtist[];
    availableMarkets: string[];
    externalUrls: any;
    href: string;
    id: string;
    images: Image[];
    name: string;
    releaseDate?: string;
    releaseDatePrecision?: string;
    restrictions?: Restriction;
    type: string;
    uri: string;

    constructor(data){

        this.albumGroup = data.album_group;
        this.albumType = data.album_type;
        this.artists = data.artists;
        this.availableMarkets = data.available_markets;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.restrictions = data.restrictions;
        this.type = data.type;
        this.uri = data.uri;

    };
};