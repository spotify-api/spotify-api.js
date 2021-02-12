/**
 * Track structure
 */
import { Restriction, TrackAudioFeatures, TrackAudioAnalysis } from "./Interface";
import Artist from "./Artist";
import Album from "./Album";
import Client from '../Client';
/**
 * Spotify Api's Linked Track object!
 */
export declare class LinkedTrack {
    readonly data: any;
    externalUrls: any;
    href: string;
    id: string;
    type: string;
    uri: string;
    /**
     * Spotify Api's Linked Track object!
     *
     * @param data Received raw data from the spotify api
     * @example const track = new LinkedTrack(data, client);
     */
    constructor(data: any);
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
}
/**
 * Spotify Api's Track Object!
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
     * The Spotify Api's Track Object!
     *
     * @param data Received raw data from the spotify api
     * @param client The client
     * @example const track = new Track(data, client);
     */
    constructor(data: any, client: Client);
    /**
     * Returns the album of the track!
     *
     * @readonly
     */
    get album(): Album;
    /**
     * Returns the array of Artist who made the track!
     *
     * @readonly
     */
    get artists(): Artist[];
    /**
     * Returns a code image of the track!
     *
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Returns the audio features of the track!
     */
    getAudioFeatures(): Promise<TrackAudioFeatures>;
    /**
     * Returns the audio analysis of the track!
     */
    getAudioAnalysis(): Promise<TrackAudioAnalysis>;
    /**
     * Fetches tracks and refreshes the cache!
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
