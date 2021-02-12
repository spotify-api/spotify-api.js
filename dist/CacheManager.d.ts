/**
 * Cachemanager to store data of spotify api in cache and avoid hitting spotify api to prevent 429
 */
export default class CacheManager<T> extends Array<T> {
    readonly key: string;
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
    constructor(key: string);
    /**
     * This will use Array.prototype.find to find with the key provided at the constructor if none found will return null
     *
     * @param id Id of the object to find
     */
    get(id: string): T | null;
    /**
     * Will return a random element from the array!
     */
    random(): T;
    /**
     * This will delete the element from the array using Array.prototype.splice only if an element exists with the id
     *
     * @param id Id of the object
     */
    delete(id: string): void;
    /**
     * Nothing but just will return a boolean stating that does the element exists on the array by id
     *
     * @param id Id of the object
     */
    has(id: string): boolean;
    /**
     * Will push new elements to the array
     *
     * @param items Args of items to push into the array
     */
    push(...items: T[]): number;
    /**
     * Returns a key value based object to perform analysis!
     * @example cache.toKeyValue(); // Returns array of CacheDataset<T>!
     */
    toKeyValue(): {
        key: string;
        value: T;
    }[];
    /**
     * A method mostly used to clone a cachemanager
     *
     * @param id Object key name which will be the id
     * @param items Arguments to push into the new cachemanager
     * @example CacheManager.create<string>('id'); // Creates new cache manager!
     */
    static create<T>(id: string, ...items: T[]): CacheManager<T>;
}
