import Spotify from './Spotify';
interface spotify extends Spotify {
    hexRgb(hex: any): number[];
}
export default spotify;
