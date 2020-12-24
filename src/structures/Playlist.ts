/**
 * Playlist class
 */
import { Image } from "./Interface";
import PublicUser from "./PublicUser";
import Track from "./Track";
import Episode from "./Episode";
import Util from "../Spotify";
import Client from "../Client";

export class PlaylistTrack{

    readonly data: any;
    readonly client!: Client;

    addedAt: string | null;
    local: boolean;

    /**
     * **Example:**
     * 
     * ```js
     * const track = new PlaylistTrack(data);
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
     * Added by user object
     * @readonly
     */
    get addedBy(): PublicUser | null {
        if('added_by' in this.data) return new PublicUser(this.data.added_by, this.client);
        else return null;
    };

    /**
     * Full info of the track
     * @readonly
     */
    get track(): Track | Episode {
        return this.data.track.description ? new Episode(this.data.track, this.client) : new Track(this.data.track, this.client);
    };

};

/**
 * Playlist structure
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
    codeImage: string;

    /**
     * **Example:**
     * 
     * ```js
     * const playlist = new Playlist(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
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
        this.codeImage = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${this.uri}`;

    };

    /**
     * Owner user object
     * @readonly
     */
    get owner(): PublicUser {
        return new PublicUser(this.data.owner, this.client);
    };

    /**
     * Returns the array of playlist tracks
     * @readonly
     */
    get tracks(): PlaylistTrack[] {
        return this.data.tracks.items.map(x => new PlaylistTrack(x, this.client));
    };

    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Returns a fresh playlist without searching in the cache!
     */
    async fetch(): Promise<Playlist> {
        return await this.client.playlists.get(this.id, true);
    }

    /**
     * Follows this playlist
     */
    async follow(): Promise<void> {
        await this.client.user.followPlaylist(this.id);
    }

    /**
     * Unfollows a playlist
     */
    async unfollow(): Promise<void> {
        await this.client.user.unfollowPlaylist(this.id);
    }

};