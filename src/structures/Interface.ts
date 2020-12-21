import Playlist from "./Playlist";

export interface DominantColor { 
    hex?: string; 
    rgb: number[] 
};

export interface BasicOptions {
    codeImage?: string;
    dominantColor?: DominantColor;
};

export interface CodeImageReturn {
    image: string;
    dominantColor: {
        hex: string;
        rgb: number[];
    };
};

export interface Copyright{
    text: string;
    type: string;
};

export interface Image{
    height: number;
    width: number;
    url: string;
};

export interface Restriction{
    reason: string;
};

export interface ResumePoint{
    fullyPlayed: boolean;
    resumePoint: number;
};

export interface Category{
    href: string;
    icons: Image[];
    id: string;
    name: string;
};

export interface FeaturedPlaylistReturn{
    message: string;
    readonly playlists: Playlist[]
};

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
};

export interface TimeInterval{
    start: number;
    duration: number;
    confidence: number;
};

export interface TrackAudioAnalysis{
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
};

export interface Paging<T>{
    href: string;
    items: T[];
    limit: number;
    next: string | null;
    previous: string | null;
    offset: number;
    total: number;
};

export interface SearchReturn{
    artists?: Paging<any>;
    albums?: Paging<any>;
    tracks?: Paging<any>;
    shows?: Paging<any>;
    episodes?: Paging<any>;
    playlists?: Paging<any>;
};