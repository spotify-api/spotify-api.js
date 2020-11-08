import Spotify from "../Spotify";
/**
 * Class of all methods related to episode enpoints
 */
declare class Show extends Spotify {
    /**
     * **Example:**
     * ```js
     * const show = await spotify.shows.get('id'); // Returns show information by id
     * ```
     *
     * @param id Id of the show
     */
    get(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const show = await spotify.shows.getEpisodes('id'); // Returns all episodes of show by id
     * ```
     *
     * @param id Id of the show
     * @param limit Limit of your results
     */
    getEpisodes(id: string, limit?: number): Promise<any>;
}
export default Show;
