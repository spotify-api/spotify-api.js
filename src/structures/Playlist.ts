/**
 * Playlist Related Structures
 */
import { Image } from "./Interface";
import User from "./User";
import Track from "./Track";
import Episode from "./Episode";
import Util from "../Spotify";
import Client from "../Client";

/**
 * Spotify Api's Playlist Track Object
 * This is a extended form object used in playlist's tracks!
 */
export class PlaylistTrack{

    readonly data: any;
    readonly client!: Client;

    addedAt: string | null;
    local: boolean;

    /**
     * **Example:**
     * 
     * ```js
     * const track = new PlaylistTrack(data, client);
     * ```
     * 
     * @param data Received raw data from the spotify api
     * @param client Spotify Client
     */
    constructor(data: any, client: Client){
        
        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.addedAt = data.added_at;
        this.local = data.is_local;
        
    };

    /**
     * Returns a Spotify User who added this track to the playlist! If no one did, will return null!
     * @readonly
     */
    get addedBy(): User | null {
        if('added_by' in this.data) return new User(this.data.added_by, this.client);
        else return null;
    };

    /**
     * Full info of the track!
     * @readonly
     */
    get track(): Track | Episode {
        return this.data.track.description ? new Episode(this.data.track, this.client) : new Track(this.data.track, this.client);
    };

};

/**
 * Spotify Api's Playlist Object
 */
export default class Playlist {

    readonly data: any;
    readonly client!: Client;

    collaborative: boolean;
    description: string;
    externalUrls: any;
    totalFollowers?: number;
    href: string;
    id: string;
    images: Image[];
    name: string;
    public: boolean | null;
    snapshotId: string;
    type: string;
    uri: string;

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
        this.totalFollowers = data.followers.total;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.public = data.public;
        this.snapshotId = data.snapshot_id;
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
     * @readonly
     */
    get tracks(): PlaylistTrack[] {
        return this.data.tracks.items.map(x => new PlaylistTrack(x, this.client));
    };

    /**
     * Returns a code image of the Playlist!
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Refetches the playlist and returns you the new one and updates the cache too!
     */
    async fetch(): Promise<Playlist> {
        return await this.client.playlists.get(this.id, true);
    }

    /**
     * Follows this playlist!
     * Will work only if you have a current user token!
     */
    async follow(): Promise<void> {
        await this.client.user.followPlaylist(this.id);
    }

    /**
     * Unfollows this playlist!
     * Will work only if you have a current user token!
     */
    async unfollow(): Promise<void> {
        await this.client.user.unfollowPlaylist(this.id);
    }

};