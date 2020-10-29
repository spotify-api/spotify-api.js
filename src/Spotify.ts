import { UtilityError } from "./Error";
import axios from "axios";
import spotifyUri from "@spotify-api.js/spotify-uri-info";

interface getOptions {
    link: string;
    headers?: any;
    params?: any;
}

export default class {
    token: string;

    constructor(oauth: string) {
        this.token = oauth;
    };

    hexToRgb(hex: string): number[] | void {
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

    async fetch(options: getOptions): Promise<any> {
        const { data } = await axios.get("https://api.spotify.com/" + options.link, { headers: options.headers || { Authorization: `Bearer ${this.token}`, }, params: options.params || {}, });
        return data;
    }

    async getURIData(uri: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await spotifyUri.getData(uri));
            } catch(e) {
                reject(e);
            };
        });
    }

    async getCodeImage(uri: string): Promise<any> {
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
