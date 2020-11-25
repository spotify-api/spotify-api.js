const { union, intersect, subsets, properSubsets } = require('./dist/index');
const set = require('./dist/index');

const x = new set.Set([1, 2, 3])
console.log(x.length)

x.set = [1, 2, 3, 4, 5]

console.log(Object.keys(x))