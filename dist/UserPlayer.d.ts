/**
 * UserPlayer which access the user player only if the scoped token
 * has those correct scopes
 */
import Client from "./Client";
import Spotify from "./Spotify";
import CacheManager from "./CacheManager";
import { Playback as PlaybackStructure, Device as DeviceStructure, RecentlyPlayed, AdditionalTypes, CurrentlyPlaying, PlayOptions } from "./structures/Interface";
/**
 * UserPlayer which access the user player only if the scoped token
 * has those correct scopes
 */
declare class UserPlayer extends Spotify {
    client: Client;
    constructor(data: any, client: Client);
    /**
     * **Example:**
     * ```js
     * const currentPlayback = await player.getCurrentPlayback();
     * ```
     *
     * Returns the current playback
     */
    getCurrentPlayback(): Promise<PlaybackStructure>;
    /**
     * **Example:**
     * ```js
     * const devices = await player.getDevices();
     * ```
     *
     * Returns the devices which has active player
     */
    getDevices(): Promise<CacheManager<string, DeviceStructure>>;
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
    getRecentlyPlayed(options?: {
        limit?: number;
        after?: string;
        before?: string;
        additionalTypes?: AdditionalTypes;
    }): Promise<RecentlyPlayed>;
    /**
     * **Example:**
     * ```js
     * const currentlyPlaying = await player.getCurrentPlaying();
     * ```
     *
     * @param additionalTypes Addtional types such as episode and track!
     */
    getCurrentlyPlaying(additionalTypes?: AdditionalTypes): Promise<CurrentlyPlaying>;
    /**
     * **Example:**
     * ```js
     * player.pause('device-id'); // If id not provided then will stop the currently playing player!
     * ```
     *
     * @param device Device id which can be dounf through getDevices method
     */
    pause(device?: string): Promise<void>;
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
    seek(position: number | string, device?: string): Promise<void>;
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
    repeat(type: 'track' | 'context' | 'off', device?: string): Promise<void>;
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
    setVolume(volume: string | number, device?: string): Promise<void>;
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
    next(device?: string | number): Promise<void>;
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
    previous(device?: string | number): Promise<void>;
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
    shuffle(state?: boolean, device?: string): Promise<void>;
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
    play(options?: PlayOptions): Promise<void>;
}
export default UserPlayer;
