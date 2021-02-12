/**
 * Track Manager file
 */
import { TrackAudioFeatures, TrackAudioAnalysis } from "../structures/Interface";
import Client from '../Client';
import Spotify from "../Spotify";
import Track from "../structures/Track";
/**
 * Class of all Spotify Api Methods related to tracks
 */
export default class TrackManager extends Spotify {
    client: Client;
    /**
     * Class of all Spotify Api Methods related to shows
     *
     * @param client Your Spotify Client
     */
    constructor(client: Client);
    /**
     * Search tracks efficiently across spotify api!
     *
     * @param q Your query
     * @param options Options to configure your search...
     * @example const track = await spotify.tracks.search("oh my god by alec benjamin", { limit: 1, }); // Searches for the track and limit will be 20 by default
     */
    search(q: string, options?: {
        limit?: number;
        params?: any;
    }): Promise<Track[]>;
    /**
     * Returns Spotify Track information by the track id!
     *
     * @param id Id of the track
     * @param force If true will force fetch, if false then will first search cache!
     * @example const track = await spotify.tracks.get("track id"); // Get tracks by id...
     */
    get(id: string, force?: boolean): Promise<Track>;
    /**
     * Returns the audio features of the track by the track id!
     *
     * @param id Id of the track
     * @example const audioFeatures = await spotify.tracks.audioFeatures("track id"); // Get audio features of the track
     */
    audioFeatures(id: string): Promise<TrackAudioFeatures>;
    /**
     * Returns the audio analysis of the track by the track id!
     *
     * @param id Id of the track
     * @example const audioAnalysis = await spotify.tracks.audioAnalysis("track id"); // Get audio analysis of the track
     */
    audioAnalysis(id: string): Promise<TrackAudioAnalysis>;
    /**
     * This method uses client.user.deleteTrack
     * This method deletes the track from your save list
     *
     * @param ids Ids od the tracks
     */
    delete(...ids: string[]): Promise<void>;
    /**
     * This method uses client.user.addTrack
     * This method adds the track from your save list
     *
     * @param ids Ids of the track or tracks
     */
    add(...ids: string[]): Promise<void>;
}
