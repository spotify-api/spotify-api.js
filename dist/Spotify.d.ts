/**
 * File of basic utility
 * All the lib files extends to this class to make work faster
 */
import { FetchOptions } from './structures/Interface';
/**
 * Spotify utility class
 * This class is actually not meant for use! It is just used to write codes shortly instead of long things!
 */
declare class Util {
    token: string;
    /**
     * The main utility class
     *
     * @param oauth Your auth token
     */
    constructor(oauth?: string);
    /**
     * Function used to convert the hex string to rgb array.
     * This is used in makeCodeImage functions!
     *
     * @param hex Hex to be converted
     */
    static hexToRgb(hex: string): number[];
    /**
     * Function used to convert the hex string to rgb array.
     * The same function which is in static!
     *
     * @param hex Hex to be converted
     */
    hexToRgb(hex: string): number[];
    /**
     * Quick way to access spotify api without large fetching codes through axios....
     * Instead of using this, you can use the client.request method!
     *
     * @param options Fetch options
     */
    fetch(options: FetchOptions): Promise<any>;
}
export default Util;
