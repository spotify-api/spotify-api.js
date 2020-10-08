interface getOptions {
    link: string;
    headers?: any;
    params?: any;
}
export default class {
    token: string;
    constructor(oauth: string);
    hexToRgb(hex: string): number[] | void;
    fetch(options: getOptions): Promise<any>;
    getURIData(uri: string): Promise<any>;
    getCodeImage(uri: string): Promise<any>;
}
export {};
