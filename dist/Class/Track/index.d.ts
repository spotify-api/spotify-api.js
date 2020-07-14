import Spotify from "../../Spotify";
import spotify from "../../Interface";
declare class track extends Spotify implements spotify {
    search(q: string, limit?: null | number | string, options?: any | Object): Promise<any>;
    get(trackid: string): Promise<any>;
    audioFeatures(trackid: string): Promise<any>;
    analysis(trackid: string): Promise<any>;
}
export default track;
