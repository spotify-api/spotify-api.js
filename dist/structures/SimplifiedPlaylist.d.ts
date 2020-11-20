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
    constructor(data: any);
}
