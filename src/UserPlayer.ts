/**
 * UserPlayer which access the user player only if the scoped token
 * has those correct scopes
 */
import { MissingParamError, UnexpectedError } from "./Error";
import Spotify from "./Spotify";

/**
 * UserPlayer which access the user player only if the scoped token
 * has those correct scopes
 */
class UserPlayer extends Spotify{

    /**
     * **Example:**
     * ```js
     * const currentPlayback = await player.getCurrentPlayback();
     * ```
     * 
     * Returns the current playback
     */
    async getCurrentPlayback(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/me/player`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
    };

    /**
     * **Example:**
     * ```js
     * const devices = await player.getDevices();
     * ```
     * 
     * Returns the devices which has active player
     */
    async getDevices(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/me/player/devices`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
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
    async getRecentlyPlayed(
        options?: {
            limit?: number,
            after?: any,
            before?: any
        }
    ): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/me/player/recently-played`,
                        params: options || {}
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
    };

    async getCurrentlyPlaying(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        link: `v1/me/player/currently-playing`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
    };

    async pause(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/me/player/pause`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
    };

    async seek(position: number): Promise<any> {
        return new Promise(async(resolve, reject) => {
            if(!position) reject(new MissingParamError('missing position to seek'));

            try{
                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/me/player/seek`,
                        params: {
                            position_ms: position
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
    };

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
    async repeat(type: 'track' | 'context' | 'off'): Promise<any> {
        return new Promise(async(resolve, reject) => {
            if(!type) reject(new MissingParamError('missing type'));

            try{
                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/me/player/pause`,
                        params: {
                            state: type
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
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
     */
    async setVolume(volume: number): Promise<any> {
        return new Promise(async(resolve, reject) => {
            if(!volume) reject(new MissingParamError('missing volume'));

            try{
                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/me/player/volume`,
                        params: {
                            volume_percent: volume
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
    };

    /**
     * **Example:**
     * ```js
     * await player.next()
     * ```
     * 
     * Plays the next playback
     */
    async next(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        method: 'POST',
                        link: `v1/me/player/next`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
    };

    /**
     * **Example:**
     * ```js
     * await player.previous()
     * ```
     * 
     * Plays the previous playback
     */
    async previous(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        method: 'POST',
                        link: `v1/me/player/previous`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
    };

    /**
     * **Example:**
     * ```js
     * await player.play()
     * ```
     * 
     * Plays the playback
     */
    async play(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/me/player/play`
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
    };

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
    async shuffle(state?: boolean): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                resolve(
                    await this.fetch({
                        method: 'PUT',
                        link: `v1/me/player/play`,
                        params: {
                            state: Boolean(state)
                        }
                    })
                );
            }catch(e){
                reject(new UnexpectedError(e));
            };
        });
    };

};

export default UserPlayer;