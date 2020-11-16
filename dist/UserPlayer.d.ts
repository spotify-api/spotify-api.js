import Spotify from "./Spotify";
/**
 * UserPlayer which access the user player only if the scoped token
 * has those correct scopes
 */
declare class UserPlayer extends Spotify {
    /**
     * **Example:**
     * ```js
     * const currentPlayback = await player.getCurrentPlayback();
     * ```
     *
     * Returns the current playback
     */
    getCurrentPlayback(): Promise<any>;
    /**
     * **Example:**
     * ```js
     * const devices = await player.getDevices();
     * ```
     *
     * Returns the devices which has active player
     */
    getDevices(): Promise<any>;
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
        after?: any;
        before?: any;
    }): Promise<any>;
    getCurrentlyPlaying(): Promise<any>;
    pause(): Promise<any>;
    seek(position: number): Promise<any>;
    /**
     * **Example:**
     * ```js
     * await player.repeat('track');
     * ```
     *
     * Repeats the player
     *
     * @param type Type of repeat mode
     */
    repeat(type: 'track' | 'context' | 'off'): Promise<any>;
    /**
     * **Example:**
     * ```js
     * await player.setVolume(10);
     * ```
     *
     * Set the volume of the player
     *
     * @param volume Volume to set
     */
    setVolume(volume: number): Promise<any>;
    /**
     * **Example:**
     * ```js
     * await player.next()
     * ```
     *
     * Plays the next playback
     */
    next(): Promise<any>;
    /**
     * **Example:**
     * ```js
     * await player.previous()
     * ```
     *
     * Plays the previous playback
     */
    previous(): Promise<any>;
    /**
     * **Example:**
     * ```js
     * await player.play()
     * ```
     *
     * Plays the playback
     */
    play(): Promise<any>;
    /**
     * **Example:**
     * ```js
     * await player.shuffle()
     * ```
     *
     * Shuffles the playback
     *
     * @param state State while shuffling
     */
    shuffle(state?: boolean): Promise<any>;
}
export default UserPlayer;
