/**
 * Artist Structure
 */
import { Image } from './Interface';
import Client from '../Client';
import Album from './Album';
import Track from './Track';
/**
 * Structure for the Spotify Api's Artist Object!
 */
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
     * Refetches the artist and refreshes the cache!
     */
    fetch(): Promise<Artist>;
    /**
     * Returns the albums of the artist
     *
     * @param limit Limit of your results
     * @param force If true will directly fetch else will return from cache
     */
    getAlbums(limit?: number, force?: boolean): Promise<Album[]>;
    /**
     * Returns the top tracks of the artist
     *
     * @param force If true will directly fetch else will return from the cache!
     */
    getTopTracks(force?: boolean): Promise<Track[]>;
    /**
     * Returns the artists who are related with the current artist
     *
     * @param force If true will directly fetch else will return from cache
     */
    getRelatedArtists(force?: boolean): Promise<Artist[]>;
    /**
     * Verify if this artist is followed by the current user but only if you have the required scopes for the current user
     * This method uses the client.user.followsArtist method
     */
    follows(): Promise<boolean>;
    /**
     * Follow this artist
     */
    follow(): Promise<void>;
    /**
     * Unfollow this artist
     */
    unfollow(): Promise<void>;
}
export default Artist;
