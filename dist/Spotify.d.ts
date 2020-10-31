/**
 * File of basic utility
 * All the lib files extends to this class to make work faster
 */
/**
 * Interface of this.fetch options
 */
interface getOptions {
    link: string;
    headers?: any;
    params?: any;
}
/**
 * Spotify utility class
 * You can access this uility class through the `spotify.Client.utils`
 */
export default class {
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
    hexToRgb(hex: string): number[] | void;
    /**
     * @param options Fetch options
     *
     * Quick way to access spotify api without large fetching codes through axios....
     */
    fetch(options: getOptions): Promise<any>;
    /**
     * @param uri Uri of spotify data
     *
     * Get spotify uri data...
     */
    getURIData(uri: string): Promise<any>;
    /**
     * @param uri Spotify data
     *
     * Get code image of advanced options...
     */
    getCodeImage(uri: string): Promise<any>;
}
export {};
