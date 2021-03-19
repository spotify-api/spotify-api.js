import Client from '../Client';
import Track from './Track';
import { Image, Restriction, Copyright, RawObject, SpotifyTypes, SpotifyURI, PagingOptions, Paging } from '../Types';
import Artist from './Artist';

/**
 * Spotify api's album object!
 */
class Album {

    readonly data: any;
    readonly client!: Client;

    albumType: 'album' | 'single' | 'compilation';
    availableMarkets: string[];
    externalUrls: RawObject;
    href: string;
    id: string;
    images: Image[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: string;
    type: SpotifyTypes;
    uri: SpotifyURI;
    label: string | null;
    restrictions: Restriction | null;

    albumGroup?: 'album' | 'single' | 'compilation' | 'appears_on';
    totalTracks?: number;
    copyrights?: Copyright[];
    externalIds?: any;
    popularity?: number;
    genres?: string[];

    /**
     * **Example:**
     * 
     * ```js
     * const album = new Album(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     * @param client Spotify Client
     */
    constructor(data: any, client: Client){

        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.albumType = data.album_type;
        this.albumGroup = data.album_group;
        this.availableMarkets = data.available_markets;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.type = data.type;
        this.uri = data.uri;
        this.totalTracks = data.total_tracks;
        this.label = data.label || null;
        this.restrictions = data.restrictions || null;

        if('popularity' in data){
            this.popularity = data.popularity;
            this.genres = data.genres;
            this.copyrights = data.copyrights;
            this.externalIds = data.external_ids;
        }

    };

    /**
     * Returns a code image of the Album!
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Returns the array of tracks in the album!
     * Will send empty array if the album object supplied was simplified!
     * @readonly
     */
    get tracks(): Track[] {
        return this.data.tracks ? this.data.tracks.items.map(x => new Track(x, this.client)) : [];
    }

    /**
     * Returns the array of artists of the album!
     * @readonly
     */
    get artists(): Artist[] {
        return this.data.artists.map(x => new Artist(x, this.client));
    }; 

    /**
     * Returns the Date object when the album was released!
     * @readonly
     */
    get releasedAt(): Date {
        return new Date(this.releaseDatePrecision);
    };

    /**
     * Refetches the album and refreshes the cache!
     */
    async fetch(): Promise<Album> {
        return await this.client.albums.get(this.id, true) as Album;
    }; 

    /**
     * Refetches the tracks of the album!
     * 
     * @param options Basic PagingOptions
     * @example await album.getTracks();
     */
    async getTracks(options?: PagingOptions): Promise<Paging<Track>> {
        return await this.client.albums.getTracks(this.id, options);
    } 

};

export default Album;