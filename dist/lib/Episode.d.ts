import Spotify from "../Spotify";
import EpisodeStructure from "../structures/Episode";
/**
 * Class of all methods related to episode enpoints
 */
declare class Episode extends Spotify {
    /**
     * **Example:**
     * ```js
     * const episode = await spotify.episodes.get('id'); // Returns the episode information by id
     * ```
     *
     * @param id Id of the episode
     */
    get(id: string): Promise<EpisodeStructure>;
}
export default Episode;
