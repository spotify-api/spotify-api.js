/**
 * A cache based collection for spotify-api.js for its purposes!
 */
export default class Collection<T> extends Map<string, T>{

    /**
     * Aliases for this.size!
     * @readonly
     */
    get length(): number {
        return this.size;
    }

    /**
     * A getter for this.toArray();
     * @readonly
     */
    get array(): T[] {
        return [...this.values()];
    }

    /**
     * Returns the first element of the collection!
     * @example col.first();
     */
    first(): T | undefined {
        return this.values().next().value;
    }

    /**
     * Returns the last element of the collection!
     * @example col.last();
     */
    last(): T | undefined {
        return [...this.values()][this.size - 1];
    }
    
    /**
     * Returns an random element from the array!
     * @example col.random()
     */
    random(): T | undefined {
        let values = [...this.values()];
        return values[Math.floor(Math.random() * values.length)];
    }

    /**
     * Returns an array of values!
     * @example col.toArray();
     */
    toArray(): T[] {
        return [...this.values()];
    }

    /**
     * Insert items into the array!
     * 
     * @param id The object key in the object to act as id!
     * @param items The items to insert
     * @example col.insert('id', [
     *     { id: '1', value: 'lol' }
     * ]) 
     */
    insert(id: string, ...items: T[]): this {
        for(let i = 0; i < items.length; i++) this.set(items[i][id], items[i]);
        return this;
    }

}