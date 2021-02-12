/**
 * Playlist Manager file
 */
import Spotify from "../Spotify";
import Client from "../Client";
import { Image } from "../structures/Interface";
import PlaylistStructure, { PlaylistTrack } from "../structures/Playlist";
/**
 * Class of all Spotify Api Methods related to playlists
 */
export default class PlaylistManager extends Spotify {
    client: Client;
    /**
     * Class of all Spotify Api Methods related to playlists
     *
     * @param client Your Spotify Client
     */
    constructor(client: Client);
    /**
     * Returns the information of Spotify Playlist by its id!
     *
     * @param id Id of the playlist
     * @param force If true then will fetch directly instead of searching cache
     * @example const playlist = await spotify.playlists.get("id"); // Get playlist data by id
     */
    get(id: string, force?: boolean): Promise<PlaylistStructure>;
    /**
     * Returns the tracks of the playlist by the playlist id!
     *
     * @param id Id of the playlist
     * @param options Options to configure your search
     * @example const tracks = await spotify.playlists.getTracks("id", { limit: 1 }); // Get all tracks in an album by id. Has advanced option too...
     */
    getTracks(id: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<PlaylistTrack[]>;
    /**
     * Returns the images of the playlist by the playlist id!
     *
     * @param id Playlist id
     * @example const [coverImage] = await spotify.playlists.getCoverImage('id') // Get cover image of the playlist by id
     */
    getImages(id: string): Promise<Image[]>;
    /**
     * Follow a playlist by id! Will work only if you have a current user token!
     *
     * @param id Id of the playlist
     */
    follow(id: string): Promise<void>;
    /**
     * Unfollow a playlist by id! Will work only if you have a current user token!
     *
     * @param id Id of the playlist
     */
    unfollow(id: string): Promise<void>;
}
