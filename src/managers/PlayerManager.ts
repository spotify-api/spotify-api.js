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
    progress: string | number;
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
 * Spotify api's playhistory object
 */
export interface PlayHistoryType{
    readonly context: ContextType;
    readonly track: Track;
    playedAt: number;
}

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
 * Spotify api's recently played object!
 */
export interface RecentlyPlayedType {
    items: PlayHistoryType[];
    cursors: { after: string, before: string };
    limit: number;
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
 * Returns a play history object formatted!
 * 
 * @param data The play history data from the spotify api
 * @param client Your spotify client
 * @example const playhistory = PlayHistory(data, client);
 */
export function PlayHistory(data, client: Client): PlayHistoryType {

    return {
        get track(){
            return new Track(data.track, client);
        },
        get context(){
            return Context(data.context);
        },
        playedAt: data.played_at
    };

}

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

            return status != 204 ? CurrentlyPlaying(data, this.client) : null;
        }catch(e){
            return handleError(e);
        }

    }

    /**
     * Returns the recently played object!
     * 
     * @param options Options consisting of after, before and market field
     * @example const recentlyPlayed = await player.getRecentlyPlayed();
     */
    async getRecentlyPlayed(options?: {
        market?: string,
        after?: number,
        before?: number
    }): Promise<RecentlyPlayedType | null> {

        try{
            const data = await this.client.util.fetch('/me/player/recently-played', { params: options as RawObject });

            return {
                items: data.items.map(x => PlayHistory(x, this.client)),
                cursors: data.cursors,
                limit: data.limit
            }
        }catch(e){
            return handleError(e);
        }

    }

    /**
     * Play or resume your player!
     * 
     * @param options Options used to play!
     * @param deviceID The device id to play else will target the currently active one
     * @example await player.play();
     */
    async play({
        deviceID,
        contextURI,
        uris,
        position,
        offset
    }: {
        deviceID?: string;
        contextURI?: string;
        uris?: string[];
        position?: number;
        offset?: number;
    } = {}): Promise<boolean> {

        try{
            const opts = { 
                device_id: deviceID,
                context_uris: contextURI,
                uris: uris?.join(','),
                position_ms: position,
                offset
            };

            Object.keys(opts).forEach(x => !opts[x] ? delete opts[x] : null);

            await this.client.util.fetch('/me/player/play', {
                method: 'PUT',
                params: opts as RawObject
            });

            return true;
        }catch(e){
            return handleError(e) || false;
        }

    }

    /**
     * Pause your player
     * 
     * @param deviceID The device id to pause else will target the currently active one
     * @example await player.pause();
     */
    async pause(deviceID?: string): Promise<boolean> {

        try{
            const opts = { device_id: deviceID };
            Object.keys(opts).forEach(x => !opts[x] ? delete opts[x] : null);

            await this.client.util.fetch('/me/player/pause', {
                method: 'PUT',
                params: opts as RawObject
            });

            return true;
        }catch(e){
            return handleError(e) || false;
        }

    }

    /**
     * Move to the next item in the queue
     * 
     * @param deviceID The device id to move to the next item in the queue else will target the currently active one
     * @example await player.next();
     */
    async next(deviceID?: string): Promise<boolean> {

        try{
            const opts = { device_id: deviceID };
            Object.keys(opts).forEach(x => !opts[x] ? delete opts[x] : null);

            await this.client.util.fetch('/me/player/next', {
                method: 'POST',
                params: opts as RawObject
            });

            return true;
        }catch(e){
            return handleError(e) || false;
        }

    }

    /**
     * Move to the previous item in the queue
     * 
     * @param deviceID The device id to move to the previous item in the queue else will target the currently active one
     * @example await player.previous();
     */
    async previous(deviceID?: string): Promise<boolean> {

        try{
            const opts = { device_id: deviceID };
            Object.keys(opts).forEach(x => !opts[x] ? delete opts[x] : null);

            await this.client.util.fetch('/me/player/previous', {
                method: 'POST',
                params: opts as RawObject
            });

            return true;
        }catch(e){
            return handleError(e) || false;
        }

    }

    /**
     * Seek your player to a position
     * 
     * @param position Position in ms to seek
     * @param deviceID The device id to add item else will target the currently active one
     * @example await player.seek(12000);
     */
    async seek(position: number, deviceID?: string): Promise<boolean> {

        try{
            const opts = { position_ms: position, device_id: deviceID };
            Object.keys(opts).forEach(x => !opts[x] ? delete opts[x] : null);

            await this.client.util.fetch('/me/player/seek', {
                method: 'PUT',
                params: opts as RawObject
            });

            return true;
        }catch(e){
            return handleError(e) || false;
        }

    }

    /**
     * Set repeat mode to your player
     * 
     * @param state Repeat mode to set
     * @param deviceID The device id to set repeat mode else will target the currently active one
     * @example await player.setRepeatMode('track');
     */
    async setRepeatMode(state: 'track' | 'context' | 'off', deviceID?: string): Promise<boolean> {

        try{
            const opts = { state, device_id: deviceID };
            Object.keys(opts).forEach(x => !opts[x] ? delete opts[x] : null);

            await this.client.util.fetch('/me/player/repeat', {
                method: 'PUT',
                params: opts as RawObject
            });

            return true;
        }catch(e){
            return handleError(e) || false;
        }

    }


    /**
     * Set volume of your volume!
     * 
     * @param volume Percentage of volume to set
     * @param deviceID The device id to set volume else will target the currently active one
     * @example await player.setVolume(20);
     */
    async setVolume(volume: number, deviceID?: string): Promise<boolean> {

        try{
            const opts = { volume_percent: volume, device_id: deviceID };
            Object.keys(opts).forEach(x => !opts[x] ? delete opts[x] : null);

            await this.client.util.fetch('/me/player/volume', {
                method: 'PUT',
                params: opts as RawObject
            });

            return true;
        }catch(e){
            return handleError(e) || false;
        }

    }


    /**
     * Shuffle your queue!
     * 
     * @param state If true, will shuffle else will undhuffle
     * @param deviceID The device id to shuffle else will target the currently active one
     * @example await player.shuffle();
     */
    async shuffle(state: boolean = true, deviceID?: string): Promise<boolean> {

        try{
            const opts = { state, device_id: deviceID };
            Object.keys(opts).forEach(x => !opts[x] ? delete opts[x] : null);

            await this.client.util.fetch('/me/player/shuffle', {
                method: 'PUT',
                params: opts as RawObject
            });

            return true;
        }catch(e){
            return handleError(e) || false;
        }

    }


    /**
     * Add an item to the queue
     * 
     * @param uri Spotify uri of the item to add to the queue
     * @param deviceID The device id to add item else will target the currently active one
     * @example await player.addItem('uri');
     */
    async addItem(uri: SpotifyURI, deviceID?: string): Promise<boolean> {

        try{
            const opts = { uri, device_id: deviceID };
            Object.keys(opts).forEach(x => !opts[x] ? delete opts[x] : null);

            await this.client.util.fetch('/me/player/queue', {
                method: 'POST',
                params: opts as RawObject
            });

            return true;
        }catch(e){
            return handleError(e) || false;
        }

    }

}