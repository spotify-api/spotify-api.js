"use strict";
/**
 * File where exports all required only functions, classes
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.version = void 0;
const Client_1 = __importDefault(require("./Client"));
exports.Client = Client_1.default;
require("../package.json");
/**
 * To view up the version of the package.
 *
 * **Example:**
 * ```js
 * const spotify = require('spotify-api.js');
 * console.log(spotify.version);
 * ```
 *
 * Always try to update your spotify-api.js to v4.x.x
 */
const version = '4.0.5';
exports.version = version;
exports.default = Client_1.default;
//# sourceMappingURL=index.js.map