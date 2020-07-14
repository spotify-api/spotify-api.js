import spotify from "../../Interface";
import Spotify from "../../Spotify";
declare class Playlist extends Spotify implements spotify {
    get(id: string): Promise<any>;
    tracks(id: string, limit?: null | number | string, options?: any): Promise<any>;
}
export default Playlist;
