import User from './User';
import Track from './Track';
import Episode from './Episode';
import { Image, PagingOptions, RawObject, SpotifyTypes, SpotifyURI } from '../Types';
import Client from '../Client';
/**
 * Return object by PlaylistTrack function!
 */
export interface PlaylistTrackType {
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
export declare function PlaylistTrack(data: any, client: Client): PlaylistTrackType;
/**
 * Spotify Api's Playlist Object
 */
export default class Playlist {
    readonly data: any;
    readonly client: Client;
    collaborative: boolean;
    description: string;
    externalUrls: RawObject;
    totalFollowers?: number;
    href: string;
    id: string;
    images: Image[];
    name: string;
    public: boolean | null;
    snapshotID: string;
    type: SpotifyTypes;
    uri: SpotifyURI;
    /**
     * Spotify Api's Playlist Object
     *
     * @param data Received raw data from the spotify api
     * @param client Your Spotify Client!
     * @example const playlist = new Playlist(data, client);
     */
    constructor(data: any, client: Client);
    /**
     * Returns the Spotify User who created the playlist!
     * @readonly
     */
    get owner(): User;
    /**
     * Returns the total tracks of playlist in the form of array of PlaylistTracks!
     * @readonly
     */
    get tracks(): PlaylistTrackType[];
    /**
     * Fetches playlist and refreshes the cache!
     *
     * @example playlist.fetch();
     */
    fetch(): Promise<Playlist>;
    /**
     * Returns the images of the playlist!
     *
     * @example playlist.getImages();
     */
    getImages(): Promise<Image[]>;
    /**
     * Returns all the tracks of the playlist!
     *
     * @param options Options such as limit and offset
     * @example playlist.getTracks()
     */
    getTracks(options?: PagingOptions): Promise<PlaylistTrackType[]>;
    /**
     * Returns a code image of the Playlist!
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
}
