import Client from "..";
import { RawObject, SpotifyTypes, TrackAudioAnalysis, TrackAudioFeatures, Restriction, SpotifyURI } from "../Types";
import Album from "./Album";
import Artist from "./Artist";
/**
 * The structure of linked track object
 */
export interface LinkedTrackType {
    externalUrls: RawObject;
    href: string;
    id: string;
    type: SpotifyTypes;
    uri: SpotifyURI;
    makeCodeImage(color?: string): string;
}
/**
 * Creates and returns a linked track object!
 */
export declare function LinkedTrack(data: any): LinkedTrackType;
/**
 * Spotify Api's Track object
 */
export default class Track {
    readonly data: any;
    readonly client: Client;
    availableMarkets: string[];
    discNumber: number;
    duration: number;
    explicit: boolean;
    externalIds: RawObject;
    externalUrls: RawObject;
    href: string;
    id: string;
    name: string;
    previewUrl: string | null;
    trackNumber: number;
    type: SpotifyTypes;
    uri: SpotifyURI;
    local: boolean;
    restrictions: Restriction | null;
    popularity: number | null;
    playable?: boolean;
    /**
     * The Spotify Api's Track Object!
     *
     * @param data Received raw data from the spotify api
     * @param client The client
     * @example const track = new Track(data, client);
     */
    constructor(data: any, client: Client);
    /**
     * Retunrns the linked form of the track!
     * @readonly
     */
    get linkedFrom(): LinkedTrackType | null;
    /**
     * Returns the album where the track exists
     * @readonly
     */
    get album(): Album;
    /**
     * Returns the artists of the track
     * @readonly
     */
    get artists(): Artist[];
    /**
     * Returns a code image of the track!
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Fetches tracks and refreshes the cache!
     * @example await track.fetch();
     */
    fetch(): Promise<Track>;
    /**
     * Returns the audio features of the track!
     * @example await track.getAudioFeatures();
     */
    getAudioFeatures(): Promise<TrackAudioFeatures | null>;
    /**
     * Returns the audio analysis of the track!
     * @example await track.getAudioAnalysis();
     */
    getAudioAnalysis(): Promise<TrackAudioAnalysis | null>;
    /**
     * Add this track to your save list!
     * @example await track.add();
     */
    add(): Promise<boolean>;
    /**
     * Remove this track from your save list!
     * @example await track.delete();
     */
    delete(): Promise<boolean>;
    /**
     * Returns a boolean stating is this tracks saved on the user's savelist (library)
     * @example const isSaved = await track.saved();
     */
    saved(): Promise<boolean>;
}
