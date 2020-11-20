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
    constructor(data: any);
}
