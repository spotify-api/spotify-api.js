/**
 * All the methods what spotify api support!
 */
export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * All the spotify element types
 */
export type SpotifyTypes = 'user' | 'episode' | 'playlist' | 'show';

/**
 * Just a simple raw object!
 */
export interface RawObject{
    [key: string]: any;
}

/**
 * Spotify api's image object!
 */
export interface Image{
    height: number | null;
    width: number | null;
    url: string;
};

/**
 * Spotify api's resume point 
 * This object consist the details of the point where you viewed the element at last!
 */
export interface ResumePoint{
    fullyPlayed: boolean;
    resumePoint: number;
};

/**
 * Spotify api's copyright object
 */
export interface Copyright{
    text: string;
    type: string;
};

/**
 * Spotify api's category object!
 */
export interface Category{
    href: string;
    icons: Image[];
    id: string;
    name: string;
};

