"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proper = exports.P = exports.n = exports.parse = exports.removeDuplicates = void 0;
function removeDuplicates(set) {
    if (!set || !Array.isArray(set))
        throw new Error('invalid form of set!');
    return set.filter((x, i) => set.indexOf(x) === i);
}
exports.removeDuplicates = removeDuplicates;
;
function parse(set) {
    if (!set || !Array.isArray(set))
        throw new Error('invalid form of set!');
    return removeDuplicates(set);
}
exports.parse = parse;
;
function n(set) {
    return parse(set).length;
}
exports.n = n;
;
function P(set) {
    return parse(set).reduce((subsets, value) => subsets.concat(subsets.map(set => [value, ...set])), [[]]);
}
exports.P = P;
;
function proper(set) {
    return parse(set).filter(x => Array.isArray(x) ? x.length : x);
}
exports.proper = proper;
;
//# sourceMappingURL=Util.js.map