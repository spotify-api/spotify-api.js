import Track from '../structures/Track';
import BaseManager from './BaseManager';
/**
 * A class which manages the tracks api!
 */
export default class TrackManager extends BaseManager {
    /**
     * Returns the spotify track information by id
     *
     * @param id Spotify track id
     * @param force await client.users.get('id');
     * @example await client.tracks.get('id');
     */
    get(id: string, force?: boolean): Promise<Track | null>;
}
export type { Track };
