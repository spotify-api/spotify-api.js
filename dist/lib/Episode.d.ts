import Spotify from "../Spotify";
declare class Episode extends Spotify {
    get(id: string): Promise<any>;
}
export default Episode;
