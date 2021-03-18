import Client from "..";
import { RawObject, SpotifyTypes, TrackAudioAnalysis, TrackAudioFeatures, Restriction, SpotifyURI } from "../Types";
import Util from "../Util";
import Album from "./Album";
import Artist from "./Artist";

/**
 * The structure of linked track object
 */
export interface LinkedTrackType{
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
export default class Track{

    readonly data!: any;
    readonly client!: Client;

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
        this.externalIds = data.external_ids || null;
        this.popularity = data.popularity || null;
        this.restrictions = data.restrictions || null;
        
    }

    /**
     * Retunrns the linked form of the track!
     * @readonly
     */
    get linkedFrom(): LinkedTrackType | null {
        return this.data.linked_from ? LinkedTrack(this.data.linked_from) : null;
    }

    /**
     * Returns the album where the track exists
     * @readonly
     */
    get album(): Album {
        return new Album(this.data.album, this.client);
    }

    /**
     * Returns the artists of the track
     * @readonly
     */
    get artists(): Artist[] {
        return this.data.artists.map(x => new Artist(x, this.client));
    }

    /**
     * Returns a code image of the track!
     * @param color Hex color code
     */
    makeCodeImage(color: string = '1DB954'): string {
        return `https://scannables.scdn.co/uri/plain/jpeg/#${color}/${(this.client.util.hexToRgb(color)[0] > 150) ? "black" : "white"}/1080/${this.uri}`;
    }

    /**
     * Fetches tracks and refreshes the cache!
     * @example await track.fetch();
     */
    async fetch(): Promise<Track> {
        return await this.client.tracks.get(this.id, true) as Track;
    }

    /**
     * Returns the audio features of the track!
     * @example await track.getAudioFeatures();
     */
    async getAudioFeatures(): Promise<TrackAudioFeatures | null> {
        return await this.client.tracks.getAudioFeatures(this.id);
    }

    /**
     * Returns the audio analysis of the track!
     * @example await track.getAudioAnalysis();
     */
    async getAudioAnalysis(): Promise<TrackAudioAnalysis | null> {
        return await this.client.tracks.getAudioAnalysis(this.id);
    }

}