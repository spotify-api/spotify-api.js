/**
 * All the methods what spotify api support!
 */
export declare type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
/**
 * All the spotify element types
 */
export declare type SpotifyTypes = 'user' | 'episode' | 'playlist' | 'show' | 'track' | 'album' | 'artist';
/**
 * Spotify uri type
 */
export declare type SpotifyURI = `spotify:${SpotifyTypes}:${string}:${SpotifyTypes}:${string}` | `spotify:${SpotifyTypes | 'search'}:${string}`;
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
export interface Restriction<T = string> {
    reason: T;
}
/**
 * Paging options
 */
export interface PagingOptions {
    limit?: number;
    offset?: number;
    market?: string;
    [key: string]: any;
}
/**
 * Options for client.search
 */
export interface SearchOptions {
    type: SpotifyTypes | SpotifyTypes[];
    market?: string;
    limit?: number;
    offset?: number;
    [key: string]: any;
}
/**
 * Spotify api's playlist track reference object
 */
export interface PlaylistTracksRef {
    href: string;
    total: number;
}
/**
 * Options for get multiple functions!
 */
export interface GetMultipleOptions {
    ids: string[];
    market?: string;
}
/**
 * Options for affinity
 */
export interface AffinityOptions {
    time_range?: 'long_term' | 'medium_term' | 'short_term';
    limit?: number;
    offset?: number;
}
/**
 * Spotify Api's Paging Object
 */
export interface Paging<T> {
    limit: number;
    offset: number;
    total: number;
    items: T[];
}
/**
 * Spotify Api's external ids object
 */
export interface ExternalIDs {
    ean?: string;
    isrc?: string;
    upc?: string;
}
