"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProperSubset = exports.isSubset = exports.subtract = exports.intersect = exports.union = exports.properSubsets = exports.subsets = exports.isEqual = exports.overlaps = exports.sizeType = exports.isProper = exports.isNull = exports.belongs = void 0;
const Util_1 = require("./Util");
function belongs(set, element) {
    return Util_1.parse(set).includes(element);
}
exports.belongs = belongs;
;
function isNull(set) {
    set = Util_1.proper(Util_1.parse(set));
    return Boolean(set.length);
}
exports.isNull = isNull;
;
function isProper(set) {
    set = Util_1.parse(set);
    return !(set.includes(null) || set.includes([]));
}
exports.isProper = isProper;
;
function sizeType(set) {
    set = Util_1.proper(Util_1.parse(set)).length;
    if (set == 0)
        return 'empty';
    else if (set == 1)
        return 'singleton';
    else
        return 'many';
}
exports.sizeType = sizeType;
;
function overlaps(setX, setY) {
    setX = Util_1.parse(setX);
    setY = Util_1.parse(setY);
    for (let i = 0; i < setX.length; i++)
        if (setY.includes(setX[i]))
            return true;
    return false;
}
exports.overlaps = overlaps;
;
function isEqual(setX, setY) {
    setX = Util_1.parse(setX);
    setY = Util_1.parse(setY);
    if (setX.length == setY.length) {
        for (let i = 0; i < setX.length; i++)
            if (!setY.includes(setX[i]))
                return false;
        return true;
    }
    else
        return false;
}
exports.isEqual = isEqual;
;
function subsets(set) {
    return Util_1.parse(set).reduce((subsets, value) => subsets.concat(subsets.map(set => [value, ...set])), [[]]);
}
exports.subsets = subsets;
;
function properSubsets(set) {
    return Util_1.proper(subsets(set));
}
exports.properSubsets = properSubsets;
;
function union(setX, setY) {
    setX = Util_1.parse(setX);
    setY = Util_1.parse(setY);
    return Util_1.removeDuplicates(setX.concat(setY));
}
exports.union = union;
;
function intersect(setX, setY) {
    setX = Util_1.parse(setX);
    setY = Util_1.parse(setY);
    return setX.filter(x => setY.includes(x));
}
exports.intersect = intersect;
;
function subtract(setX, setY) {
    setY = Util_1.parse(setY);
    return Util_1.parse(setX).filter(x => !setY.includes(x));
}
exports.subtract = subtract;
;
function isSubset(setX, setY) {
    setX = Util_1.parse(setX);
    setY = Util_1.parse(setY);
    for (let i = 0; i < setX.length; i++)
        if (!setY.includes(setX[i]))
            return false;
    return true;
}
exports.isSubset = isSubset;
;
function isProperSubset(setX, setY) {
    setX = Util_1.proper(Util_1.parse(setX));
    setY = Util_1.parse(setY);
    if (!isProper(setY))
        return false;
    for (let i = 0; i < setX.length; i++)
        if (!setY.includes(setX[i]))
            return false;
    return true;
}
exports.isProperSubset = isProperSubset;
;
//# sourceMappingURL=Methods.js.map