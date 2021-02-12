import Client from "./Client";
import Spotify from "./Spotify";
import { Playback as PlaybackStructure, Device as DeviceStructure, RecentlyPlayed, AdditionalTypes, CurrentlyPlaying, PlayOptions } from "./structures/Interface";
/**
 * UserPlayer which access the current user's player
 * Like UserClient this class also requires a current user authorized token!
 */
export default class UserPlayer extends Spotify {
    client: Client;
    /**
     * UserPlayer which access the current user's player
     * Like UserClient this class also requires a current user authorized token!
     *
     * @param client Your Spotify Client
     * @example const player = new UserPlayer(client);
     */
    constructor(client: Client);
    /**
     * Returns the current playback been playing on the currently active device!
     *
     * @example const currentPlayback = await player.getCurrentPlayback();
     */
    getCurrentPlayback(): Promise<PlaybackStructure>;
    /**
     * Returns the devices where the current user has been signed in!
     *
     * @example const devices = await player.getDevices();
     */
    getDevices(): Promise<DeviceStructure[]>;
    /**
     * Returns the recently played track information!
     *
     * @param options Configure your results by basic RecentlyPlayedOptions
     * @example const recentlyPlayed = await player.getRecentlyPlayed();
     */
    getRecentlyPlayed(options?: {
        limit?: number;
        after?: string;
        before?: string;
        additionalTypes?: AdditionalTypes;
    }): Promise<RecentlyPlayed>;
    /**
     * Returns the CurrentlyPlaying object consisting all information about the currently playing ad, episode, track, etc!
     *
     * @param additionalTypes Addtional types. Should be one of "track" or "episode"!
     * @example const currentlyPlaying = await player.getCurrentPlaying();
     */
    getCurrentlyPlaying(additionalTypes?: AdditionalTypes): Promise<CurrentlyPlaying>;
    /**
     * Will pause the currently playing on the device by device id! If device id not provided, will pause the active one!
     *
     * @param device Device id which can be found through getDevices method
     * @example player.pause('device-id'); // If id not provided then will stop the currently playing player!
     */
    pause(device?: string): Promise<void>;
    /**
     * Will seek into the position in the currently playing on the device by device id! If device id not provided, will pause the active one!
     *
     * @param position Position in ms to seek
     * @param device Device id to seek else will seek in the currently playing player
     * @example player.seek(100);
     * player.seek(100, 'deviceid');
     */
    seek(position: number | string, device?: string): Promise<void>;
    /**
     * Sets the repeat mode for the current playing playback!
     *
     * @param type Type of repeat mode
     * @param device Device id of the device else will use currently playing track
     * @example await player.repeat('track');
     */
    repeat(type: 'track' | 'context' | 'off', device?: string): Promise<void>;
    /**
     * Set the volume of the current playing playbac!
     *
     * @param volume Volume to set in percent ranging from 0 to 100!
     * @param device Device id. Optional!
     * @example await player.setVolume(10);
     */
    setVolume(volume: string | number, device?: string): Promise<void>;
    /**
     * Plays the next playback in the currently playing player!
     *
     * @param device Device id to skip the track if not provided then will skip from the current player
     * @example await player.next()
     */
    next(device?: string | number): Promise<void>;
    /**
     * Plays the previous playback in the currently playing player!
     *
     * @param device Device id to play the previous track, if not provided, then will implement it in the current player
     * @example await player.previous()
     */
    previous(device?: string | number): Promise<void>;
    /**
     * Shuffle or unshuffle playback in the current playing player!
     *
     * @param state A boolean stating that it should shuffle or not?
     * @param device Device id to play the previous track, if not provided, then will implement it in the current player
     * @example await player.shuffle(); // Will shuffle
     * await player.shuffle(false); // Will unshuffle
     */
    shuffle(state?: boolean, device?: string): Promise<void>;
    /**
     * Plays or resumes the playback in the currently playing player!
     *
     * @param options All the play options to select
     * @example await player.play();
     */
    play(options?: PlayOptions): Promise<void>;
}
