import { Image } from './Interface';
import Client from '../Client';
import Album from './Album';
import Track from './Track';
declare class Artist {
    readonly data: any;
    readonly client: Client;
    externalUrls: any;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
    images: Image[];
    albums: Album[];
    topTracks: Track[];
    relatedArtists: Artist[];
    simplified: boolean;
    followers?: number;
    genres?: string;
    popularity?: number;
    constructor(data: any, client: Client);
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Returns a fresh artist without searching in the cache!
     */
    fetch(): Promise<Artist>;
    /**
     * Returns the albums of the artist
     *
     * @param force If true will directly fetch else will return from cache
     * @param limit Limit of your results
     */
    getAlbums(force?: boolean, limit?: number): Promise<Album[]>;
    /**
     * Returns the top tracks of the artist
     *
     * @param force If true will directly fetch else will return from cache
     */
    getTopTracks(force?: boolean): Promise<Track[]>;
    /**
     * Returns the artists who are related with the current artist
     *
     * @param force If true will directly fetch else will return from cache
     */
    getRelatedArtists(force?: boolean): Promise<Artist[]>;
}
export default Artist;
