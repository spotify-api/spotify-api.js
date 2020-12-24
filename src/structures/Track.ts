/**
 * Track structure
 */
import { Restriction, TrackAudioFeatures, TrackAudioAnalysis } from "./Interface";
import Artist from "./Artist";
import Album from "./Album";
import Util from '../Spotify';
import Client from '../Client';

/**
 * LinkedTrack Class
 */
export class LinkedTrack{

    readonly data: any;

    externalUrls: any;
    href: string;
    id: string;
    type: string;
    uri: string;

    /**
     * **Example:**
     * 
     * ```js
     * const track = new LinkedTrack(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     */
    constructor(data){

        Object.defineProperty(this, 'data', { value: data, writable: false });

        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;

    };
    
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

};

/**
 * Track class
 */
export default class Track {

    readonly data: any;
    readonly client!: Client;
    readonly simplified: boolean;

    availableMarkets: string[];
    discNumber: number;
    duration: number;
    explicit: boolean;
    externalIds: any;
    externalUrls: any;
    href: string;
    id: string;
    name: string;
    previewUrl: string;
    trackNumber: number;
    type: string;
    uri: string;
    local: boolean;
    restrictions: Restriction | null;
    popularity: number | null;
    auidoAnalysis: TrackAudioAnalysis | null;
    audioFeatures: TrackAudioFeatures | null;

    playable?: boolean;
    linkedFrom?: LinkedTrack;

    /**
     * **Example:**
     * 
     * ```js
     * const track = new Track(data);
     * ```
     * 
     * @param data Received raw data from the spotify api
     * @param client The client
     */
    constructor(data: any, client: Client){

        Object.defineProperty(this, 'data', { value: data, writable: false });
        Object.defineProperty(this, 'client', { value: client, writable: false });

        this.availableMarkets = data.available_markets;
        this.discNumber = data.disc_number;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.previewUrl = data.preview_url;
        this.trackNumber = data.track_number;
        this.type = data.type;
        this.uri = data.uri;
        this.playable = data.is_playable;
        this.local = Boolean(data.is_local);
        this.audioFeatures = null;
        this.auidoAnalysis = null;
        this.externalIds = data.external_ids || null;
        this.popularity = data.popularity || null;
        this.restrictions = data.restrictions || null;
        this.simplified = true;

        if('external_ids' in data){
            this.simplified = false;
        }

        if('linked_from' in data) this.linkedFrom = new LinkedTrack(data.linked_from);
        
    }

    /**
     * Album object
     * @readonly
     */
    get album(): Album {
        return new Album(this.data.album, this.client);
    }

    /**
     * Returns the array of SimplifiedArtist
     * @readonly
     */
    get artists(): Artist[] {
        return this.data.artists.map(x => new Artist(x, this.client));
    }

    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/${color}/${(Util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Returns the audio features of the tracks
     */
    async getAudioFeatures(): Promise<TrackAudioFeatures> {
        return this.audioFeatures || await this.client.tracks.audioFeatures(this.id);
    }

    /**
     * Returns the audio analysis of the tracks
     */
    async getAudioAnalysis(): Promise<TrackAudioAnalysis> {
        return this.auidoAnalysis || await this.client.tracks.audioAnalysis(this.id);
    }

    /**
     * Fetches tracks
     */
    async fetch(): Promise<Track> {
        return await this.client.tracks.get(this.id, true);
    }

    /**
     * This method uses the client.user.deleteTrack
     * This method will delete this track from your save list
     */
    async delete(): Promise<void> {
        await this.client.user.deleteTrack(this.id);
    }

    /**
     * This method uses client.user.addTrack
     * This method adds this track to your save list
     */
    async add(): Promise<void> {
        await this.client.user.addTrack(this.id);
    }

}