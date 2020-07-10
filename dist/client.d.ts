import _track from './Class/Track/index';
import _artist from './Class/Artist/index';
import _oauth from './Class/OAuth/index';
export default class {
    token: string;
    track: _track;
    artist: _artist;
    oauth: _oauth;
    constructor(oauth: string);
}
