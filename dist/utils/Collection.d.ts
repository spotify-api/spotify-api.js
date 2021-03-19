/**
 * A cache based collection for spotify-api.js for its purposes!
 */
export default class Collection<T> extends Map<string, T> {
    /**
     * Aliases for this.size!
     * @readonly
     */
    get length(): number;
    /**
     * A getter for this.toArray();
     * @readonly
     */
    get array(): T[];
    /**
     * Returns the first element of the collection!
     * @example col.first();
     */
    first(): T | undefined;
    /**
     * Returns the last element of the collection!
     * @example col.last();
     */
    last(): T | undefined;
    /**
     * Returns an random element from the array!
     * @example col.random()
     */
    random(): T | undefined;
    /**
     * Returns an array of values!
     * @example col.toArray();
     */
    toArray(): T[];
    /**
     * Insert items into the array!
     *
     * @param id The object key in the object to act as id!
     * @param items The items to insert
     * @example col.insert('id', [
     *     { id: '1', value: 'lol' }
     * ])
     */
    insert(id: string, ...items: T[]): this;
}
