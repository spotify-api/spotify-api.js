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

    constructor(data){

        this.displayName = data.display_name;
        this.externalUrls = data.external_urls;
        this.followers = data.followers;
        this.href = data.href;
        this.id = data.id;
        this.type = data.type;
        this.uri = data.uri;
        this.images = data.images;
    };
};