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
    constructor(data: any);
}
