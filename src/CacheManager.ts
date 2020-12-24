/**
 * Cachemanager to store data of spotify api in cache and avoid hitting spotify api to prevent 429
 */
export default class CacheManager<K, V> extends Array<V>{

    key: string;

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
    constructor(key: string){
        super();
        this.key = key;
    }

    /**
     * This will use Array.prototype.find to find with the key provided at the constructor if none found will return null
     * 
     * @param id Id of the object to find
     */
    get(id: string): V | null {
        return this.find(x => x[this.key] === id) || null;
    }

    /**
     * Will return a random element from the array!
     */
    random(): V {
        return this[Math.floor(Math.random() * this.length)];
    }

    /**
     * This will delete the element from the array using Array.prototype.splice only if an element exists with the id
     * 
     * @param id Id of the object
     */
    delete(id: string): void {
        let i = this.findIndex(x => x[this.key] === id);
        if(i) this.splice(i);
    }

    /**
     * Nothing but just will return a boolean stating that does the element exists on the array by id
     * 
     * @param id Id of the object
     */
    has(id: string): boolean {
        return Boolean(this.find(x => x[this.key] === id));
    }

    /**
     * Will push new elements to the array
     * 
     * @param items Args of items to push into the array
     */
    push(...items: V[]): number {
        return super.push(...items.filter(x => !this.has(x[this.key])))
    }

    /**
     * Returns a key value based object to perform analysis!
     */
    toKeyValue(): { key: K; value: V; }[] {
        let res: Array<{ key: K; value: V; }> = [];
        for(let i = 0; i < this.length; i++) res.push({ key: this[i][this.key], value: this[i] });
        return res;
    }

    /**
     * A method mostly used to clone a cachemanager
     * 
     * @param id Object key name which will be the id
     * @param items Arguments to push into the new cachemanager
     */
    static create<K, V>(id: string, ...items: V[]): CacheManager<K, V> {
        let cache = new CacheManager<K, V>(id);
        cache.push(...items);
        return cache;
    }

};