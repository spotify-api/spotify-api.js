import Track from '../structures/Track';
import { SearchOptions, TrackAudioAnalysis, TrackAudioFeatures } from '../Types';
import BaseManager from './BaseManager';
/**
 * A class which manages the tracks api!
 */
export default class TrackManager extends BaseManager {
    /**
     * Search tracks!
     *
     * @param query Your query to search
     * @param options Basic SearchOptions but no `type` field should be provided!
     * @example await client.tracks.search('some query');
     */
    search(query: string, options: Omit<SearchOptions, 'type'>): Promise<Track[]>;
    /**
     * Returns the spotify track information by id
     *
     * @param id Spotify track id
     * @param force If true, will directly fetch else will search for cache first!
     * @param market The market where the data needs to be fetched from
     * @example await client.tracks.get('id');
     */
    get(id: string, force?: boolean, market?: string): Promise<Track | null>;
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
