import UserClient from '../UserClient';
import Client from '../Client';
import { RawObject, SpotifyTypes, SpotifyURI } from '../Types';
import Track from '../structures/Track';
import Episode from '../structures/Episode';
import { handleError } from '../Errors';

/**
 * Spotify api's device object!
 */
export interface DeviceType{
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
export interface CurrentPlaybackType{
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
 * Spotify api's currently playing type
 */
export type CurrentlyPlayingType = Omit<CurrentPlaybackType, 'repeatState' | 'shuffled'>;

/**
 * Spotify api's context type object!
 */
export interface ContextType{
    externalUrls: RawObject;
    href: string;
    type: SpotifyTypes,
    uri: SpotifyURI;
}

/**
 * Returns an context object formatted!
 * 
 * @param data Context raw data
 * @example const context = Context(data);
 */
export function Context(data): ContextType {

    return {
        externalUrls: data.external_urls,
        href: data.href,
        type: data.type,
        uri: data.uri
    };

}

/**
 * Returns an device object formatted!
 * 
 * @param data Device raw data
 * @example const device = Device(data);
 */
export function Device(data): DeviceType {

    return {
        id: data.id,
        active: data.is_active,
        privateSession: data.is_private_session,
        restricted: data.is_restricted,
        name: data.name,
        type: data.type,
        volume: data.volume_percent
    };
    
};

/**
 * Returns an current playback object formatted!
 * 
 * @param data The current playback data from the spotify api
 * @param client Your spotify client
 * @example const playback = CurrentPlayback(data, client);
 */
export function CurrentPlayback(data, client: Client): CurrentPlaybackType {

    return {
        get device(){
            return Device(data.device)
        },
        get context(){
            return Context(data.context)
        },
        get item(){
            return data.item ? (
                data.item.type == 'track' ? 
                new Track(data.item, client) : 
                new Episode(data.item, client)
            ) : null;
        },
        timestamp: data.timestamp,
        progress: data.progress_ms,
        currentlyPlayingType: data.currently_playing_type,
        playing: data.is_playing,
        shuffled: data.shuffle_state,
        repeatState: data.repeat_state
    };

}; 

/**
 * Returns an currently playing object formatted!
 * 
 * @param data The currently playing data from the spotify api
 * @param client Your spotify client
 * @example const playback = CurrentlyPlaying(data, client);
 */
 export function CurrentlyPlaying(data, client: Client): CurrentlyPlayingType {

    return {
        get device(){
            return Device(data.device)
        },
        get context(){
            return Context(data.context)
        },
        get item(){
            return data.item ? (
                data.item.type == 'track' ? 
                new Track(data.item, client) : 
                new Episode(data.item, client)
            ) : null;
        },
        timestamp: data.timestamp,
        progress: data.progress_ms,
        currentlyPlayingType: data.currently_playing_type,
        playing: data.is_playing
    };

}; 

/**
 * A class to manage all player endpoints
 */
export default class PlayerManager {

    client!: Client;

    /**
     * A class to manage all player endpoints
     * 
     * @param client Your spotify client
     * @example const player = new PlayerManager(client);
     */
    constructor(client: UserClient | Client | string){
        Object.defineProperty(this, 'client', {
            value: typeof client == 'string' ? new Client(client) : (client instanceof UserClient) ? client.client : client
        })
    }

    /**
     * Returns the current playback of the current user!
     * 
     * @param options Options containing the fields market and additionalTypes
     * @example const playback = await player.getCurrentPlayback();
     */
    async getCurrentPlayback(options: {
        market?: string;
        additionalTypes?: 'track' | 'episode'
    } = {}): Promise<CurrentPlaybackType | null> {

        try{
            return CurrentPlayback(await this.client.util.fetch('/me/player', {
                params: {
                    market: options.market || 'US',
                    additional_types: options.additionalTypes || 'track'
                }
            }), this.client);
        }catch(e){
            return handleError(e);
        }

    }

    /**
     * Tranfers your current playback to different devices by their ids
     * 
     * @param devices Array of device ids
     * @param options Options containing the play field
     * @example await player.transferPlayback(['id1'], { play: true });
     */
    async transferPlayback(devices: string[], options?: { play?: boolean }): Promise<boolean> {

        try{
            await this.client.util.fetch('/me/player', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    ...options,
                    device_ids: devices.join(',')
                }
            })

            return true;
        }catch(e){
            return handleError(e) || false;
        }

    }

    /**
     * Returns all the devices of the current user
     * @example const devices = await player.getDevices();
     */
    async getDevices(): Promise<DeviceType[]> {

        try{
            return (await this.client.util.fetch('/me/player/devices')).devices.map(Device);
        }catch(e){
            return handleError(e) || [];
        }

    }

    /**
     * Returns the current playing of the current user!
     * 
     * @param options Options containing the fields market and additionalTypes
     * @example const playing = await player.getCurrentlyPlaying();
     */
    async getCurrentlyPlaying(options: {
        market?: string;
        additionalTypes?: 'track' | 'episode'
    } = {}): Promise<CurrentlyPlayingType | null> {

        try{
            const { data, status } = await this.client.util.fetchWithResponse('/me/player/currently-playing', {
                params: {
                    market: options.market || 'US',
                    additional_types: options.additionalTypes || 'track'
                }
            })

            return status == 204 ? CurrentlyPlaying(data, this.client) : null;
        }catch(e){
            return handleError(e);
        }

    }

}