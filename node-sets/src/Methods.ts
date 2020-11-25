import { parse, proper, removeDuplicates } from './Util';

export function belongs(set: any, element: any): boolean {
    return parse(set).includes(element);
};

export function isNull(set: any): boolean {
    set = proper(parse(set));
    return Boolean(set.length);
};

export function isProper(set: any): boolean {
    set = parse(set);
    return !(set.includes(null) || set.includes([]));
};

export function sizeType(set: any): 'empty' | 'singleton' | 'many' {
    set = proper(parse(set)).length;
    if(set == 0) return 'empty';
    else if(set == 1) return 'singleton';
    else return 'many';
};

export function overlaps(setX: any, setY: any): boolean {
    setX = parse(setX);
    setY = parse(setY);
    for(let i = 0; i < setX.length; i++) if(setY.includes(setX[i])) return true;
    return false;
};

export function isEqual(setX: any, setY: any): boolean {
    setX = parse(setX);
    setY = parse(setY);

    if(setX.length == setY.length){
        for(let i = 0; i < setX.length; i++) if(!setY.includes(setX[i])) return false;
        return true;
    }
    else return false;
};

export function subsets(set: any): any[] {
    return parse(set).reduce((subsets, value) => subsets.concat(subsets.map(set => [value, ...set])), [[]]);
};

export function properSubsets(set: any): any[] {
    return proper(subsets(set));
};

export function union(setX: any, setY: any): any[] {
    setX = parse(setX);
    setY = parse(setY);
    return removeDuplicates(setX.concat(setY));
};

export function intersect(setX: any, setY: any): any[] {
    setX = parse(setX);
    setY = parse(setY);
    return setX.filter(x => setY.includes(x));
};

export function subtract(setX: any, setY: any): any[] {
    setY = parse(setY);
    return parse(setX).filter(x => !setY.includes(x))
};

export function isSubset(setX: any, setY: any): boolean {
    setX = parse(setX);
    setY = parse(setY);
    for(let i = 0; i < setX.length; i++) if(!setY.includes(setX[i])) return false
    return true
};

export function isProperSubset(setX: any, setY: any): boolean {
    setX = proper(parse(setX));
    setY = parse(setY);
    if(!isProper(setY)) return false;
    for(let i = 0; i < setX.length; i++) if(!setY.includes(setX[i])) return false
    return true
};