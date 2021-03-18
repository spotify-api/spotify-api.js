import Track from '../structures/Track';
import { TrackAudioAnalysis, TrackAudioFeatures } from '../Types';
import BaseManager from './BaseManager';
/**
 * A class which manages the tracks api!
 */
export default class TrackManager extends BaseManager {
    /**
     * Returns the spotify track information by id
     *
     * @param id Spotify track id
     * @param force await client.users.get('id');
     * @example await client.tracks.get('id');
     */
    get(id: string, force?: boolean): Promise<Track | null>;
    /**
     * Returns the audio features of the spotify track
     *
     * @param id The id of the spotify track
     * @example await client.tracks.getAudioFeatures('id');
     */
    getAudioFeatures(id: string): Promise<TrackAudioFeatures | null>;
    /**
     * Returns the audio analysis of the spotify track
     *
     * @param id The id of the spotify track
     * @example await client.tracks.getAudioAnalysis('id');
     */
    getAudioAnalysis(id: string): Promise<TrackAudioAnalysis | null>;
}
export type { Track };
