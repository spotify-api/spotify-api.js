export default class CacheManager<K, V> extends Array<V> {
    key: string;
    constructor(key: string);
    get(id: K): V | null;
    random(): V;
    delete(id: K): void;
    has(id: K): boolean;
    push(...items: V[]): number;
    clear(): void;
    static create<K, V>(id: string, ...items: V[]): CacheManager<K, V>;
}
