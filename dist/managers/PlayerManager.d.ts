import UserClient from '../UserClient';
import Client from '../Client';
import { RawObject, SpotifyTypes, SpotifyURI } from '../Types';
import Track from '../structures/Track';
import Episode from '../structures/Episode';
/**
 * Spotify api's device object!
 */
export interface DeviceType {
    id: string;
    active: boolean;
    privateSession: boolean;
    restricted: boolean;
    name: string;
    type: string;
    volume: number | null;
}
/**
 * Spotify api's current playback object
 */
export interface CurrentPlaybackType {
    readonly device: DeviceType;
    readonly context: ContextType;
    readonly item: Track | Episode | null;
    timestamp: number;
    progress: string | number;
    currentlyPlayingType: 'track' | 'episode' | 'ad' | 'unknown';
    playing: boolean;
    repeatState: 'off' | 'track' | 'context';
    shuffled: boolean;
}
/**
 * Spotify api's currently playing type
 */
export declare type CurrentlyPlayingType = Omit<CurrentPlaybackType, 'repeatState' | 'shuffled'>;
/**
 * Spotify api's playhistory object
 */
export interface PlayHistoryType {
    readonly context: ContextType;
    readonly track: Track;
    playedAt: number;
}
/**
 * Spotify api's context type object!
 */
export interface ContextType {
    externalUrls: RawObject;
    href: string;
    type: SpotifyTypes;
    uri: SpotifyURI;
}
/**
 * Spotify api's recently played object!
 */
export interface RecentlyPlayedType {
    items: PlayHistoryType[];
    cursors: {
        after: string;
        boolean: string;
    };
    limit: number;
}
/**
 * Returns an context object formatted!
 *
 * @param data Context raw data
 * @example const context = Context(data);
 */
export declare function Context(data: any): ContextType;
/**
 * Returns an device object formatted!
 *
 * @param data Device raw data
 * @example const device = Device(data);
 */
export declare function Device(data: any): DeviceType;
/**
 * Returns an current playback object formatted!
 *
 * @param data The current playback data from the spotify api
 * @param client Your spotify client
 * @example const playback = CurrentPlayback(data, client);
 */
export declare function CurrentPlayback(data: any, client: Client): CurrentPlaybackType;
/**
 * Returns an currently playing object formatted!
 *
 * @param data The currently playing data from the spotify api
 * @param client Your spotify client
 * @example const playback = CurrentlyPlaying(data, client);
 */
export declare function CurrentlyPlaying(data: any, client: Client): CurrentlyPlayingType;
/**
 * Returns a play history object formatted!
 *
 * @param data The play history data from the spotify api
 * @param client Your spotify client
 * @example const playhistory = PlayHistory(data, client);
 */
export declare function PlayHistory(data: any, client: Client): PlayHistoryType;
/**
 * A class to manage all player endpoints
 */
export default class PlayerManager {
    client: Client;
    /**
     * A class to manage all player endpoints
     *
     * @param client Your spotify client
     * @example const player = new PlayerManager(client);
     */
    constructor(client: UserClient | Client | string);
    /**
     * Returns the current playback of the current user!
     *
     * @param options Options containing the fields market and additionalTypes
     * @example const playback = await player.getCurrentPlayback();
     */
    getCurrentPlayback(options?: {
        market?: string;
        additionalTypes?: 'track' | 'episode';
    }): Promise<CurrentPlaybackType | null>;
    /**
     * Tranfers your current playback to different devices by their ids
     *
     * @param devices Array of device ids
     * @param options Options containing the play field
     * @example await player.transferPlayback(['id1'], { play: true });
     */
    transferPlayback(devices: string[], options?: {
        play?: boolean;
    }): Promise<boolean>;
    /**
     * Returns all the devices of the current user
     * @example const devices = await player.getDevices();
     */
    getDevices(): Promise<DeviceType[]>;
    /**
     * Returns the current playing of the current user!
     *
     * @param options Options containing the fields market and additionalTypes
     * @example const playing = await player.getCurrentlyPlaying();
     */
    getCurrentlyPlaying(options?: {
        market?: string;
        additionalTypes?: 'track' | 'episode';
    }): Promise<CurrentlyPlayingType | null>;
    /**
     * Returns the recently played object!
     *
     * @param options Options consisting of after, before and market field
     * @example const recentlyPlayed = await player.getRecentlyPlayed();
     */
    getRecentlyPlayed(options?: {
        market?: string;
        after?: number;
        before?: number;
    }): Promise<RecentlyPlayedType | null>;
}
