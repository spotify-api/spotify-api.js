import { hexToRgb } from "../Util";
import type { 
    SimplifiedArtist, 
    Artist as RawArtist, 
    SpotifyType, 
    ExternalUrl, 
    Image 
} from "spotify-types";

/**
 * Spotify api's user object.
 */
export class Artist {

    /** 
     * Known external URLs for this artist. 
     */
    public externalURL: ExternalUrl;
    
    /** 
     * The Spotify ID for the artist. 
     */
    public id: string;
    /** 
     * The name of the artist. 
     */
    public name: string;

    /** 
     * The object type: "artist". 
     */
    public type: SpotifyType;

    /** 
     * The Spotify URI for the artist. 
     */
    public uri: string;

    /**
     * Total number of followers of the artist.
     */
    public totalFollowers?: number;

    /** 
     * A list of the genres the artist is associated with. For example: "Prog Rock" , "Post-Grunge". (If not yet classified, the array is empty.) 
     */
    public genres?: string[];

    /** 
     * Images of the artist in various sizes, widest first. 
     */
    public images?: Image[];

    /** 
     * The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist’s popularity is calculated from the popularity of all the artist’s tracks. 
     */
    public popularity?: number;

    /**
     * To create a js object containing camel case keys of SimplifiedArtist or Artist data with additional functions.
     * 
     * @param data The raw data received from the api.
     * @example const artist = new Artist(fetchedData);
     */
    public constructor(data: SimplifiedArtist | RawArtist) {
        this.externalURL = data.external_urls;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.uri = data.uri;

        if ('images' in data) {
            this.images = data.images;
            this.popularity = data.popularity;
            this.genres = data.genres;
            this.totalFollowers = data.followers.total;
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