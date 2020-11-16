/**
 * Track lib file
 */
import Spotify from "../Spotify";
/**
 * Class of all methods related to tracks
 */
declare class Track extends Spotify {
    /**
     * **Example:**
     * ```js
     * const track = await spotify.tracks.search("oh my god by alec benjamin", { limit: 1, }); // Searches for the track and limit will be 20 by default
       const advanced = await spotify.tracks.search("oh my god by alec benjamin", {
           limit: 1,
           advanced: true,
       }); // Same but this will return a `codeImage` and `dominantColor` key with it!
     * ```
     *
     * @param q Your query
     * @param options Options to configure your search...
     */
    search(q: string, options?: {
        limit?: null | string | number;
        advanced?: boolean;
    }): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const track = await spotify.tracks.get("track id"); // Get tracks by id...
     * ```
     *
     * @param id Id of the track
     */
    get(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const audioAnalysis = await spotify.tracks.audioAnalysis("track id"); // Get audio analysis of the track
     * ```
     *
     * @param id Id of the track
     */
    audioFeatures(id: string): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const audioFeatures = await spotify.tracks.audioFeatures("track id"); // Get audio features of the track
     * ```
     *
     * @param id Id of the track
     */
    audioAnalysis(id: string): Promise<any>;
}
export default Track;
