"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Cachemanager to store data of spotify api in cache and avoid hitting spotify api to prevent 429
 */
class CacheManager extends Array {
    /**
     * ```js
     * const cache = CacheManager.create('key', [
     *     { key: 0, value: 1 },
     *     { key: 1, value: 2 }
     * ]);
     *
     * cache.get(0); // Will return you { key: 0, value: 1 }
     * // If inavlid key then will return null
     * ```
     *
     * @param key The object key which will act as id
     */
    constructor(key) {
        super();
        this.key = key;
    }
    /**
     * This will use Array.prototype.find to find with the key provided at the constructor if none found will return null
     *
     * @param id Id of the object to find
     */
    get(id) {
        return this.find(x => x[this.key] === id) || null;
    }
    /**
     * Will return a random element from the array!
     */
    random() {
        return this[Math.floor(Math.random() * this.length)];
    }
    /**
     * This will delete the element from the array using Array.prototype.splice only if an element exists with the id
     *
     * @param id Id of the object
     */
    delete(id) {
        let i = this.findIndex(x => x[this.key] === id);
        if (i)
            this.splice(i);
    }
    /**
     * Nothing but just will return a boolean stating that does the element exists on the array by id
     *
     * @param id Id of the object
     */
    has(id) {
        return Boolean(this.find(x => x[this.key] === id));
    }
    /**
     * Will push new elements to the array
     *
     * @param items Args of items to push into the array
     */
    push(...items) {
        return super.push(...items.filter(x => !this.has(x[this.key])));
    }
    /**
     * Returns a key value based object to perform analysis!
     */
    toKeyValue() {
        let res = [];
        for (let i = 0; i < this.length; i++)
            res.push({ key: this[i][this.key], value: this[i] });
        return res;
    }
    /**
     * A method mostly used to clone a cachemanager
     *
     * @param id Object key name which will be the id
     * @param items Arguments to push into the new cachemanager
     */
    static create(id, ...items) {
        let cache = new CacheManager(id);
        cache.push(...items);
        return cache;
    }
}
exports.default = CacheManager;
;
