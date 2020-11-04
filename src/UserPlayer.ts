import { MissingParamError, UnexpectedError } from "./Error";
import Spotify from "./Spotify";

class UserPlayer extends Spotify{

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