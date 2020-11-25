export function removeDuplicates(set: any[]): any[] {
    if(!set || !Array.isArray(set)) throw new Error('invalid form of set!');
    return set.filter((x, i) => set.indexOf(x) === i);
};

export function parse(set: any[]): any[] {
    if(!set || !Array.isArray(set)) throw new Error('invalid form of set!');
    return removeDuplicates(set);
};

export function n(set: any): number {
    return parse(set).length;
};

export function P(set: any): any[] {
    return parse(set).reduce((subsets, value) => subsets.concat(subsets.map(set => [value, ...set])), [[]]);
};

export function proper(set: any): any[] {
    return parse(set).filter(x => Array.isArray(x) ? x.length : x);
};