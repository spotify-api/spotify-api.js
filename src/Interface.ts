import Spotify from './Spotify'
interface spotify extends Spotify{
    hexRgb(hex):number[]
    getData(uri):any
  }
  export default spotify;