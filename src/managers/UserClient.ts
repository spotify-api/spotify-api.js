import { Client } from "../Client";
import { CamelCaseObjectKeys } from "../Interface";

import type { 
    SpotifyType, 
    Image, 
    ExternalUrl, 
    UserProductType, 
    ExplicitContentSettings, 
    PrivateUser 
} from "api-types";

/**
 * The client which handles all the current user api endpoints and with the details of the current user.
 */
export class UserClient {

    /** 
     * The name displayed on the user’s profile. null if not available. 
     */
    public displayName?: string | null;

    /** 
     * The Spotify user ID for the user.
     */
    public id?: string;

    /** 
     * The Spotify URI for the user. 
     */
    public uri?: string;

    /** 
     * The Spotify object type which will be 'user'.
     */
    public type?: SpotifyType = 'user';

    /** 
     * The user’s profile image. 
     */
    public images?: Image[];

    /** 
     * Information about the followers of the user. 
     */
    public totalFollowers?: number;

    /** 
     * Known external URLs for this user. 
     */
    public externalURL?: ExternalUrl;

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
     * The client which handles all the current user api endpoints and with the details of the current user.
     * 
     * @param client The spotify api client.
     * @example const user = new UserClient(client);
     */
    public constructor(public client: Client) {}

    /**
     * Patches the current user details info to this manager.
     */
    public async patchInfo() {
        const data: PrivateUser = await this.client.fetch('/me');

        this.displayName = data.display_name;
        this.id = data.id;
        this.uri = data.uri;
        this.images = data.images;
        this.totalFollowers = data.followers.total;
        this.externalURL = data.external_urls;
        this.email = data.email;
        this.product = data.product;
        this.country = data.country;
        this.explicitContent = {
            filterEnabled: data.explicit_content.filter_enabled,
            filterLocked: data.explicit_content.filter_locked
        };
    }

}