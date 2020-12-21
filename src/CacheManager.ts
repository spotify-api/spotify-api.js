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
        if(i) delete this[i];
    }

};