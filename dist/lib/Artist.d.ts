/**
 * Artist Manager file
 */
import Track from "../structures/Track";
import Client from "../Client";
import Spotify from "../Spotify";
import Artist from "../structures/Artist";
import Album from "../structures/Album";
/**
 * Class of all methods related to artists
 */
export default class ArtistManager extends Spotify {
    client: Client;
    /**
     * Class of all methods related to artists
     *
     * @param client Your Spotify Client
     */
    constructor(client: Client);
    /**
     * Search artists efficiently!
     *
     * @param q Your search query
     * @param options Options such as limit and params
     * @example const artist = await spotify.artists.search("alec benjamin", { limit: 1 }); // Searches for the artist with a default limit as 1...
     */
    search(q: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Artist[]>;
    /**
     * Retruns Spotify Artist information by id!
     *
     * @param id Id of the artist
     * @param force If true will directly fetch else will search cache
     * @example const artist = await spotify.artists.get("artist id"); // Get artists by id
     */
    get(id: string, force?: boolean): Promise<Artist>;
    /**
     * Returns the albums of the artist by id!
     *
     * @param id Id of the artist
     * @param options Options to configure your search
     * @example const albums = await spotify.artists.getAlbums("artist id"); // Get albums of the artists by id.
     */
    getAlbums(id: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Album[]>;
    /**
     * Returns the top tracks of the Spotify Artist by id!
     *
     * @param id Id of the artist
     * @param options Options to configure your search
     * @example const topTracks = await spotify.artists.topTracks("artist id"); // Returns top tracks of the artist. Has advanced and limit option too...
     */
    getTopTracks(id: string, options?: {
        limit?: string;
        params?: any;
    }): Promise<Track[]>;
    /**
     * Returns the related artists of the Spotify Artist by id!
     *
     * @param id Id of the artist
     * @param options Options to configure your search
     * @example const relatedArtists = await spotify.artists.relatedArtists("artist id"); // Returns related artists.
     */
    getRelatedArtists(id: string, options?: {
        limit?: string;
        params?: any;
    }): Promise<Artist[]>;
    /**
     * Verify if you follow the artists by ids! Will work only if you have a current user token!
     *
     * @param ids Ids of the artist or artists
     */
    follows(...ids: string[]): Promise<boolean[]>;
    /**
     * Follow artists by their id's! Will work only if you have a current user token!
     *
     * @param ids Ids of the artist or artists
     */
    follow(...ids: string[]): Promise<void>;
    /**
     * Unfollow artists by their id's! Will work only if you have a current user token!
     *
     * @param ids Ids of the artist or artists
     */
    unfollow(...ids: string[]): Promise<void>;
}
