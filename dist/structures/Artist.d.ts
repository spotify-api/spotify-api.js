import { Image } from './Interface';
import SimplifiedArtist from './SimplifiedArtist';
declare class Artist extends SimplifiedArtist {
    followers: number;
    genres: string;
    images: Image[];
    popularity: number;
    constructor(data: any);
}
export default Artist;
