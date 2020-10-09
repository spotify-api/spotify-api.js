import Spotify from "../Spotify";
declare class User extends Spotify {
    get(id: string): Promise<any>;
}
export default User;
