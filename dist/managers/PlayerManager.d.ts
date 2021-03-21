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
    type: 'smartphone' | 'computer' | 'speaker';
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
    progress: string;
    currentlyPlayingType: 'track' | 'episode' | 'ad' | 'unknown';
    playing: boolean;
    repeatState: 'off' | 'track' | 'context';
    shuffled: boolean;
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
}
