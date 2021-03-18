/**
 * All the methods what spotify api support!
 */
export declare type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
/**
 * All the spotify element types
 */
export declare type SpotifyTypes = 'user' | 'episode' | 'playlist' | 'show' | 'track';
/**
 * Just a simple raw object!
 */
export interface RawObject {
    [key: string]: any;
}
/**
 * Spotify api's image object!
 */
export interface Image {
    height: number | null;
    width: number | null;
    url: string;
}
/**
 * Spotify api's resume point
 * This object consist the details of the point where you viewed the element at last!
 */
export interface ResumePoint {
    fullyPlayed: boolean;
    resumePoint: number;
}
/**
 * Spotify api's copyright object
 */
export interface Copyright {
    text: string;
    type: string;
}
/**
 * Spotify api's category object!
 */
export interface Category {
    href: string;
    icons: Image[];
    id: string;
    name: string;
}
/**
 * Track audio feature object of spotify api!
 */
export interface TrackAudioFeatures {
    duration_ms: number;
    key: number;
    mode: number;
    time_signature: number;
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    loudness: number;
    speechiness: number;
    valence: number;
    tempo: number;
    id: string;
    uri: string;
    track_href: string;
    analysis_url: string;
    type: string;
}
/**
 * Time interval object of TrackAudioAnalysis
 */
export interface TimeInterval {
    start: number;
    duration: number;
    confidence: number;
}
/**
 * Audio analysis object of spotify api
 */
export interface TrackAudioAnalysis {
    bars: TimeInterval[];
    beats: TimeInterval[];
    sections: {
        start: number;
        duration: number;
        confidence: number;
        loudness: number;
        tempo: number;
        tempo_confidence: number;
        key: number;
        key_confidence: number;
        mode: number;
        mode_confidence: number;
        time_signature: number;
        time_signature_confidence: number;
    }[];
    segments: {
        start: number;
        duration: number;
        confidence: number;
        loudness_start: number;
        loudness_max: number;
        loudness_max_time: number;
        loudness_end: number;
        pitches: number[];
        timbre: number[];
    }[];
    tatums: TimeInterval[];
    track: {
        duration: number;
        sample_md5: string;
        offset_seconds: number;
        window_seconds: number;
        analysis_sample_rate: number;
        analysis_channels: number;
        end_of_fade_in: number;
        start_of_fade_out: number;
        loudness: number;
        tempo: number;
        tempo_confidence: number;
        time_signature: number;
        time_signature_confidence: number;
        key: number;
        key_confidence: number;
        mode: number;
        mode_confidence: number;
        codestring: string;
        code_version: number;
        echoprintstring: string;
        echoprint_version: number;
        synchstring: string;
        synch_version: number;
        rhythmstring: string;
        rhythm_version: number;
    };
}
/**
 * Spotify api's restriction object
 */
export interface Restriction {
    reason: string;
}
