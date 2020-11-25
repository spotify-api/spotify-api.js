export * from './Util';
export { n as length } from './Util';
export { Set } from './Class';

export {
    belongs,
    isNull,
    isProper,
    sizeType,
    subsets,
    subsets as powerSet,
    properSubsets,
    union,
    intersect,
    subtract,
    isSubset,
    isProperSubset,
    overlaps,
    isEqual
} from './Methods';

export const version: string = '0.0.3';