import { Image } from "./Interface";

export default class {

    href: string;
    icons: Image[];
    id: string;
    name: string;

    constructor(data){

        this.href = data.href;
        this.icons = data.icons;
        this.id = data.id;
        this.name = data.name;

    };
};