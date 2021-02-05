/**
 * Functional tructures for the players
 */
import Client from '../Client';
import { Device, Playback, PlayHistory } from './Interface';
/**
 * Spotify Api's Device Parser Function! Used in UserPlayer!
 *
 * @param data Raw data received by the spotify!
 * @example const device = Device(data);
 */
export declare function Device(data: any): Device;
/**
 * Spotify Api's Playback Parser Function!
 *
 * @param data Raw data received by the spotify api!
 * @param client Your Spotify Client
 * @example const playback = Playback(data, client);
 */
export declare function Playback(data: any, client: Client): Playback;
/**
 * Spotify Api's PlayHistory Parser Function
 *
 * @param data Raw data received by the spotify api!
 * @param client Your spotify client!
 * @example const history = PlayHistory(data, client);
 */
export declare function PlayHistory(data: any, client: Client): PlayHistory;
