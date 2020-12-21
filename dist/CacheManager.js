"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CacheManager extends Array {
    constructor(key) {
        super();
        this.key = key;
    }
    get(id) {
        return this.find(x => x[this.key] === id) || null;
    }
    random() {
        return this[Math.floor(Math.random() * this.length)];
    }
    delete(id) {
        let i = this.findIndex(x => x[this.key] === id);
        if (i)
            this.splice(i);
    }
    has(id) {
        return Boolean(this.find(x => x[this.key] === id));
    }
    push(...items) {
        return super.push(...items.filter(x => !this.has(x[this.key])));
    }
    clear() {
        this.forEach((x, i) => this.splice(i));
    }
    static create(id, ...items) {
        let cache = new CacheManager(id);
        cache.push(...items);
        return cache;
    }
}
exports.default = CacheManager;
;
