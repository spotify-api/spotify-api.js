import Playlist, { PlaylistTrackType } from "../structures/Playlist";
import { Image, PagingOptions } from "../Types";
import BaseManager from "./BaseManager";
/**
 * A class which manages the playlists
 */
export default class PlaylistManager extends BaseManager {
    /**
     * Get a spotify playlist information by spotify id!
     *
     * @param id Spotify playlist id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where the data needs to be fetched from
     * @example await client.playlists.get('id');
     */
    get(id: string, force?: boolean, market?: string): Promise<Playlist | null>;
    /**
     * Return all the tracks of the spotify playlist!
     *
     * @param id The id of the playlist
     * @param options Basic PagingOptions
     * @example await client.playlists.getTracks('id');
     */
    getTracks(id: string, options?: PagingOptions): Promise<PlaylistTrackType[]>;
    /**
     * Returns the images of the playlists!
     *
     * @param id ID of the playlist
     * @example client.playlists.getImages(id);
     */
    getImages(id: string): Promise<Image[]>;
}
export type { Playlist };
