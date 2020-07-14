import spotify from "../../Interface";
import Spotify from "../../Spotify";
declare class User extends Spotify implements spotify {
    get(userid: string): Promise<any>;
}
export default User;
