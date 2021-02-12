"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Cachemanager to store data of spotify api in cache and avoid hitting spotify api to prevent 429
 */
class CacheManager extends Array {
    /**
     * Cachemanager is something like Map to store data of spotify api in cache and avoid hitting spotify api to prevent 429
     *
     * @param key The object key which will act as id
     * @example const cache = new CacheManager('key');
     * cache.push(...[
     *     { key: 0, value: 1 },
     *     { key: 1, value: 2 }
     * ])
     *
     * cache.get(0); // Will return you { key: 0, value: 1 }
     * // If invalid key then will return null
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
        return this.find(x => x[this.key] == id) || null;
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
        for (let i = 0; i < this.length; i++) {
            if (this[i][this.key] == id)
                return true;
        }
        return false;
    }
    /**
     * Will push new elements to the array
     *
     * @param items Args of items to push into the array
     */
    push(...items) {
        let initialLength = this.length;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (!this.has(item[this.key])) {
                initialLength++;
                this[initialLength] = item;
            }
        }
        return this.length;
    }
    /**
     * Returns a key value based object to perform analysis!
     * @example cache.toKeyValue(); // Returns array of CacheDataset<T>!
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
     * @example CacheManager.create<string>('id'); // Creates new cache manager!
     */
    static create(id, ...items) {
        let cache = new CacheManager(id);
        cache.push(...items);
        return cache;
    }
}
exports.default = CacheManager;
;
