/**
 * SimplifiedPlaylist Structure
 */
import { DominantColor, Image, CodeImageReturn } from "./Interface";
import { PlaylistTrack, PlaylistOwner } from "./PlaylistUtils";
import Util from '../Spotify';

const util = new Util();
/**
 * SimplifiedPlaylist class
 */
class SimplifiedPlaylist {

    data: any;
    collaborative: boolean;
    description: string | null;
    externalUrls: any;
    href: string;
    id: string;
    images: Image[];
    name: string;
    primaryColor: any;
    public: boolean | null;
    snapshotId: string;
    type: string;
    uri: string;
    totalTracks: number;
    codeImage?: string;
    dominantColor?: DominantColor;

    /**
     * **Example:**
     * 
     * ```js
     * const playlist = new SimplifiedPlaylist(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){

        Object.defineProperty(this, 'data', { value: data });

        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.primaryColor = data.primary_color;
        this.public = data.public;
        this.snapshotId = data.snapshot_id;
        this.type = data.type;
        this.uri = data.uri;
        this.totalTracks = data.tracks.total;

    };

    /**
     * Owner object
     * @readonly
     */
    get owner(): PlaylistOwner {
        return new PlaylistOwner(this.data.owner);
    };

    /**
     * Returns an array of simplified tracks
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

export default SimplifiedPlaylist;