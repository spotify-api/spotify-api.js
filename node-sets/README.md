# Node Set Theory

A Very brief wrapper for set calculations using Arrays...

# Links
- [Docs](https://github.com/Scientific-Guy/node-set-theory/wiki)
- [Discord Support Server](https://discord.gg/FrduEZd)
- [GitHub](https://github.com/Scientific-Guy/node-set-theory/)

# Quick Example

```js
const { union, intersect } = require('node-set-theory');

let set1 = [1, 2, 3];
let set2 = [4, 5, 6];

console.log(intersect(union(set1, set2), set2)); // Returns [ 4, 5, 6 ]
```

## Quick Docs

### Installation

You can install node-set-theory through npm. You can use Typescript for it too...

```
npm install node-set-theory
```

In your index file

```js
const set = require('node-set-theory');
```

### Basic Methods

```js
const { belongs } = require('node-set-theory');

// The simple include() method
belongs([1, 2], 0); // Returns false
belongs([1, 2], 1); // Returns true.

```

### Calculation Methods

```js
const { union, intersect, subtract } = require('node-set-theory');

union([1, 2], [3, 2]); // Will return [1, 2, 3]
intersect([1, 2]. [3, 2]); // Will return [2]
subtract([1, 2], [3, 2]); // Will return [1]
subtract([3, 2], [1, 2]); // Will return [3]
```

### Verifying Methods

```js
const { isNull, isProper, isEqual, isSubset, isProperSubset, overlaps } = require('node-set-theory');

// Verify is the set empty aka null set
isNull([]); // Will return false
isNull([1]); // Will return true.

// Simple method to find is the set is proper set or not
isProper([null, 1, 2]); // Will return false because it has null
isProper([1, 2, 3]); // Will return true. 

// Verify is the set equal to the second set
isEqual([1, 0], [0, 1, 5]); // Will return false because the second set has extra element 5
isEqual([1, 0], [0, 1]); // Will return true.

// Method to find is the set are disjoint set or overlapping set
overlaps([1, 2, 3], [4, 5, 6]); // Will return false because none of the elements same between the sets
overlaps([1, 2, 3], [4, 3, 2]); // Will return true as 2 and 3 are common between those 2 sets

// Method to verify is the set is the subset of the given sent
isSubset([1, 2, 3], [1, 2]); // Will return true
isProperSubset([1, 2, 3], [null, 2, 3]); // Will return false because it verifies the proper subset...
```

### Power Set Methods

```js
const { subsets, properSubsets } = require('node-set-theory');

// Method to get all subsets also known as the power set
subsets([1, 2, 3]);
// Returns [ [], [ 1 ], [ 2 ], [ 2, 1 ], [ 3 ], [ 3, 1 ], [ 3, 2 ], [ 3, 2, 1 ] ]

// Get all the proper subsets
properSubsets([1, 2, 3]);
// Returns [ [ 1 ], [ 2 ], [ 2, 1 ], [ 3 ], [ 3, 1 ], [ 3, 2 ], [ 3, 2, 1 ] ]
```

### Types Methods

```js
const { sizeType } = require('node-set-theory');

// Will return 'empty', 'singleton' or 'many' based on the size of the set...
sizeType([]); // Will return 'empty' which means null set
sizeType([1]); // Will return 'singleton' which means it has only 1 element
sizeType([1, 2, 3]); // Will return 'many' which means it has more than 1 element
```

### Shorthand Methods

```js
const { n, P, proper } = require('node-set-theory');

// Find the length of the array
n([1, 2]); // Will return 2 as length

// Get power set of the array
P([1, 2, 3]); // Will return [ [], [ 1 ], [ 2 ], [ 2, 1 ], [ 3 ], [ 3, 1 ], [ 3, 2 ], [ 3, 2, 1 ] ]

// Convert your set to proper set
proper([null, [], 1, 0, 5]); // Will return [1, 5]
```

## Things need to be done

This package is at its extent but has some missing features to be done which you can try to contribute...

- **Only Roster sets**: Yes the point is set builder form and the descriptive form cannot be used here. You can still use Roster form of sets. Example: `[1, 2, 3]`. The second problem with it is that you cannot use `{}` because of the traditional Javascript Arrays `[]` uses this kind of brackets...

- **Advanced Calculations:** This package misses some advanced calculations with set which i don't know myself what are those? Incase if you feel that you know some, try to contribute in github!

- **Representation of null:** So most of the people use `{}` or `∅` to represent null in maths but in this package represents null as `[]` and `null`...

- **Shorthand Operations:** This package misses up lot of shorthand operations like the following. `(A U B) - B`. You have to do `subtract(union(A, B), B)` using this package. So it will be good to give us ideas or contribute in github to make shorthand operations...

- **Universal Sets:** You cannot make like universal sets in this. This is possible to create but because of lack of developers, this feature might come in upcomming periods. Or you can try to contribute this feature!