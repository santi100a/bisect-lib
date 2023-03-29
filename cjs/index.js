"use strict";
exports.__esModule = true;
exports.bisectMultiple = exports.bisect = void 0;
var equal_lib_1 = require("@santi100/equal-lib");
var _a = Number.EPSILON, EPSILON = _a === void 0 ? 1.0000000000000002 - 1 : _a;
function DEFAULT_ASCENDING_COMPARATOR(a, b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}
function DEFAULT_DESCENDING_COMPARATOR(a, b) {
    if (a < b)
        return 1;
    if (a > b)
        return -1;
    return 0;
}
/**
 * Searches for `target` through `array` with an iterative binary-search algorithm (designed for sorted arrays).
 * **Tests show it doesn't work correctly for unsorted arrays, so you shouldn't pass them to this function:
 * ```javascript
 * bisectLib.bisect([5, 7, 3], 3) // Outputs -1 (not present)
 * ```
 * It's not a bug, it's just how binary search algorithms work.
 * @param array The array to look through.
 * @param target The item to look for.
 * @param opts Optional object of options. See {@link BisectOptions}.
 * @returns The index of the first ocurrence of `target`, or -1 if it's not present.
 */
function bisect(array, target, opts) {
    if (opts === void 0) { opts = {}; }
    if (!Array.isArray(array)) {
        throw new TypeError("\"array\" must be an Array. Received \"".concat(String(array), "\"."));
    }
    var _a = opts.order, order = _a === void 0 ? 'ascending' : _a, // Satisfies idea #3, see `ideas.md`
    _b = opts.comparator, // Satisfies idea #3, see `ideas.md`
    comparator = _b === void 0 ? order === 'ascending'
        ? DEFAULT_ASCENDING_COMPARATOR
        : DEFAULT_DESCENDING_COMPARATOR : _b, // Satisfies idea #1, see `ideas.md`
    _c = opts.epsilon, // Satisfies idea #1, see `ideas.md`
    epsilon = _c === void 0 ? EPSILON : _c, // Satisfies idea #5, see `ideas.md`
    _d = opts.start, // Satisfies idea #5, see `ideas.md`
    start = _d === void 0 ? 0 : _d, // Satisfies idea #4, see `ideas.md`
    _e = opts.end // Satisfies idea #4, see `ideas.md`
    , // Satisfies idea #4, see `ideas.md`
    end = _e === void 0 ? array.length : _e // Satisfies idea #4, see `ideas.md`
    ;
    var left = start;
    var right = end - 1;
    while (left <= right) {
        var middle = Math.floor((left + right) / 2);
        if (typeof array[middle] === 'number' &&
            Math.abs(array[middle] - target) <= epsilon) {
            return middle;
        }
        else if ((0, equal_lib_1.deepEquality)(array[middle], target)) {
            return middle;
        }
        else if (comparator) {
            var cmp = comparator(target, array[middle]);
            if (typeof cmp !== 'number')
                throw new TypeError("Comparator function is invalid. Got value \"".concat(cmp, "\" of type \"").concat(typeof cmp, "\"."));
            if ((order === 'ascending' && cmp < 0) ||
                (order === 'descending' && cmp > 0)) {
                right = middle - 1;
            }
            else {
                left = middle + 1;
            }
        }
        else if (array[middle] > target) {
            right = middle - 1;
        }
        else {
            left = middle + 1;
        }
    }
    return -1;
}
exports.bisect = bisect;
/**
 * Searches for `target` through `array` with an iterative binary-search algorithm
 (designed for sorted arrays) and returns an array of indices. See {@link bisect} for details.
 *
 * @since 0.0.3
 * @param array The array to look through.
 * @param target The item to look for.
 * @param opts Optional object of options. See {@link BisectOptions}.
 * @returns An array of indices whose values match `target`, or an empty array if it's not present.
 */
function bisectMultiple(array, target, opts) {
    if (opts === void 0) { opts = {}; }
    var firstIndex = bisect(array, target, opts);
    var indices = firstIndex === -1 ? [] : [firstIndex];
    var i = firstIndex + 1;
    while ((0, equal_lib_1.deepEquality)(array[i], target) && i < array.length) {
        indices.push(i);
        i++;
    }
    return indices;
}
exports.bisectMultiple = bisectMultiple;
exports["default"] = bisect;
