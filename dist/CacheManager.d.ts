export default class CacheManager<K, V> extends Array<V> {
    key: string;
    constructor(key: string);
    get(id: K): V | null;
    random(): V;
    delete(id: K): void;
}
