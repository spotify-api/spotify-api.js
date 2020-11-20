export interface BasicOptions {
    codeImage?: string;
    dominantColor?: {
        hex: string;
        rgb: number[];
    };
};

export interface DominantColor { 
    hex?: string; 
    rgb: number[] 
}

export interface Followers{
    href?: null | string;
    total: number;
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

export interface LinkedTrack{
    external_urls: any;
    href: string;
    id: string;
    type: string;
    uri: string;
};