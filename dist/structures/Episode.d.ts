import Show from "./Show";
import Client from "../Client";
import { Image, RawObject, ResumePoint, SpotifyTypes, SpotifyURI } from "../Types";
/**
 * Spotify Api's Episode Object!
 */
declare class Episode {
    readonly data: any;
    readonly client: Client;
    audioPreviewUrl: string | null;
    description: string;
    duration: number;
    explicit: boolean;
    externalUrls: RawObject;
    href: string;
    id: string;
    images: Image[];
    isExternallyHosted: boolean;
    playable: boolean;
    languages: string[];
    name: string;
    releaseDate: string;
    releaseDatePrecision: string;
    type: SpotifyTypes;
    uri: SpotifyURI;
    resumePoint?: ResumePoint;
    /**
     * Spotify Api's Episode Object!
     *
     * @param data Received raw data from the spotify api
     * @param client Your Spotify client
     * @example const episode = new Episode(data, client);
     */
    constructor(data: any, client: Client);
    /**
     * Returns a code image
     * @param color Hex color code
     */
    makeCodeImage(color?: string): string;
    /**
     * Returns the Spotify Show Object which the episode belongs to. Will return null if none!
     * @readonly
     */
    get show(): Show | null;
    /**
     * Returns the Date object when the episode was released at!
     * @readonly
     */
    get releasedAt(): Date;
    /**
     * Fetches the Episode and refreshes the cache!
     */
    fetch(): Promise<Episode>;
    /**
     * Add this episode to your save list!
     * @example await episode.add();
     */
    add(): Promise<boolean>;
    /**
     * Remove this episode from your save list!
     * @example await episode.delete();
     */
    delete(): Promise<boolean>;
    /**
     * Returns a boolean stating is this episodes saved on the user's savelist (library)
     * @example const isSaved = await episode.saved();
     */
    saved(): Promise<boolean>;
}
export default Episode;
