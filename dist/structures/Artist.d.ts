import Client from '../Client';
import Album from './Album';
import Track from './Track';
import { Image, PagingOptions, RawObject } from '../Types';
/**
 * Spotify Api's artist object
 */
export default class Artist {
    readonly data: any;
    readonly client: Client;
    externalUrls: RawObject;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
    images: Image[];
    simplified: boolean;
    totalFollowers?: number;
    genres?: string;
    popularity?: number;
    /**
     * Structure for the Spotify Api's Artist Object!
     *
     * @param data Received Raw data by the Spotify Api!
     * @param client Your Spotify Client!
     * @example const artist = new Artist(data, client);
     */
    constructor(data: any, client: Client);
    /**
     * Returns a code image of the artist!
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Fetches the Episode and refreshes the cache!
     */
    fetch(): Promise<Artist>;
    /**
     * Get albums of the artist!
     *
     * @param options Basic paging options
     * @example await artist.getAlbums();
     */
    getAlbums(options: PagingOptions): Promise<Album[]>;
    /**
     * Returns the top tracks of the artist
     *
     * @param options Basic PagingOptions
     * @example await artist.getTopTracks();
     */
    getTopTracks(options: PagingOptions): Promise<Track[]>;
    /**
     * Returns the related artists of the artist
     *
     * @param options Basic PagingOptions
     * @example await artist.getRelatedArtists();
     */
    getRelatedArtists(options: PagingOptions): Promise<Artist[]>;
}
