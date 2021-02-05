/**
 * UserPlayer which access the current user's player
 */
import axios from 'axios';
import Client from "./Client";
import Spotify from "./Spotify";
import { UnexpectedError } from "./Error";
import { Playback as PlaybackStructure, Device as DeviceStructure, RecentlyPlayed, AdditionalTypes, CurrentlyPlaying, PlayOptions } from "./structures/Interface";
import { Device, Playback, PlayHistory } from "./structures/Player";
import Track from "./structures/Track";
import Episode from "./structures/Episode";

/**
 * UserPlayer which access the current user's player
 * Like UserClient this class also requires a current user authorized token!
 */
export default class UserPlayer extends Spotify{

    client: Client;

    /**
     * UserPlayer which access the current user's player
     * Like UserClient this class also requires a current user authorized token!
     * 
     * @param client Your Spotify Client
     * @example const player = new UserPlayer(client);
     */
    constructor(client: Client){
        super(client.token);
        this.client = client;
    }

    /**
     * Returns the current playback been playing on the currently active device!
     * 
     * @example const currentPlayback = await player.getCurrentPlayback();
     */
    async getCurrentPlayback(): Promise<PlaybackStructure> {
        
        try{
            return Playback(await this.fetch({ link: 'v1/me/player' }), this.client);
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Returns the devices where the current user has been signed in!
     * 
     * @example const devices = await player.getDevices();
     */
    async getDevices(): Promise<DeviceStructure[]> {
        
        try{
            const data = await this.fetch({ link: 'v1/me/player/devices' });
            return data.devices.map(Device);
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

    /**
     * Returns the recently played track information!
     * 
     * @param options Configure your results by basic RecentlyPlayedOptions
     * @example const recentlyPlayed = await player.getRecentlyPlayed();
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
     * Returns the CurrentlyPlaying object consisting all information about the currently playing ad, episode, track, etc!
     * 
     * @param additionalTypes Addtional types. Should be one of "track" or "episode"!
     * @example const currentlyPlaying = await player.getCurrentPlaying();
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
     * Will pause the currently playing on the device by device id! If device id not provided, will pause the active one!
     * 
     * @param device Device id which can be found through getDevices method
     * @example player.pause('device-id'); // If id not provided then will stop the currently playing player!
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
     * Will seek into the position in the currently playing on the device by device id! If device id not provided, will pause the active one!
     * 
     * @param position Position in ms to seek 
     * @param device Device id to seek else will seek in the currently playing player
     * @example player.seek(100);
     * player.seek(100, 'deviceid');
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
     * Sets the repeat mode for the current playing playback!
     * 
     * @param type Type of repeat mode
     * @param device Device id of the device else will use currently playing track
     * @example await player.repeat('track');
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
     * Set the volume of the current playing playbac!
     * 
     * @param volume Volume to set in percent ranging from 0 to 100!
     * @param device Device id. Optional!
     * @example await player.setVolume(10);
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
     * Plays the next playback in the currently playing player!
     * 
     * @param device Device id to skip the track if not provided then will skip from the current player
     * @example await player.next()
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
     * Plays the previous playback in the currently playing player!
     * 
     * @param device Device id to play the previous track, if not provided, then will implement it in the current player
     * @example await player.previous()
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
     * Shuffle or unshuffle playback in the current playing player!
     * 
     * @param state A boolean stating that it should shuffle or not?
     * @param device Device id to play the previous track, if not provided, then will implement it in the current player
     * @example await player.shuffle(); // Will shuffle
     * await player.shuffle(false); // Will unshuffle
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
     * Plays or resumes the playback in the currently playing player!
     * 
     * @param options All the play options to select
     * @example await player.play();
     */
    async play(options: PlayOptions = {}): Promise<void> {
        
        try{
            const data = {
                context_uri: options.context,
                uris: options.uris,
                offset: options.offset,
                position_ms: options.position
            };

            const token = `Bearer ${this.token}`;

            if(options.device) await axios({ method: 'PUT', url: `https://api.spotify.com/v1/me/player/play`, data, params: { device_id: options.device }, headers: { Authorization: token } });
            else await axios({ method: 'PUT', url: `https://api.spotify.com/v1/me/player/play`, data, headers: { Authorization: token } });
        }catch(e){
            throw new UnexpectedError(e);
        }

    };

};