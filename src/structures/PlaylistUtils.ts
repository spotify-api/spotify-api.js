/**
 * Playlist Utility Structures
 */
import Track from "./Track";
import PublicUser from "./PublicUser";
import Episode from "./Episode";
import { CodeImageReturn } from "./Interface";
import Util from "../Spotify";

const util = new Util();

/**
 * PlaylistTrack class
 */
export class PlaylistTrack{

    data: any;
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
     */
    constructor(data){
        
        Object.defineProperty(this, 'data', { value: data });

        this.addedAt = data.added_at;
        this.local = data.is_local;
        
    };

    /**
     * Added by user object
     * @readonly
     */
    get addedBy(): PublicUser | null {
        if('added_by' in this.data) return new PublicUser(this.data.added_by);
        else return null;
    };

    /**
     * Full info of the track
     * @readonly
     */
    get track(): Track | Episode {
        return this.data.track.description ? new Episode(this.data.track) : new Track(this.data.track);
    };

};

/**
 * Public User Class
 */
export class PlaylistOwner {

    data: any;
    displayName: string;
    externalUrls: any;
    href: string;
    id: string;
    type: string;
    uri: string;
    codeImage: string;

    /**
     * **Example:**
     * 
     * ```js
     * const user = new PlaylistOwner(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){

        Object.defineProperty(this, 'data', { value: data });

        this.displayName = data.display_name;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;
        this.codeImage = `https://scannables.scdn.co/uri/plain/jpeg/e8e6e6/black/1080/${data.uri}`;

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