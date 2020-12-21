//@ts-nocheck

/**
 * Playlist class
 */

import { PlaylistTrack } from "./PlaylistUtils";
import { CodeImageReturn } from "./Interface";
import PublicUser from "./PublicUser";
import Util from '../Spotify';

const util = new Util();

/**
 * Playlist structure
 */
export default class Playlist {

    data: any;
    collaborative: boolean;
    description: string;
    externalUrls: any;
    totalFollowers: number;
    href: string;
    id: string;
    images: any[];
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
    constructor(data){

        Object.defineProperty(this, 'data', { value: data, writable: false });

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
        return new PublicUser(this.data.owner);
    };

    /**
     * Returns the array of playlist tracks
     * @readonly
     */
    get tracks(): PlaylistTrack[] {
        return this.data.tracks.items.map(x => new PlaylistTrack(x));
    };

    /**
     * Returns the code image with dominant color
     */
    async getCodeImage(): Promise<CodeImageReturn> {
        return await util.getCodeImage(this.uri);
    };

    /**
     * Returns the uri data
     */
    async getURIData(): Promise<any> {
        return await util.getURIData(this.uri);
    };

};