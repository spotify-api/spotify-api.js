export interface DominantColor {
    hex?: string;
    rgb: number[];
}
export interface BasicOptions {
    codeImage?: string;
    dominantColor?: DominantColor;
}
export interface CodeImageReturn {
    image: string;
    dominantColor: {
        hex: string;
        rgb: number[];
    };
}
export interface Copyright {
    text: string;
    type: string;
}
export interface Image {
    height: number;
    width: number;
    url: string;
}
export interface Restriction {
    reason: string;
}
export interface ResumePoint {
    fullyPlayed: boolean;
    resumePoint: number;
}
