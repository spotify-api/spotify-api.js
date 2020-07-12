import _track from "./Class/Track/index";
import _artist from "./Class/Artist/index";
import _oauth from "./Class/OAuth/index";
import _album from "./Class/Album/index";
export default class {
    token: string;
    track: _track;
    artist: _artist;
    oauth: _oauth;
    album: _album;
    constructor(oauth: string);
}
