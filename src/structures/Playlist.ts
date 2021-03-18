import User from './User';
import Track from './Track';
import Episode from './Episode';
import { Image, PagingOptions, PlaylistTracksRef, RawObject, SpotifyTypes, SpotifyURI } from '../Types';
import Client from '../Client';

/**
 * Return object by PlaylistTrack function!
 */
export interface PlaylistTrackType{
    addedAt: string | null;
    local: boolean;
    readonly addedBy: User | null;
    readonly track: Track | Episode;
}

/**
 * Creates a playlist track object using spotify api data and spotify client!
 * 
 * @param data Raw data from spotify api
 * @param client Your spotify client!
 * @example Spotify.PlaylistTrack(data, client);
 */
export function PlaylistTrack(data, client: Client): PlaylistTrackType {

    return {
        addedAt: data.added_at,
        local: data.is_local,
        get addedBy(): User | null {
            return data.added_by ? new User(data.added_by, client) : null;
        },
        get track(): Track | Episode {
            return data.track.type == 'track' ? new Track(data.track, client) : new Episode(data.track, client);
        }
    }

}

/**
 * Spotify Api's Playlist Object
 */
 export default class Playlist {

    readonly data: any;
    readonly client!: Client;

    collaborative: boolean;
    description: string;
    externalUrls: RawObject;
    href: string;
    id: string;
    images: Image[];
    name: string;
    public: boolean | null;
    snapshotID: string;
    type: SpotifyTypes;
    uri: SpotifyURI;

    totalFollowers?: number;

    /**
     * Spotify Api's Playlist Object
     * 
     * @param data Received raw data from the spotify api
     * @param client Your Spotify Client!
     * @example const playlist = new Playlist(data, client);
     */
    constructor(data: any, client: Client){

        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = data.external_urls;
        this.totalFollowers = data.followers?.total;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.public = data.public;
        this.snapshotID = data.snapshot_id;
        this.type = data.type;
        this.uri = data.uri;

    };

    /**
     * Returns the Spotify User who created the playlist!
     * @readonly
     */
    get owner(): User {
        return new User(this.data.owner, this.client);
    };

    /**
     * Returns the total tracks of playlist in the form of array of PlaylistTracks!
     * Will return an PlaylistTrackRef object if a simplified playlist has been supplied!
     * @readonly
     */
    get tracks(): PlaylistTrackType[] | PlaylistTracksRef {
        return this.data.tracks.items ? this.data.tracks.items.map(x => PlaylistTrack(x, this.client)) : this.data.tracks;
    };

    /**
     * Fetches playlist and refreshes the cache!
     * 
     * @example playlist.fetch();
     */
    async fetch(): Promise<Playlist> {
        return await this.client.playlists.get(this.id, true) as Playlist;
    }
    
    /**
     * Returns the images of the playlist!
     * 
     * @example playlist.getImages();
     */
    async getImages(): Promise<Image[]> {
        return await this.client.playlists.getImages(this.id);
    }

    /**
     * Returns all the tracks of the playlist!
     * 
     * @param options Options such as limit and offset
     * @example playlist.getTracks()
     */
    async getTracks(options?: PagingOptions): Promise<PlaylistTrackType[]> {
        return await this.client.playlists.getTracks(this.id, options);
    }

    /**
     * Returns a code image of the Playlist!
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

};