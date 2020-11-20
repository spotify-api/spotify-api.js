import { Image } from "./Interface";
import PublicUser from "./PublicUser";

export default class {

    collaborative: boolean;
    description: string;
    externalUrls: any;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: PublicUser;
    primaryColor: any;
    public: boolean | null;
    snapshotId: string;
    type: string;
    uri: string;
    totalTracks: number;

    constructor(data){

        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.owner = data.owner;
        this.primaryColor = data.primary_color;
        this.public = data.public;
        this.snapshotId = data.snapshot_id;
        this.type = data.type;
        this.uri = data.uri;
        this.totalTracks = data.tracks.total;

    };
};