# Santi's Bisect Library

[![Build Status](https://github.com/santi100a/bisect-lib/actions/workflows/test.yml/badge.svg)](https://github.com/santi100a/bisect-lib/actions)
[![GitHub stars](https://img.shields.io/github/stars/santi100a/bisect-lib.svg)](https://github.com/santi100a/bisect-lib)
[![License](https://img.shields.io/github/license/santi100a/bisect-lib.svg)](https://github.com/santi100a/bisect-lib)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@santi100/bisect-lib)](https://bundlephobia.com/package/@santi100/bisect-lib@latest)


- 🚀 Lightweight and fast[^](#disclaimers)
- 👴 ES3-compliant[*](#disclaimers)
- 💻 Portable between the browser and Node.js


## What's this?
This is a lightweight, fast library for doing [*binary search*](#what-is-binary-search).

### What is "binary search"?
Binary search is a search algorithm that finds the position of a target value within a sorted array or list. It works by repeatedly dividing the search interval in half. At each step, the algorithm compares the target value with the middle element of the array or list. If the target value matches the middle element, its position is returned. If the target value is less than the middle element, the search is narrowed to the lower half of the array. If the target value is greater than the middle element, the search is narrowed to the upper half of the array. This process is repeated until the target value is found or the search interval is empty. Binary search has a time complexity of $O(\log{n})$, making it much faster than linear search for large arrays or lists.
### What is "deep equality"? 
"Deep equality" refers to the concept of comparing two values for equality not just on a shallow level, but on a deep level as well. When checking for deep equality, not only are the top-level values of the two objects being compared checked, but also their nested values. This can be particularly useful when comparing complex data structures like objects or arrays. For example, if two objects have the same keys but their values are objects themselves, checking for shallow equality would only compare the reference to those objects, not their internal properties. Checking for deep equality would compare those properties as well. JavaScript compares objects with [*referential equality*](#what-is-referential-equality) by default.
### What is "referential equality"?
"Referential equality" is a type of equality that compares if two variables refer to the exact same object in memory. In other words, it checks if the two variables point to the same memory address. This is often used when checking if two variables are the same instance of an object. If two variables have referential equality, any change made to one of them will also affect the other. In JavaScript, referential equality can be checked using the `===` operator.
## Contribute

Wanna contribute? [File an issue](https://github.com/santi100a/bisect-lib/issues) or [pull request](https://github.com/santi100a/bisect-lib/pulls)!
Make sure you follow the [contribution Code of Conduct](https://github.com/santi100a/bisect-lib/blob/main/CODE_OF_CONDUCT.md).
## Installation
- Via NPM: `npm install @santi100/bisect-lib`
- Via Yarn: `yarn add @santi100/bisect-lib`
- Via PNPM: `pnpm install @santi100/bisect-lib`

## API
All functions support [*deep equality*](#what-is-deep-equality).
- `function bisect<T = unknown>(array: T[], target: T): number;` Searches for `target` through `array` with a recursive binary-search algorithm (designed for sorted arrays). Returns the index of the first ocurrence of `target`, or -1 if it's not present.

**Tests show it doesn't work correctly for unsorted arrays, so you shouldn't pass them to this function:**
```javascript
bisectLib.bisect([5, 7, 3], 3) // Outputs -1 (not present)
```
Keep in mind this is **NOT** a bug in my code, it's just how binary search algorithms work.
- `function bisectMultiple<T extends C, C = T>(array: T[], target: T, opts?: BisectOptions<C>): number;`
Searches for `target` through `array` with an iterative binary-search algorithm
(designed for sorted arrays) and returns an array of indices. See `bisect` for details.

### Disclaimers
**Hasn't been tested in an actual ES3 environment. Feel free to open an issue or pull request if you find any non-ES3 thing.*

*^The source code is about 3 kilobytes.*
