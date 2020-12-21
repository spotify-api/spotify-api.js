export default class CacheManager<K, V> extends Array<V>{

    key: string;

    constructor(key: string){
        super();
        this.key = key;
    }

    get(id: K): V | null {
        return this.find(x => x[this.key] === id) || null;
    }

    random(): V {
        return this[Math.floor(Math.random() * this.length)];
    }

    delete(id: K): void {
        let i = this.findIndex(x => x[this.key] === id);
        if(i) this.splice(i);
    }

    has(id: K): boolean {
        return Boolean(this.find(x => x[this.key] === id));
    }

    push(...items: V[]): number {
        return super.push(...items.filter(x => !this.has(x[this.key])))
    }

    clear(): void {
        this.forEach((x, i) => this.splice(i));
    }

    static create<K, V>(id: string, ...items: V[]): CacheManager<K, V> {
        let cache = new CacheManager<K, V>(id);
        cache.push(...items);
        return cache;
    }

};