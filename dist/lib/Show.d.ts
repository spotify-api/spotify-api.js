import Spotify from "../Spotify";
declare class Show extends Spotify {
    get(id: string): Promise<any>;
    getEpisodes(id: string, limit?: number): Promise<any>;
}
export default Show;
