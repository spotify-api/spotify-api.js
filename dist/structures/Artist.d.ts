import { Followers, Image } from './Interface';
import SimplifiedArtist from './SimplifiedArtist';
declare class Artist extends SimplifiedArtist {
    followers: Followers;
    genres: string;
    images: Image[];
    popularity: number;
    constructor(data: any);
}
export default Artist;
