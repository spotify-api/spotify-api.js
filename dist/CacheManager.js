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
            delete this[i];
    }
}
exports.default = CacheManager;
;
