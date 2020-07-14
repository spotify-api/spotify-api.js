import spotify from "../../Interface";
import Spotify from "../../Spotify";
declare class Album extends Spotify implements spotify {
    search(q: string, limit?: null | number | string, options?: any): Promise<any>;
    get(albumid: string): Promise<any>;
    tracks(albumid: string, limit: null | number | string): Promise<any>;
}
export default Album;
