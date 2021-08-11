import type { Client } from "../Client";
import { hexToRgb } from "../Util";

import type {
    SimplifiedShow,
    Show as RawShow
} from "api-types";

/**
 * Spotify api's show object.
 */
export class Show {

    /**
     * To create a js object conataing camel case keys of the SimplifiedShow and Show data with additional functions.
     * 
     * @param client The spotify client.
     * @example const show = new Show(fetchedData, client);
     */
    public constructor(data: SimplifiedShow | RawShow, client: Client) {
    }

    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    public makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }
    
}