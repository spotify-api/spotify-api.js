/**
 * Track structure
 */
import { Restriction, TrackAudioFeatures, TrackAudioAnalysis } from "./Interface";
import Artist from "./Artist";
import Album from "./Album";
import Client from '../Client';
/**
 * LinkedTrack Class
 */
export declare class LinkedTrack {
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
    constructor(data: any);
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
}
/**
 * Track class
 */
export default class Track {
    readonly data: any;
    readonly client: Client;
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
    constructor(data: any, client: Client);
    /**
     * Album object
     * @readonly
     */
    get album(): Album;
    /**
     * Returns the array of SimplifiedArtist
     * @readonly
     */
    get artists(): Artist[];
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Returns the audio features of the tracks
     */
    getAudioFeatures(): Promise<TrackAudioFeatures>;
    /**
     * Returns the audio analysis of the tracks
     */
    getAudioAnalysis(): Promise<TrackAudioAnalysis>;
    /**
     * Fetches tracks
     */
    fetch(): Promise<Track>;
    /**
     * This method uses the client.user.deleteTrack
     * This method will delete this track from your save list
     */
    delete(): Promise<void>;
    /**
     * This method uses client.user.addTrack
     * This method adds this track to your save list
     */
    add(): Promise<void>;
}
