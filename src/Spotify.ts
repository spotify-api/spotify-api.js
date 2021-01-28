/**
 * File of basic utility
 * All the lib files extends to this class to make work faster
 */

import { UtilityError } from "./Error";
import axios from "axios";
import { GetOptions } from './structures/Interface'

/**
 * Spotify utility class
 * You can access this uility class through the `spotify.Client.utils`
 */
class Util {

    token: string;

    /**
     * @param oauth Your auth token
     * 
     * Library class
     */
    constructor(oauth?: string) {
        this.token = oauth || 'NO TOKEN';
    };

    /**
     * @param hex Hex to be converted
     * 
     * Function used to convert the hex string to rgb array.
     */
    static hexToRgb(hex: string): number[] {
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

    /**
     * @param hex Hex to be converted
     * 
     * Function used to convert the hex string to rgb array.
     */
    hexToRgb(hex: string): number[] {
        return Util.hexToRgb(hex);
    }

    /**
     * @param options Fetch options
     * 
     * Quick way to access spotify api without large fetching codes through axios....
     */
    async fetch(options: GetOptions): Promise<any> {

        const { data } = await axios({
            method: (options.method || 'GET'),
            url: ("https://api.spotify.com/" + options.link),
            headers: { 
                Authorization: `Bearer ${this.token}`, 
                Accept: 'application/json',
                ...options.headers 
            },
            params: options.params || {}
        });

        return data;

    }

};

export default Util;