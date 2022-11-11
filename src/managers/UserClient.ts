import type { Client } from "../Client";
import type { CamelCaseObjectKeys, Saved, TimeRange } from "../Interface";
import type { Playlist } from "../structures/Playlist";
import type { Artist } from "../structures/Artist";
import type { Track } from "../structures/Track";
import type { Episode } from "../structures/Episode";
import type { Show } from "../structures/Show";
import type { Album } from "../structures/Album";
import { Player } from "./Player";
import { SpotifyAPIError } from "../Error";
import { createCacheStructArray, createCacheSavedStructArray } from "../Cache";
import type { 
    SpotifyType, 
    Image, 
    ExternalUrl, 
    UserProductType, 
    ExplicitContentSettings, 
    PrivateUser, 
    CreatePlaylistQuery,
    Paging
} from "spotify-types";

/**
 * The client which handles all the current user api endpoints and with the details of the current user.
 */
export class UserClient {

    /**
     * The spotify client for this UserClient to work with.
     */
    public readonly client!: Client;

    /**
     * The manager for the player api endpoints.
     */
    public player: Player;

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
     * The client which handles all the current user api endpoints with the details of the current user.
     * All the methods in this class requires the user authorized token.
     * 
     * @param client The spotify api client.
     * @example const user = new UserClient(client);
     */
    public constructor(client: Client) {
        this.player = new Player(client);
        Object.defineProperty(this, 'client', { value: client });
    }

    /**
     * Patches the current user details info to this manager.
     */
    public async patchInfo() {
        const data: PrivateUser = await this.client.fetch('/me');
        if (!data) throw new SpotifyAPIError("Could not load private user data from the user authorized token.");

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
     * @param fetchAll Retrieve all playlist at once if more than 50.
     * @example const playlists = await client.user.getPlaylists();
     */
    public async getPlaylists(
        options: {
            limit?: number,
            offset?: number
        } = {},
        fetchAll: boolean = false
    ): Promise<Playlist[]> {
        const fetchedData: Paging<Playlist> = await this.client.fetch(`/me/playlists`, { params: options });
        let playlists: Array<Playlist> = fetchedData.items,
            length = playlists.length;

        if (fetchAll && fetchedData.total > length) {
            for (let offset = length; offset < fetchedData.total; offset += length) {
                let playlistBatch: Paging<Playlist> = await this.client.fetch(`/me/playlists`, { params: { limit: length , offset} });
                playlists.push(...playlistBatch.items);
            }
        }

        return fetchedData ? createCacheStructArray('playlists', this.client, playlists) : [];
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
     * Verify if the current user follows one or more artists.
     * 
     * @param ids The array of spotify artist ids.
     * @example const [followsArtist] = await client.user.followsArtists('id1');
     */
    public followsArtists(...ids: string[]): Promise<boolean[]> {
        return this.client.fetch(`/me/following/contains`, {
            params: {
                type: 'artist',
                ids: ids.join(',')
            }
        }).then(x => x || ids.map(() => false))
    }

    /**
     * Verify if the current user follows one or more users.
     * 
     * @param ids The array of spotify user ids.
     * @example const [followsUser] = await client.user.followsUsers('id1');
     */
    public followsUsers(...ids: string[]): Promise<boolean[]> {
        return this.client.fetch(`/me/following/contains`, {
            params: {
                type: 'user',
                ids: ids.join(',')
            }
        }).then(x => x || ids.map(() => false))
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
        const fetchedData = await this.client.fetch(`/me/following`, { params: { type: 'artist', ...options } });
        return fetchedData ? createCacheStructArray('artists', this.client, fetchedData.artists.items) : [];
    }

    /**
     * Get the top tracks of the user based on the current user's affinity.
     * 
     * @param options The timeRange, limit, offset query paramaters.
     * @example const topTracks = await client.user.getTopTracks();
     */
    public async getTopTracks(
        options: {
            timeRange?: TimeRange,
            limit?: number,
            offset?: number
        } = {}
    ): Promise<Track[]> {
        const fetchedData = await this.client.fetch(`/me/top/tracks`, {
            params: {
                time_range: options.timeRange,
                limit: options.limit,
                offset: options.offset
            }
        });

        return fetchedData ? createCacheStructArray('tracks', this.client, fetchedData.items) : [];
    }

    /**
     * Get the top artists of the user based on the current user's affinity.
     * 
     * @param options The timeRange, limit, offset query paramaters.
     * @example const topArtists = await client.user.getTopArtists();
     */
    public async getTopArtists(
        options: {
            timeRange?: TimeRange,
            limit?: number,
            offset?: number
        } = {}
    ): Promise<Artist[]> {
        const fetchedData = await this.client.fetch(`/me/top/artists`, {
            params: {
                time_range: options.timeRange,
                limit: options.limit,
                offset: options.offset
            }
        });

        return fetchedData ? createCacheStructArray('artists', this.client, fetchedData.items) : [];
    }

    /**
     * Get all the saved albums of the current user.
     * 
     * @param options The limit, offset, market query paramaters.
     * @example const savedAlbums = await client.user.getSavedAlbums();
     */
    public async getSavedAlbums(
        options: {
            limit?: number,
            offset?: number,
            market?: string
        }
    ): Promise<Saved<Album>[]> {
        const fetchedData = await this.client.fetch(`/me/albums`, { params: options });
        return fetchedData ? createCacheSavedStructArray('albums', this.client, fetchedData.items) : [];
    }

    /**
     * Save albums to the current user library.
     * 
     * @param ids The array of spotify user ids.
     * @example await client.user.saveAlbums('id1', 'id2');
     */
    public saveAlbums(...ids: string[]): Promise<boolean> {
        return this.client.fetch(`/me/albums`, {
            method: 'PUT',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }

    /**
     * Remove albums from the current user library.
     * 
     * @param ids The array of spotify user ids.
     * @example await client.user.removeAlbums('id1', 'id2');
     */
    public removeAlbums(...ids: string[]): Promise<boolean> {
        return this.client.fetch(`/me/albums`, {
            method: 'DELETE',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }

    /**
     * Verify if the current user has a paticular one or more albums.
     * 
     * @param ids The array of spotify album ids.
     * @example const [hasFirstAlbum, hasSecondAlbum] = await client.user.hasAlbums('id1', 'id2');
     */
    public hasAlbums(...ids: string[]): Promise<boolean[]> {
        return this.client.fetch(`/me/albums/contains`, { params: { ids: ids.join(',') } })
            .then(x => x || ids.map(() => false));
    }

    /**
     * Get all the saved tracks of the current user.
     * 
     * @param options The limit, offset, market query paramaters.
     * @example const savedTracks = await client.user.getSavedTracks();
     */
    public async getSavedTracks(
        options: {
            limit?: number,
            offset?: number,
            market?: string
        }
    ): Promise<Saved<Track>[]> {
        const fetchedData = await this.client.fetch(`/me/tracks`, { params: options });
        return fetchedData ? createCacheSavedStructArray('tracks', this.client, fetchedData.items) : [];
    }

    /**
     * Save tracks to the current user library.
     * 
     * @param ids The array of spotify user ids.
     * @example await client.user.saveTracks('id1', 'id2');
     */
    public saveTracks(...ids: string[]): Promise<boolean> {
        return this.client.fetch(`/me/tracks`, {
            method: 'PUT',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }

    /**
     * Remove tracks from the current user library.
     * 
     * @param ids The array of spotify user ids.
     * @example await client.user.removeTracks('id1', 'id2');
     */
    public removeTracks(...ids: string[]): Promise<boolean> {
        return this.client.fetch(`/me/tracks`, {
            method: 'DELETE',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }

    /**
     * Verify if the current user has a paticular one or more tracks.
     * 
     * @param ids The array of spotify track ids.
     * @example const [hasFirstTrack, hasSecondTrack] = await client.user.hasTracks('id1', 'id2');
     */
    public hasTracks(...ids: string[]): Promise<boolean[]> {
        return this.client.fetch(`/me/tracks/contains`, { params: { ids: ids.join(',') } })
            .then(x => x || ids.map(() => false));
    }

    /**
     * Get all the saved episodes of the current user.
     * 
     * @param options The limit, offset, market query paramaters.
     * @example const savedEpisodes = await client.user.getSavedEpisodes();
     */
    public async getSavedEpisodes(
        options: {
            limit?: number,
            offset?: number,
            market?: string
        }
    ): Promise<Saved<Episode>[]> {
        const fetchedData = await this.client.fetch(`/me/episodes`, { params: options });
        return fetchedData ? createCacheSavedStructArray('episodes', this.client, fetchedData.items) : [];
    }

    /**
     * Save episodes to the current user library.
     * 
     * @param ids The array of spotify user ids.
     * @example await client.user.saveEpisodes('id1', 'id2');
     */
    public saveEpisodes(...ids: string[]): Promise<boolean> {
        return this.client.fetch(`/me/episodes`, {
            method: 'PUT',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }

    /**
     * Remove episodes from the current user library.
     * 
     * @param ids The array of spotify user ids.
     * @example await client.user.removeEpisodes('id1', 'id2');
     */
    public removeEpisodes(...ids: string[]): Promise<boolean> {
        return this.client.fetch(`/me/episodes`, {
            method: 'DELETE',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }

    /**
     * Verify if the current user has a paticular one or more episodes.
     * 
     * @param ids The array of spotify episode ids.
     * @example const [hasFirstEpisode, hasSecondEpisode] = await client.user.hasEpisodes('id1', 'id2');
     */
    public hasEpisodes(...ids: string[]): Promise<boolean[]> {
        return this.client.fetch(`/me/episodes/contains`, { params: { ids: ids.join(',') } })
            .then(x => x || ids.map(() => false));
    }

    /**
     * Get all the saved shows of the current user.
     * 
     * @param options The limit, offset, market query paramaters.
     * @example const savedShows = await client.user.getSavedShows();
     */
    public async getSavedShows(
        options: {
            limit?: number,
            offset?: number,
            market?: string
        }
    ): Promise<Saved<Show>[]> {
        const fetchedData = await this.client.fetch(`/me/shows`, { params: options });
        return fetchedData ? createCacheSavedStructArray('shows', this.client, fetchedData.items) : [];
    }

    /**
     * Save shows to the current user library.
     * 
     * @param ids The array of spotify user ids.
     * @example await client.user.saveShows('id1', 'id2');
     */
    public saveShows(...ids: string[]): Promise<boolean> {
        return this.client.fetch(`/me/shows`, {
            method: 'PUT',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }

    /**
     * Remove shows from the current user library.
     * 
     * @param ids The array of spotify user ids.
     * @example await client.user.removeShows('id1', 'id2');
     */
    public removeShows(...ids: string[]): Promise<boolean> {
        return this.client.fetch(`/me/shows`, {
            method: 'DELETE',
            params: { ids: ids.join(',') }
        }).then(x => x != null);
    }

    /**
     * Verify if the current user has a paticular one or more shows.
     * 
     * @param ids The array of spotify show ids.
     * @example const [hasFirstShow, hasSecondShow] = await client.user.hasShows('id1', 'id2');
     */
    public hasShows(...ids: string[]): Promise<boolean[]> {
        return this.client.fetch(`/me/shows/contains`, { params: { ids: ids.join(',') } })
            .then(x => x || ids.map(() => false));
    }

}