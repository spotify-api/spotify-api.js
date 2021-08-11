import type { Client } from "../Client";
import { Artist } from "./Artist";
import { createCacheStructArray } from "../Cache";
import { Track } from "./Track";
import { hexToRgb } from "../Util";

import type { 
    SimplifiedAlbum, 
    Album as RawAlbum, 
    SpotifyType, 
    Restriction, 
    Image, 
    AlbumType, 
    ExternalUrl, 
    Copyright, 
    ExternalID 
} from "api-types";


/**
 * Spotify api's album object.
 */
export class Album {

    /**
     * The client to work with the artist api.
     */
    public readonly client!: Client;

    /** 
     * The field is present when getting an artist’s albums. 
     */
    public albumGroup?: 'album' | 'single' | 'compilation' | 'appears_on';

    /** 
     * The type of album. 
     */
    public albumType: AlbumType;

    /** 
     * The artists of the album. 
     */
    public artists: Artist[];

    /** 
     * The markets in which the album is available. 
     */
    public availableMarkets: string[];

    /** 
     * Known external URLs for this album. 
     */
    public externalURL: ExternalUrl;

    /** 
     * The Spotify ID of the album. 
     */
    public id: string;

    /** 
     * The cover art for the album in various sizes, widest first. 
     */
    public images: Image[];

    /** 
     * The name of the album. 
     */
    public name: string;

    /** 
     * The date the album was first released, for example “1981-12-15”. 
     */
    public releaseDate: string;

    /** 
     * The precision with which release_date value is known: “year” , “month” , or “day”. 
     */
    public releaseDatePrecision: string;

    /** 
     * Included in the response when a content restriction is applied. 
     */
    public restrictions: Restriction[];

    /** 
     * The total number of tracks in the album. 
     */
    public totalTracks: number;

    /** 
     * The object type which will be 'album'. 
     */
    public type: SpotifyType;
    
    /** 
     * The Spotify URI for the album. 
     */
    public uri: string;

    /** 
     * The copyright statements of the album. 
     */
    public copyrights?: Copyright[];

    /** 
     * Known external IDs for the album. 
     */
    public externalID?: ExternalID;

    /** 
     * A list of the genres used to classify the album. For example: “Prog Rock” , “Post-Grunge”. (If not yet classified, the array is empty.) 
     */
    public genres?: string[];

    /** 
     * The label for the album. 
     */
    public label?: string;

    /** 
     * The popularity of the album. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated from the popularity of the album’s individual tracks. 
     */
    public popularity?: number;

    /** 
     * The tracks of the album. 
     */
    public tracks?: Track[];

    /**
     * To create a js object conataing camel case keys of the SimplifiedAlbum and Album data with additional functions.
     * 
     * @param client The spotify client.
     * @param data The raw data received from the api.
     * @param fromCache Is the data received already stored in cache or not.
     * @example const album = new Album(client, fetchedData);
     */
    public constructor(client: Client, data: SimplifiedAlbum | RawAlbum, fromCache = false) {
        this.artists = createCacheStructArray('artists', client, data.artists, fromCache);
        this.albumType = data.album_type;
        this.availableMarkets = data.available_markets;
        this.externalURL = data.external_urls;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.releaseDatePrecision = data.release_date_precision;
        this.restrictions = data.restrictions;
        this.totalTracks = data.total_tracks;
        this.type = data.type;
        this.uri = data.uri;

        if ('tracks' in data) {
            this.tracks = createCacheStructArray('tracks', client, data.tracks, fromCache);
            this.externalID = data.external_ids;
            this.copyrights = data.copyrights;
            this.genres = data.genres;
            this.label = data.label;
            this.popularity;
        } else this.albumGroup = data.album_group;

        Object.defineProperty(this, 'client', { value: client });
    }

    /**
     * Returns a code image url from the spotify uri.
     * @param color The color code in hex.
     */
    makeCodeImage(color = '1DB954') {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

}