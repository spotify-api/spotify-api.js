"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimplifiedArtist {
    constructor(data) {
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.uri = data.uri;
    }
    ;
}
;
exports.default = SimplifiedArtist;
//# sourceMappingURL=SimplifiedArtist.js.map