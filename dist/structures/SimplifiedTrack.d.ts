import Artist from './Artist';
import { DominantColor } from './Interface';
declare class SimplifiedTrack {
    artists: Artist[];
    availableMarkets: string[];
    discNumber: number;
    durationMs: number;
    explicit: boolean;
    externalUrls: any;
    href: string;
    id: string;
    name: string;
    previewUrl: string;
    trackNumber: number;
    type: string;
    uri: string;
    codeImage?: string;
    dominantColor?: DominantColor;
    constructor(data: any);
}
export default SimplifiedTrack;
