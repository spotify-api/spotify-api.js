"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A cache based collection for spotify-api.js for its purposes!
 */
class Collection extends Map {
    /**
     * Aliases for this.size!
     * @readonly
     */
    get length() {
        return this.size;
    }
    /**
     * A getter for this.toArray();
     * @readonly
     */
    get array() {
        return [...this.values()];
    }
    /**
     * Returns the first element of the collection!
     * @example col.first();
     */
    first() {
        return this.values().next().value;
    }
    /**
     * Returns the last element of the collection!
     * @example col.last();
     */
    last() {
        return [...this.values()][this.size - 1];
    }
    /**
     * Returns an random element from the array!
     * @example col.random()
     */
    random() {
        let values = [...this.values()];
        return values[Math.floor(Math.random() * values.length)];
    }
    /**
     * Returns an array of values!
     * @example col.toArray();
     */
    toArray() {
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
    insert(id, ...items) {
        for (let i = 0; i < items.length; i++)
            this.set(items[i][id], items[i]);
        return this;
    }
}
exports.default = Collection;
