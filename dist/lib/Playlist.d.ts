import Spotify from "../Spotify";
declare class Playlist extends Spotify {
    get(id: string): Promise<any>;
    getTracks(id: string, options?: {
        limit?: null | string | number;
        advanced?: boolean;
    }): Promise<any>;
}
export default Playlist;
