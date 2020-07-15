import Spotify from './Spotify';
interface spotify extends Spotify {
    hexRgb(hex: any): number[];
    getData(uri: any): any;
}
export default spotify;
