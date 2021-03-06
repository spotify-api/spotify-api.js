import Client from '../Client';
import Track from './Track';
import { Image, Restriction, Copyright, RawObject, SpotifyTypes, SpotifyURI, PagingOptions, Paging, ExternalIDs } from '../Types';
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
    restrictions: Restriction<'market' | 'product' | 'explicit'> | null;

    albumGroup?: 'album' | 'single' | 'compilation' | 'appears_on';
    totalTracks?: number;
    copyrights?: Copyright[];
    externalIds?: ExternalIDs;
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
    get tracks(): Paging<Track> {
        return this.data.tracks ? {
            limit: this.data.tracks.limit,
            total: this.data.tracks.total,
            offset: this.data.tracks.offset,
            items: this.data.tracks.items.map(x => new Track(x, this.client))
        } : {
            limit: 0,
            total: 0,
            offset: 0,
            items: []
        };
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
        return new Date(this.releaseDate);
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

    /**
     * Add this album to your save list!
     * @example await album.add();
     */
    async add(): Promise<boolean> {
        return await this.client.user.addAlbums(this.id);
    }

    /**
     * Remove this album from your save list!
     * @example await album.delete();
     */
    async delete(): Promise<boolean> {
        return await this.client.user.deleteAlbums(this.id);
    }

    /**
     * Returns a boolean stating is this albums saved on the user's savelist (library)
     * @example const isSaved = await album.saved();
     */
    async saved(): Promise<boolean> {
        return (await this.client.user.hasAlbums(this.id))[0] || false;
    }

};

export default Album;