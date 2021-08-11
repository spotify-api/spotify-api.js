import type { PublicUser, PrivateUser, SpotifyType, ExternalUrl, Image, UserProductType, ExplicitContentSettings } from "api-types";
import type { CamelCaseObjectKeys } from "../Interface";
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
    public readonly type: SpotifyType = 'user';

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
     * The spotify subscription level of the user. If the user has the paticualr authorized scope for it.
     */
    public product?: UserProductType;

    /** 
     * The country of the user, as set in the user’s account profile. 
     */
    public country?: string;

    /** 
     * The user’s email address, as entered by the user when creating their account. 
     */
    public email?: string;
    
    /** 
     * The user’s explicit content settings. 
     */
    public explicitContent?: CamelCaseObjectKeys<ExplicitContentSettings>;

    /**
     * To create a js object conataing camel case keys of the PublicUser or PrivateUser data with additional functions.
     * 
     * @param client The spotify client.
     * @example const user = new User(fetchedData);
     */
    public constructor(data: PublicUser | PrivateUser) {
        this.displayName = data.display_name;
        this.id = data.id;
        this.uri = data.uri;
        this.images = data.images;
        this.totalFollowers = data.followers.total;
        this.externalURL = data.external_urls;
        
        if ('email' in data) {
            this.email = data.email;
            this.product = data.product;
            this.country = data.country
            this.explicitContent = {
                filterEnabled: data.explicit_content.filter_enabled,
                filterLocked: data.explicit_content.filter_locked
            }
        }
    }

    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    
}