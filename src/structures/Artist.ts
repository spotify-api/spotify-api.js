// @ts-nocheck

import { Image } from './Interface';
import SimplifiedArtist from './SimplifiedArtist';

class Artist extends SimplifiedArtist {

    followers: number;
    genres: string;
    images: Image[];
    popularity: number;

    constructor(data){

        super(data);

        this.followers = data.followers.total;
        this.genres = data.genres;
        this.images = data.images;
        this.popularity = data.popularity;

    };

};

export default Artist;