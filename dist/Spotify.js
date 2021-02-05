"use strict";
/**
 * File of basic utility
 * All the lib files extends to this class to make work faster
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = require("./Error");
const axios_1 = __importDefault(require("axios"));
/**
 * Spotify utility class
 * This class is actually not meant for use! It is just used to write codes shortly instead of long things!
 */
class Util {
    /**
     * The main utility class
     *
     * @param oauth Your auth token
     */
    constructor(oauth) {
        this.token = oauth || 'NO TOKEN';
    }
    ;
    /**
     * Function used to convert the hex string to rgb array.
     * This is used in makeCodeImage functions!
     *
     * @param hex Hex to be converted
     */
    static hexToRgb(hex) {
        if (typeof hex == "string" && /^([0-9A-F]{3}){1,2}$/i.test(hex))
            throw new Error_1.UtilityError("Invalid hex code provided!");
        hex = hex.replace(/^#/, "");
        let alpha = 1;
        if (hex.length === 8) {
            alpha = parseInt(hex.slice(6, 8), 16) / 255;
            hex = hex.slice(0, 6);
        }
        ;
        if (hex.length === 4) {
            alpha = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
            hex = hex.slice(0, 3);
        }
        ;
        if (hex.length === 3)
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        const num = parseInt(hex, 16);
        const red = num >> 16;
        const green = (num >> 8) & 255;
        const blue = num & 255;
        return [red, green, blue, alpha];
    }
    /**
     * Function used to convert the hex string to rgb array.
     * The same function which is in static!
     *
     * @param hex Hex to be converted
     */
    hexToRgb(hex) {
        return Util.hexToRgb(hex);
    }
    /**
     * Quick way to access spotify api without large fetching codes through axios....
     * Instead of using this, you can use the client.request method!
     *
     * @param options Fetch options
     */
    async fetch(options) {
        const { data } = await axios_1.default({
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
}
;
exports.default = Util;
