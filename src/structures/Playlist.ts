import type { Client } from "../Client";
import type { User } from "./User";
import { hexToRgb } from "../Util";

import type { 
    Playlist as RawPlaylist,
    SimplifiedPlaylist,
    SpotifyType,
    Image,
    ExternalUrl
} from "api-types";


/**
 * Spotify api's playlist object.
 */
export class Playlist {

    /** 
     * True if the owner allows other users to modify the playlist. 
     */
    public collaborative: boolean;

    /** 
     * The playlist description. Only returned for modified, verified playlists, otherwise null.
     */
    public description: string | null;

    /**
     *  Known external URLs for this playlist. 
     */
    public externalURL: ExternalUrl;

    /** 
     * The Spotify ID for the playlist. 
     */
    public id: string;

    /** 
     * Images for the playlist. The array may be empty or contain up to three images. 
     */
    public images: Image[];

    /** 
     * The name of the playlist. 
     */
    public name: string;

    /** 
     * The user who owns the playlist. 
     */
    public owner: User;

    /** 
     * The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version 
     */
    public snapshotID: string;

    /**
     * The total number of tracks in the playlist.
     */
    public totalTracks: number;

    /** 
     * The Spotify URI for the playlist.
     */
    public uri: string;

    /** 
     * The object type: “playlist” 
     */
    public type: SpotifyType;

    /**
     * To create a js object conataing camel case keys of the SimplifiedPlaylist and Playlist data with additional functions.
     * 
     * @param data The raw data received from the api.
     * @param client The spotify client.
     * @example const playlist = new Playlist(fetchedData, client);
     */
    public constructor(data: SimplifiedPlaylist | RawPlaylist, client: Client) {
    }

    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    public makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

}