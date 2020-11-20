import { Followers, Image } from "./Interface";
export default class {
    displayName: string;
    externalUrls: any;
    followers: Followers;
    href: string;
    id: string;
    type: string;
    uri: string;
    images: Image[];
    constructor(data: any);
}
