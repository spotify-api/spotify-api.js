import type { ExternalID, ExternalUrl, Restriction, SimplifiedTrack, SpotifyType, Track as RawTrack } from "api-types";
import type { LinkedTrack } from "../Interface";
import type { Client } from "../Client";
import { createCacheStruct, createCacheStructArray } from "../Cache";
import { Artist } from "./Artist";
import { Album } from "./Album";
import { hexToRgb } from "../Util";

/**
 * Spotify api's track object.
 */
export class Track {

    /** 
     * The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist. 
     */
    public artists: Artist[];

    /** 
     * A list of the countries in which the track can be played. 
     */
    public availableMarkets: string[];

    /** 
     * The disc number (usually 1 unless the album consists of more than one disc). 
     */
    public discNumber: number;

    /** 
     * The track length in milliseconds. 
     */
    public duration: number;

    /** 
     * Whether or not the track has explicit lyrics ( true = yes it does; false = no it does not OR unknown). 
     */
    public explicit: boolean;

    /** 
     * External URLs for this track. 
     */
    public externalURL: ExternalUrl;
    
    /** 
     * The Spotify ID for the track. 
     */
    public id: string;

    /** 
     * Whether or not the track is from a local file. 
     */
    public isLocal: boolean;

    /** 
     * Part of the response when Track Relinking is applied. If true , the track is playable in the given market. Otherwise false. 
     */
    public isPlayable?: boolean;

    /** 
     * Part of the response when Track Relinking is applied and is only part of the response if the track linking, in fact, exists. 
     */
    public linkedFrom?: LinkedTrack;

    /** 
     * The name of the track. 
     */
    public name: string;

    /** 
     * A URL to a 30 second preview (MP3 format) of the track. 
     */
    public previewURL: string;

    /** 
     * Included in the response when a content restriction is applied. 
     */
    public restrictions: Restriction[];
    
    /** 
     * The number of the track. If an album has several discs, the track number is the number on the specified disc. 
     */
    public trackNumber: number;

    /** 
     * The object type: “track”. 
     */
    public type: SpotifyType;

    /** 
     * The Spotify URI for the track. 
     */
    public uri: string;

    /** 
     * The album on which the track appears.  
     */
    public album?: Album;

    /** 
     * Known external IDs for the track.
     */
    public externalID?: ExternalID;

    /** 
     * The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. \\
     */
    public popularity?: number;
    
    /**
     * To create a js object conataing camel case keys of the SimplifiedTrack and Track data with additional functions.
     * 
     * @param data The raw data received from the api.
     * @param client The spotify client.
     * @example const track = new Track(fetchedData, client);
     */
    public constructor(data: SimplifiedTrack | RawTrack, client: Client) {
        this.artists = createCacheStructArray('artists', client, data.artists);
        this.availableMarkets = data.available_markets;
        this.discNumber = data.disc_number;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalURL = data.external_urls;
        this.id = data.id;
        this.isLocal = data.is_local;
        this.name = data.name;
        this.previewURL = data.preview_url;
        this.restrictions = data.restrictions || [];
        this.trackNumber = data.track_number;
        this.type = data.type;
        this.uri = data.uri;

        if (data.linked_from) {
            this.isPlayable = data.is_playable;
            this.linkedFrom = {
                externalURL: data.linked_from.external_urls,
                id: data.linked_from.id,
                type: data.linked_from.type,
                uri: data.linked_from.uri
            }
        }

        if ('album' in data) {
            this.album = createCacheStruct('albums', client, (data as RawTrack).album);
            this.externalID = (data as RawTrack).external_ids;
            this.popularity = (data as RawTrack).popularity;
        }
    }

    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    public makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

}