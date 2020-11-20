import SimplifiedArtist from './SimplifiedArtist';
import SimplifiedTrack from './SimplifiedTrack';
import { Copyright, Image } from './Interface';
declare class Album {
    albumType: string;
    artists: SimplifiedArtist[];
    availableMarkets: string[];
    copyrights: Copyright[];
    externalIds: any;
    externalUrls: any;
    genres: any[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    releaseDate: string;
    releaseDatePrecision: string;
    tracks: SimplifiedTrack[];
    type: string;
    uri: string;
    constructor(data: any);
    getCodeImage(): Promise<import("../Spotify").CodeImageReturn>;
}
export default Album;
