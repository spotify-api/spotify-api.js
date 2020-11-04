import Spotify from "./Spotify";
declare class UserPlayer extends Spotify {
    getCurrentPlayback(): Promise<any>;
    getDevices(): Promise<any>;
    getRecentlyPlayed(options?: {
        limit?: number;
        after?: any;
        before?: any;
    }): Promise<any>;
    getCurrentlyPlaying(): Promise<any>;
    pause(): Promise<any>;
    seek(position: number): Promise<any>;
    repeat(type: 'track' | 'context' | 'off'): Promise<any>;
    setVolume(volume: number): Promise<any>;
    next(): Promise<any>;
    previous(): Promise<any>;
    play(): Promise<any>;
    shuffle(state?: boolean): Promise<any>;
}
export default UserPlayer;
