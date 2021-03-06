import Client from '../Client';
import Album from './Album';
import Track from './Track';
import { Image, Paging, PagingOptions, RawObject, SpotifyTypes, SpotifyURI } from '../Types';

/**
 * Spotify Api's artist object
 */
export default class Artist{

    readonly data!: any;
    readonly client!: Client;

    externalUrls: RawObject;
    href: string;
    id: string;
    name: string;
    type: SpotifyTypes;
    uri: SpotifyURI;
    images: Image[]

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
    constructor(data: any, client: Client){

        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.uri = data.uri;
        this.images = data.images || [];

        if('popularity' in data) {
            this.totalFollowers = data.followers.total;
            this.genres = data.genres;
            this.popularity = data.popularity;
        }

    };

    /**
     * Returns a code image of the artist!
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Fetches the Episode and refreshes the cache!
     */
    async fetch(): Promise<Artist> {
        return await this.client.artists.get(this.id) as Artist;
    }

    /**
     * Get albums of the artist!
     * 
     * @param options Basic paging options
     * @example await artist.getAlbums();
     */
    async getAlbums(options?: PagingOptions): Promise<Paging<Album>> {
        return await this.client.artists.getAlbums(this.id, options);
    }

    /**
     * Returns the top tracks of the artist
     * 
     * @param options Basic PagingOptions
     * @example await artist.getTopTracks();
     */
    async getTopTracks(options?: PagingOptions): Promise<Track[]> {
        return await this.client.artists.getTopTracks(this.id, options);
    }

    /**
     * Returns the related artists of the artist
     * 
     * @param options Basic PagingOptions
     * @example await artist.getRelatedArtists();
     */
    async getRelatedArtists(options?: PagingOptions): Promise<Artist[]> {
        return await this.client.artists.getRelatedArtists(this.id, options);
    }

    /**
     * Follow this artist!
     * @example await artist.follow();
     */
    async follow(): Promise<boolean> {
        return await this.client.user.followArtists(this.id);
    }

    /**
     * Unfollow this artist!
     * @example await artist.unfollow();
     */
    async unfollow(): Promise<boolean> {
        return await this.client.user.unfollowArtists(this.id);
    }

    /**
     * Verify if the current user follows this artist!
     * @example const follows = await artists.follows();
     */
    async follows(): Promise<boolean> {
        return (await this.client.user.followsArtists(this.id))[0] || false;
    }

}