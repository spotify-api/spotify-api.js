/**
 * UserPlayer which access the user player only if the scoped token
 * has those correct scopes
 */
import Client from "./Client";
import Spotify from "./Spotify";
import CacheManager from "./CacheManager";
import { MissingParamError, UnexpectedError } from "./Error";
import { Playback as PlaybackStructure, Device as DeviceStructure, RecentlyPlayed, AdditionalTypes, CurrentlyPlaying, PlayOptions } from "./structures/Interface";
import { Device, Playback as Playback, PlayHistory } from "./structures/Player";
import Track from "./structures/Track";
import Episode from "./structures/Episode";

/**
 * UserPlayer which access the user player only if the scoped token
 * has those correct scopes
 */
class UserPlayer extends Spotify{

    client: Client;

    constructor(data: any, client: Client){
        super(data);
        this.client = client;
    }

    /**
     * **Example:**
     * ```js
     * const currentPlayback = await player.getCurrentPlayback();
     * ```
     * 
     * Returns the current playback
     */
    async getCurrentPlayback(): Promise<PlaybackStructure> {
        
        try{
            return Playback(await this.fetch({ link: 'v1/me/player' }), this.client);
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * const devices = await player.getDevices();
     * ```
     * 
     * Returns the devices which has active player
     */
    async getDevices(): Promise<CacheManager<string, DeviceStructure>> {
        
        try{
            const data = await this.fetch({ link: 'v1/me/player/devices' });
            return CacheManager.create<string, DeviceStructure>('id', ...data.devices.map(Device))
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * const recentlyPlayed = await player.getRecentlyPlayed();
     * ```
     * 
     * Returns the recently played information
     * 
     * @param options Configure your results
     */
    async getRecentlyPlayed(options: { limit?: number, after?: string, before?: string, additionalTypes?: AdditionalTypes } = { additionalTypes: 'track' }): Promise<RecentlyPlayed> {
        
        try{
            const data = await this.fetch({ link: `v1/me/player/recently-played`, params: { limit: options.limit, after: options.after, before: options.before, additional_types: options.additionalTypes } });

            return {
                items: data.items.map(PlayHistory),
                cursors: data.cursors
            };
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * const currentlyPlaying = await player.getCurrentPlaying();
     * ```
     * 
     * @param additionalTypes Addtional types such as episode and track!
     */
    async getCurrentlyPlaying(additionalTypes: AdditionalTypes = 'track'): Promise<CurrentlyPlaying> {
        
        try{
            const data = await this.fetch({ link: 'v1/me/player/currently-playing', params: { additional_types: additionalTypes } });
            
            return {
                context: data.context ? {
                    externalUrls: data.context.external_urls,
                    href: data.context.href,
                    type: data.context.type,
                    uri: data.context.uri
                } : null,
                timestamp: data.timestamp,
                progress: data.progress_ms,
                isPlaying: data.is_playing,
                item: data.item ? (data.item.type == 'track' ? new Track(data.item, this.client) : new Episode(data.item, this.client)) : null,
                currentPlayingType: data.currently_playing_type,
                actions: data.actions
            }
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * player.pause('device-id'); // If id not provided then will stop the currently playing player!
     * ```
     * 
     * @param device Device id which can be dounf through getDevices method
     */
    async pause(device?: string): Promise<void> {
        
        try{
            if(device) await this.fetch({ method: 'PUT', link: `v1/me/player/pause`, params: { device_id: device } });
            else await this.fetch({ method: 'PUT', link: `v1/me/player/pause` });
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * player.seek(100);
     * player.seek(100, 'deviceid');
     * ```
     * 
     * @param position Position in ms to seek 
     * @param device Device id to seek else will seek in the currently playing player
     */
    async seek(position: number | string, device?: string): Promise<void> {
        
        try{
            if(device) await this.fetch({ method: 'PUT', link: `v1/me/player/seek`, params: { position_ms: position, device_id: device }});
            else await this.fetch({ method: 'PUT', link: `v1/me/player/seek`, params: { position_ms: position }})
        }catch(e){
            throw new UnexpectedError(e);
        }

    }

    /**
     * **Example:**
     * ```js
     * await player.repeat('track');
     * ```
     * 
     * Repeats the player
     * 
     * @param type Type of repeat mode
     * @param device Device id of the device else will use currently playing track
     */
    async repeat(type: 'track' | 'context' | 'off', device?: string): Promise<void> {
        
        try{
            if(device) await this.fetch({ method: 'PUT', link: `v1/me/player/pause`, params: { state: type, device_id: device }});
            else await this.fetch({ method: 'PUT', link: `v1/me/player/pause`, params: { state: type }});
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * await player.setVolume(10);
     * ```
     * 
     * Set the volume of the player
     * 
     * @param volume Volume to set
     * @param device Device id. Optional!
     */
    async setVolume(volume: string | number, device?: string): Promise<void> {
        
        try{
            if(device) await this.fetch({ method: 'PUT', link: `v1/me/player/volume`, params: { volume_percent: volume, device_id: device } });
            else await this.fetch({ method: 'PUT', link: `v1/me/player/volume`, params: { volume_percent: volume } });
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * await player.next()
     * ```
     * 
     * Plays the next playback
     * 
     * @param device Device id to skip the track if not provided then will skip from the current player
     */
    async next(device?: string | number): Promise<void> {
        
        try{
            if(device) await this.fetch({ method: 'POST', link: `v1/me/player/next`, params: { device_id: device } });
            else await this.fetch({ method: 'POST', link: `v1/me/player/next` });
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * **Example:**
     * ```js
     * await player.previous()
     * ```
     * 
     * Plays the previous playback
     * 
     * @param device Device id to play the previous track, if not provided, then will implement it in the current player
     */
    async previous(device?: string | number): Promise<void> {
        
        try{
            if(device) await this.fetch({ method: 'POST', link: `v1/me/player/previous`, params: { device_id: device } });
            else await this.fetch({ method: 'POST', link: `v1/me/player/previous` });
        }catch(e){
            throw new UnexpectedError(e);
        }
        
    };

    /**
     * **Example:**
     * ```js
     * await player.shuffle(); // Will shuffle
     * await player.shuffle(false); // Will unshuffle
     * ```
     * 
     * Shuffle or unshuffle playbacks!
     * 
     * @param state A boolean stating that it should shuffle or not?
     * @param device Device id to play the previous track, if not provided, then will implement it in the current player
     */
    async shuffle(state: boolean = true, device?: string): Promise<void> {
        
        try{
            if(device) await this.fetch({ method: 'PUT', link: `v1/me/player/shuffle`, params: { state: Boolean(state), device_id: device } });
            else await this.fetch({ method: 'PUT', link: `v1/me/player/shuffle`, params: { state: Boolean(state) } });
        }catch(e){
            throw new UnexpectedError(e);
        }
        
    };

    /**
     * **Example:**
     * ```js
     * await player.play();
     * ```
     * 
     * Plays the playback
     * 
     * @param options All the play options to select
     */
    async play(options: PlayOptions = {}): Promise<void> {
        
        try{
            const body = {
                context_uri: options.context,
                uris: options.uris,
                offset: options.offset,
                position_ms: options.position
            };

            if(options.device) await this.fetch({ method: 'PUT', link: `v1/me/player/play`, body, params: { device_id: options.device } });
            else await this.fetch({ method: 'PUT', link: `v1/me/player/play`, body });
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

};

export default UserPlayer;