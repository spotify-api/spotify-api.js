import Playlist from "../structures/Playlist";
import { Image } from "../Types";
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
     * @example await client.playlists.get('id');
     */
    get(id: string, force?: boolean): Promise<Playlist | null>;
    /** Get track */
    /**
     * Returns the images of the playlists!
     *
     * @param id ID of the playlist
     * @example client.playlists.getImages(id);
     */
    getImages(id: string): Promise<Image[]>;
}
export type { Playlist };
