import type { Client } from "../Client";
import type { CamelCaseObjectKeys } from "../Interface";
import type { Playlist } from "../structures/Playlist";
import { SpotifyAPIError } from "../Error";
import { createCacheStructArray } from "../Cache";
import type { 
    SpotifyType, 
    Image, 
    ExternalUrl, 
    UserProductType, 
    ExplicitContentSettings, 
    PrivateUser, 
    CreatePlaylistQuery
} from "api-types";
import { Artist } from "../structures/Artist";

/**
 * The client which handles all the current user api endpoints and with the details of the current user.
 */
export class UserClient {

    /**
     * The spotify client for this UserClient to work with.
     */
    public readonly client!: Client;

    /** 
     * The name displayed on the user’s profile. null if not available. 
     */
    public displayName?: string | null;

    /** 
     * The Spotify user ID for the user.
     */
    public id!: string;

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
     * All the methods in this class requires the user authorized token.
     * 
     * @param client The spotify api client.
     * @example const user = new UserClient(client);
     */
    public constructor(client: Client) {
        Object.defineProperty(this, 'client', { value: client });
    }

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
        if (data.explicit_content) this.explicitContent = {
            filterEnabled: data.explicit_content.filter_enabled,
            filterLocked: data.explicit_content.filter_locked
        };

        return this;
    }

    /**
     * Get the list of playlists of the current user.
     * 
     * @param options The limit, offset query parameter options.
     * @example const playlists = await client.user.getPlaylists();
     */
    public async getPlaylists(
        options: {
            limit?: number,
            offset?: number
        } = {}
    ): Promise<Playlist[]> {
        const fetchedData = await this.client.fetch(`/me/playlists`, { params: options });
        return fetchedData ? createCacheStructArray('playlists', this.client, fetchedData.items) : [];
    }

    /**
     * Create a playlist.
     * 
     * @param playlist The playlist details to set.
     * @example const playlist = await client.user.createPlaylist({ name: 'My playlist' });
     */
    public createPlaylist(playlist: CreatePlaylistQuery): Promise<Playlist | null> {
        return this.client.playlists.create(this.id, playlist);
    }

    /**
     * Verify if the current user follows a paticular playlist.
     * 
     * @param playlistID The id of the spotify playlist.
     * @example const currentUserFollows = await client.user.followsPlaylist('id');
     */
    public followsPlaylist(playlistID: string): Promise<boolean> {
        return this.client.users.followsPlaylist(playlistID, this.id).then(x => x[0] || false);
    }

    /**
     * Get an array of artists who are been followed by the current usser.
     * 
     * @param options The limit, after query parameters. The after option is the last artist ID retrieved from the previous request.
     * @example const artists = await client.user.getFollowingArtists();
     */
    public async getFollowingArtists(
        options: {
            limit?: number,
            after?: string
        } = {}
    ): Promise<Artist[]> {
        return createCacheStructArray('artists', this.client, await this.client.fetch(`/me/following`, {
            params: { type: 'artist', ...options }
        }) || []);
    }

}