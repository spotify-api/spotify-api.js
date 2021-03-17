import { RawObject, SpotifyTypes } from "../Types";
import Util from "../Util";

/**
 * The structure of linked track object
 */
export interface LinkedTrackType{
    externalUrls: RawObject;
    href: string;
    id: string;
    type: SpotifyTypes;
    uri: string;
    makeCodeImage(color?: string): string;
}

/**
 * Creates and returns a linked track object!
 */
export function LinkedTrack(data): LinkedTrackType {

    return {
        externalUrls: data.external_urls,
        href: data.href,
        id: data.id,
        type: data.type,
        uri: data.uri,
        makeCodeImage(color: string = '1DB954'): string {
            return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${((new Util('')).hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
        }
    }

}

/**
 * Spotify Api's Track object
 */