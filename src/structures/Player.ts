/**
 * Functional tructures for the players
 */
import Client from '../Client';
import Episode from './Episode';
import { Device, Playback, PlayHistory } from './Interface';
import Track from './Track';

/**
 * Spotify Api's Device Parser Function! Used in UserPlayer!
 * 
 * @param data Raw data received by the spotify!
 * @example const device = Device(data);
 */
export function Device(data: any): Device {

    return {
        id: data.id,
        isActive: data.is_active,
        isRestricted: data.is_restricted,
        name: data.name,
        type: data.type,
        volume: data.volume_percent
    };

};

/**
 * Spotify Api's Playback Parser Function!
 * 
 * @param data Raw data received by the spotify api!
 * @param client Your Spotify Client
 * @example const playback = Playback(data, client);
 */
export function Playback(data: any, client: Client): Playback {

    return {
        get device(){ return Device(data.device) },
        timestamp: data.timestamp,
        progress: data.progress_ms,
        isPlaying: data.is_playing,
        currentPlayingType: data.currently_playing_type,
        actions: data.actions,
        item: data.item ? ((data.item.type == 'track') ? new Track(data.item, client) : new Episode(data.item, client)) : null,
        shuffle: data.shuffle_state,
        repeat: data.repeat_state,
        context: {
            externalUrls: data.context.external_urls,
            href: data.context.href,
            type: data.context.type,
            uri: data.context.uri
        }
    }

};

/**
 * Spotify Api's PlayHistory Parser Function
 * 
 * @param data Raw data received by the spotify api!
 * @param client Your spotify client!
 * @example const history = PlayHistory(data, client);
 */
export function PlayHistory(data: any, client: Client): PlayHistory {

    return {
        track: new Track(data.track, client),
        playedAt: data.played_at,
        context: {
            externalUrls: data.context.external_urls,
            href: data.context.href,
            type: data.context.type,
            uri: data.context.uri
        }
    };

};