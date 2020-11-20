/**
 * File of basic utility
 * All the lib files extends to this class to make work faster
 */

import { UtilityError } from "./Error";
import axios from "axios";

/**
 * Interface of this.fetch options
 */
export interface getOptions {
    link: string;
    headers?: any;
    params?: any;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

/**
 * Interface of this.getCodeImage result
 */

export interface CodeImageReturn {
    image: string;
    dominantColor: {
        hex: string;
        rgb: number[];
    };
};

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
    constructor(oauth?: string) {
        this.token = oauth || 'NO TOKEN';
    };

    /**
     * @param hex Hex to be converted
     * 
     * Function used to convert the hex string to rgb array.
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

    /**
     * @param options Fetch options
     * 
     * Quick way to access spotify api without large fetching codes through axios....
     */
    async fetch(options: getOptions): Promise<any> {

        const { data } = await axios({
            method: (options.method || 'GET'),
            url: ("https://api.spotify.com/" + options.link),
            headers: { Authorization: `Bearer ${this.token}`, ...(options.headers || {}) },
            params: options.params || {}
        });
        return data;

    }

    /**
     * @param uri Uri of spotify data
     * 
     * Get spotify uri data...
     */
    async getURIData(uri: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get('https://open.spotify.com/embed?uri=' + uri);

                resolve(
                    JSON.parse(
                        decodeURIComponent(
                            data
                            .split('<script id="resource" type="application/json">')[1]
                            .split('</script>')[0]
                        )
                    )
                );
            } catch(e) {
                reject(e);
            };
        });
    };

    /**
     * @param uri Spotify data
     * 
     * Get code image of advanced options...
     */
    async getCodeImage(uri: string): Promise<CodeImageReturn> {
        const data = await this.getURIData(uri);
        let match = this.hexToRgb(data.dominantColor);

        return {
            image: `https://scannables.scdn.co/uri/plain/jpeg/${data.dominantColor.slice(1)}/${match[0] > 150 ? "black" : "white"}/1080/${uri}`,
            dominantColor: {
                hex: data.dominantColor,
                rgb: match,
            },
        };
    };

};
