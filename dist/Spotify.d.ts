/**
 * File of basic utility
 * All the lib files extends to this class to make work faster
 */
import { GetOptions } from './structures/Interface';
/**
 * Spotify utility class
 * You can access this uility class through the `spotify.Client.utils`
 */
declare class Util {
    token: string;
    /**
     * @param oauth Your auth token
     *
     * Library class
     */
    constructor(oauth?: string);
    /**
     * @param hex Hex to be converted
     *
     * Function used to convert the hex string to rgb array.
     */
    static hexToRgb(hex: string): number[];
    /**
     * @param hex Hex to be converted
     *
     * Function used to convert the hex string to rgb array.
     */
    hexToRgb(hex: string): number[];
    /**
     * @param options Fetch options
     *
     * Quick way to access spotify api without large fetching codes through axios....
     */
    fetch(options: GetOptions): Promise<any>;
}
export default Util;
