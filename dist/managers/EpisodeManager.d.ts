import Episode from "../structures/Episode";
import BaseManager from "./BaseManager";
/**
 * A class which manages the episodes
 */
export default class EpisodeManager extends BaseManager {
    /**
     * Get a spotify episode information by spotify id!
     *
     * @param id Spotify episode id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where we need to fetch the details!
     * @example await client.episodes.get('id');
     */
    get(id: string, force?: boolean, market?: string): Promise<Episode | null>;
}
export type { Episode };
