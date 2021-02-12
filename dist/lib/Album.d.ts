/**
 * Album Manager file
 */
import Spotify from "../Spotify";
import Client from "../Client";
import Album from '../structures/Album';
import Track from "../structures/Track";
/**
 * Class of all Spotify Api Methods related to albums
 */
export default class AlbumManager extends Spotify {
    client: Client;
    /**
     * Class of all Spotify Api Methods related to playlists
     *
     * @param client Your Spotify Client
     */
    constructor(client: Client);
    /**
     * Search albums across spotify api efficiently!
     *
     * @param q Your query
     * @param options Options such as limit and params
     * @example const album = await spotify.albums.search("these two windows", { limit: 1 }); // Searches for an album.
     */
    search(q: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Album[]>;
    /**
     * Returns a Spotify Album information by Album id!
     *
     * @param id Id of the album
     * @param force If true then will directly fetch instead of searching cache
     * @example const album = await spotify.albums.get("album id"); // Get album by id...
     */
    get(id: string, force?: boolean): Promise<Album>;
    /**
     * Returns array of tracks present in the album by album id!
     *
     * @param id Id of the song
     * @param options Options such as limit and params
     * @example const tracks = await spotify.albums.getTracks("album id", { limit: 5 }); // Get all tracks of an album.
     */
    getTracks(id: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Track[]>;
    /**
     * This is uses the client.user.deleteAlbum method
     * This deletes from your savelist
     *
     * @param ids Id of the albums
     */
    delete(...ids: string[]): Promise<void>;
    /**
     * This uses the client.user.addAlbum method
     * This adds new albums to the saved list
     *
     * @param ids Id of the albums
     */
    add(...ids: string[]): Promise<void>;
}
