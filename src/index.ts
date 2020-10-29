/**
 * File where exports all required only functions, classes
 */

import Client from './Client'
import '../package.json';

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
const version = '4.0.5'
  
export { 
    version,
    Client
};
  
export default Client;