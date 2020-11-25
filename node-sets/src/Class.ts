import * as Methods from './Methods';
import { n, P, proper, removeDuplicates, parse } from './Util';

export class Set{

    set: any[]

    constructor(set: any[]){
        this.set = parse(set);
    };

    get size(): number { return this.set.length };
    get length(): number { return this.set.length };
    get proper(): any[] { return proper(this.set) };
    get null(): boolean { return Methods.isNull(this.set) };
    get sizeType(): 'empty' | 'singleton' | 'many' { return Methods.sizeType(this.set) };
    get subsets(): any[] { return Methods.subsets(this.set) };
    get properSubsets(): any[] { return Methods.properSubsets(this.set) };

};