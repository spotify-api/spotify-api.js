import axios from 'axios';
import { Methods, SpotifyTypes, SpotifyURI } from './Types';
import { UtilityError } from './Errors';

/**
 * Options required to use Util.fetch
 */
export interface FetchOptions{
    headers?: { [key: string]: string };
    method?: Methods;
    params?: { [key: string]: string };
    body?: { [key: string]: string | boolean | number };
}

/**
 * The main utility and helper class for the package
 */
export default class Util{

    token: string;
    version: `v${number}`;

    /**
     * Used for management
     * 
     * @param token Your spotify token
     * @example new Spotify.Util(token);
     */
    constructor(token: string){
        this.token = token;
        this.version = 'v1';
    }

    /**
     * Used to fetch data from spotify!
     * 
     * @param url The path from spotify api to fetch!
     * @param options The additional options required to fetch
     * @example await util.fetch('/users/id');
     */
    async fetch(url: string, options?: FetchOptions): Promise<any> {
        
        const { data } = await axios({
            url: `https://api.spotify.com/${this.version}${url}`,
            method: options?.method || 'GET',
            params: options?.params,
            headers: {
                Authorization: "Bearer " + this.token,
                Accept: 'application/json',
                ...options?.headers
            },
            data: options?.body
        })

        return data;

    }

    /**
     * Similar to util.fetch but you can fetch a custom url instead of fetching path with constant base url
     * 
     * @param url URL of string
     * @param options Basic FetchOptions
     * @example await util.fetchURL('url');
     */
    async fetchURL(url: string, options?: FetchOptions): Promise<any> {
        
        const { data } = await axios({
            url,
            method: options?.method || 'GET',
            params: options?.params,
            headers: {
                Authorization: "Bearer " + this.token,
                Accept: 'application/json',
                ...options?.headers
            },
            data: options?.body
        })

        return data;

    }

    /**
     * Function used to convert the hex string to rgb array.
     * This is used in makeCodeImage functions!
     * 
     * @param hex Hex to be converted
     */
    hexToRgb(hex: string): number[] {
        if (typeof hex == "string" && /^([0-9A-F]{3}){1,2}$/i.test(hex)) throw new UtilityError("Invalid hex code provided!");

        hex = hex.replace(/^#/, "");
        let alpha = 1;

        if (hex.length === 8) {
          alpha = parseInt(hex.slice(6, 8), 16) / 255;
          hex = hex.slice(0, 6);
        };

        if (hex.length === 4) {
          alpha = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
          hex = hex.slice(0, 3);
        };

        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

        const num = parseInt(hex, 16);
        const red = num >> 16;
        const green = (num >> 8) & 255;
        const blue = num & 255;

        return [red, green, blue, alpha];
    }
    
}

/**
 * Structure returned by resolveURI method!
 */
export interface URIData{
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
export const resolveURI: {
    (uri: SpotifyURI): URIData | null;
    regex?: RegExp;
} = (uri: SpotifyURI): URIData | null => {

    if(typeof uri != 'string' || !uri.match(resolveURI.regex as RegExp)) return null;
    const [_, type, id, subtype, subid] = uri.split(':');

    if(type == 'search'){
        return {
            type: null,
            id: null,
            search: id,
            parent: null
        }
    } else if(subtype && subid){
        return {
            type: subtype,
            id: subid,
            search: null,
            parent: { type, id }
        } as URIData
    } else {
        return {
            type, id,
            search: null,
            parent: null
        } as URIData
    }

}

resolveURI.regex = /spotify:(user|playlist|show|album|artist|track|episode|search):(.*?)/g;