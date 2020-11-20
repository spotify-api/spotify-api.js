"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Artist_1 = __importDefault(require("./Artist"));
class SimplifiedTrack {
    constructor(data) {
        this.artists = data.artists.map(x => new Artist_1.default(x));
        this.availableMarkets = data.available_markets;
        this.discNumber = data.disc_number;
        this.durationMs = data.duration_ms;
        this.explicit = data.explicit;
        this.externalUrls = data.external_urls;
        this.href = data.href;
        this.id = data.id;
        this.name = data.name;
        this.previewUrl = data.preview_url;
        this.trackNumber = data.track_number;
        this.type = data.type;
        this.uri = data.uri;
        if (data.codeImage) {
            this.codeImage = data.codeImage;
            this.dominantColor = data.dominantColor;
        }
        ;
    }
    ;
}
;
exports.default = SimplifiedTrack;
//# sourceMappingURL=SimplifiedTrack.js.map