import _track from './Class/Track/index'
import _artist from './Class/Artist/index'
import _oauth from './Class/OAuth/index'
export default class {
  token:string
  track:_track
  artist:_artist
  oauth:_oauth
  constructor(oauth:string){
    if(!oauth)throw new Error('(Spotify-api.js)No OAuth token was Provided')
    this.token = oauth
    this.track = new _track(oauth)
    this.artist = new _artist(oauth)
    this.oauth = new _oauth(oauth)
  }
}