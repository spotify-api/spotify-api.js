export declare class Set {
    set: any[];
    constructor(set: any[]);
    get size(): number;
    get length(): number;
    get proper(): any[];
    get null(): boolean;
    get sizeType(): 'empty' | 'singleton' | 'many';
    get subsets(): any[];
    get properSubsets(): any[];
}
