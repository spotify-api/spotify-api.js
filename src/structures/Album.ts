import Util from '../Spotify';
import SimplifiedArtist from './SimplifiedArtist';
import SimplifiedTrack from './SimplifiedTrack';
import { Copyright, Image } from './Interface';

const util = new Util();

class Album {

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

    constructor(data){

        this.albumType = data.album_type;
        this.artists = data.artists.map(x => new SimplifiedArtist(x));
        this.availableMarkets = data.available_markets;
        this.copyrights = data.copyrights;
        this.externalIds = data.external_ids;
        this.externalUrls = data.external_urls;
        this.genres = data.genres;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.popularity = data.popularity;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.tracks = data.tracks.items.map(x => new SimplifiedTrack(x));
        this.type = data.type;
        this.uri = data.uri;

    };

    async getCodeImage(){
        return await util.getCodeImage(this.uri);
    };

};

export default Album;