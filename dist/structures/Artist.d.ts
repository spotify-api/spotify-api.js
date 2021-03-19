import Client from '../Client';
import Album from './Album';
import Track from './Track';
import { Image, Paging, PagingOptions, RawObject, SpotifyTypes, SpotifyURI } from '../Types';
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
    type: SpotifyTypes;
    uri: SpotifyURI;
    images: Image[];
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
    getAlbums(options?: PagingOptions): Promise<Paging<Album>>;
    /**
     * Returns the top tracks of the artist
     *
     * @param options Basic PagingOptions
     * @example await artist.getTopTracks();
     */
    getTopTracks(options?: PagingOptions): Promise<Track[]>;
    /**
     * Returns the related artists of the artist
     *
     * @param options Basic PagingOptions
     * @example await artist.getRelatedArtists();
     */
    getRelatedArtists(options?: PagingOptions): Promise<Artist[]>;
    /**
     * Follow this artist!
     * @example await artist.follow();
     */
    follow(): Promise<boolean>;
    /**
     * Unfollow this artist!
     * @example await artist.unfollow();
     */
    unfollow(): Promise<boolean>;
    /**
     * Verify if the current user follows this artist!
     * @example const follows = await artists.follows();
     */
    follows(): Promise<boolean>;
}
