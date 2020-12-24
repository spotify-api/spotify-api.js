import { Image } from './Interface';
import Util from '../Spotify';
import Client from '../Client';
import Album from './Album';
import Track from './Track';

class Artist{

    readonly data: any;
    readonly client!: Client;

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
        this.albums = [];
        this.topTracks = [];
        this.relatedArtists = [];
        this.simplified = true;

        if('popularity' in data) {
            this.simplified = false;
            this.followers = data.followers.total;
            this.genres = data.genres;
            this.popularity = data.popularity;
        }

    };

    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Returns a fresh artist without searching in the cache!
     */
    async fetch(): Promise<Artist> {
        return await this.client.artists.get(this.id, true);
    }

    /**
     * Returns the albums of the artist
     * 
     * @param force If true will directly fetch else will return from cache
     * @param limit Limit of your results
     */
    async getAlbums(force: boolean = false, limit: number = 20): Promise<Album[]> {
        if(!force){
            if(this.albums.length) return this.albums;
        }

        const data = await this.client.artists.getAlbums(this.id, { limit });
        this.albums = data;
        return data;
    }

    /**
     * Returns the top tracks of the artist
     * 
     * @param force If true will directly fetch else will return from cache
     */
    async getTopTracks(force: boolean = false): Promise<Track[]> {
        if(!force){
            if(this.topTracks.length) return this.topTracks;
        }

        const data = await this.client.artists.topTracks(this.id);
        this.topTracks = data;
        return data;
    }

    /**
     * Returns the artists who are related with the current artist
     * 
     * @param force If true will directly fetch else will return from cache
     */
    async getRelatedArtists(force: boolean = false): Promise<Artist[]> {
        if(!force){
            if(this.relatedArtists.length) return this.relatedArtists;
        }

        const data = await this.client.artists.relatedArtists(this.id);
        this.relatedArtists = data;
        return data;
    }

    /**
     * Verify if this artist is followed by the current user but only if you have the required scopes for the current user
     * This method uses the client.user.followsArtist method
     */
    async follows(): Promise<boolean> {
        return (await this.client.user.followsArtist(this.id))[0];
    }

    /**
     * Follows this artist
     */
    async follow(): Promise<void> {
        await this.client.user.followArtist(this.id);
    }

    /**
     * Unfollows a artist
     */
    async unfollow(): Promise<void> {
        await this.client.user.unfollowArtist(this.id);
    }

};

export default Artist;