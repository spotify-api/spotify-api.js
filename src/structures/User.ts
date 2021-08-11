import type { PublicUser, SpotifyType, ExternalUrl, Image } from "api-types";
import { hexToRgb } from "../Util";

/**
 * Spotify api's user object.
 */
export class User {

    /** 
     * The name displayed on the user’s profile. null if not available. 
     */
    public displayName: string | null;

    /** 
     * The Spotify user ID for the user.
     */
    public id: string;

    /** 
     * The Spotify URI for the user. 
     */
    public uri: string;

    /** 
     * The Spotify object type which will be 'user'.
     */
    public type: SpotifyType = 'user';

    /** 
     * The user’s profile image. 
     */
    public images: Image[];

    /** 
     * Information about the followers of the user. 
     */
    public totalFollowers: number;

    /** 
     * Known external URLs for this user. 
     */
    public externalURL: ExternalUrl;

    /**
     * To create a js object conataing camel case keys of the PublicUser data with additional functions.
     * 
     * @param client The spotify client.
     * @example const user = new User(fetchedData);
     */
    public constructor(data: PublicUser) {
        this.displayName = data.display_name;
        this.id = data.id;
        this.uri = data.uri;
        this.images = data.images;
        this.totalFollowers = data.followers.total;
        this.externalURL = data.external_urls;
    }

    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    public makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    
}