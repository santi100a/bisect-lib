"use strict";
exports.__esModule = true;
exports.bisect = void 0;
/**
 * Searches through `array` with a recursive binary-search algorithm (better for sorted arrays).
 * @param array The array to look through. It's highly recommended to sort it before passing it to this function, in order to make it faster.
 * @param target The item to look for.
 * @returns The index of the first ocurrence of `target`, or -1 if it's not present.
 */
function bisect(array, target) {
    function __(start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = array.length; }
        if (start > end)
            return -1;
        var middle = Math.floor((start + end) / 2);
        if (array[middle] === target)
            return middle;
        if (array[middle] > target)
            return __(start, middle - 1);
        return __(middle + 1, end);
    }
    return __();
}
exports.bisect = bisect;
exports["default"] = bisect;
