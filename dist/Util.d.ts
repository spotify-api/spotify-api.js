import { Methods, SpotifyTypes, SpotifyURI } from './Types';
/**
 * Options required to use Util.fetch
 */
export interface FetchOptions {
    headers?: {
        [key: string]: string;
    };
    method?: Methods;
    params?: {
        [key: string]: string;
    };
    body?: {
        [key: string]: string | boolean | number;
    };
}
/**
 * The main utility and helper class for the package
 */
export default class Util {
    token: string;
    version: `v${number}`;
    /**
     * Used for management
     *
     * @param token Your spotify token
     * @example new Spotify.Util(token);
     */
    constructor(token: string);
    /**
     * Used to fetch data from spotify!
     *
     * @param url The path from spotify api to fetch!
     * @param options The additional options required to fetch
     * @example await util.fetch('/users/id');
     */
    fetch(url: string, options?: FetchOptions): Promise<any>;
    /**
     * Function used to convert the hex string to rgb array.
     * This is used in makeCodeImage functions!
     *
     * @param hex Hex to be converted
     */
    hexToRgb(hex: string): number[];
}
/**
 * Structure returned by resolveURI method!
 */
export interface URIData {
    type: SpotifyTypes | null;
    id: string | null;
    search: string | null;
    parent: {
        type: SpotifyTypes;
        id: string;
    } | null;
}
/**
 * Resolves spotify uri to components!
 * @param uri Your spotify uri
 * @example const { type, id, search, parent } = resolveURI('uri');
 */
export declare const resolveURI: {
    (uri: SpotifyURI): URIData | null;
    regex?: RegExp;
};
