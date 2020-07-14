import Spotify from "../../Spotify";
import spotify from "../../Interface";
declare class artist extends Spotify implements spotify {
    search(q: string, limit?: null | number | string, options?: any): Promise<any>;
    get(artid: string, option?: any): Promise<any>;
    albums(artistid: string, limit?: null | string | number, option?: any): Promise<any>;
    top(id: string, option?: any): Promise<any>;
    related(id: string, options?: any): Promise<any>;
}
export default artist;
