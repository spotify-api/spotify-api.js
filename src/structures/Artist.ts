import { Followers, Image } from './Interface';
import SimplifiedArtist from './SimplifiedArtist';

class Artist extends SimplifiedArtist {

    followers: Followers;
    genres: string;
    images: Image[];
    popularity: number;

    constructor(data){

        super(data);

        this.followers = data.followers;
        this.genres = data.genres;
        this.images = data.images;
        this.popularity = data.popularity;

    };

};

export default Artist;