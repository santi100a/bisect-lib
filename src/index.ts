/**
 * Searches through `array` with a recursive binary-search algorithm (better for sorted arrays). 
 * @param array The array to look through. It's highly recommended to sort it before passing it to this function, in order to make it faster.
 * @param target The item to look for.
 * @returns The index of the first ocurrence of `target`, or -1 if it's not present.
 */
function bisect<T = unknown>(array: T[], target: T): number {
    function __<U>(start: number = 0, end: number = array.length): number {
        if (start > end) return -1;
        const middle = Math.floor((start + end) / 2);

        if (array[middle] === target) return middle;
        if (array[middle] > target) return __<U>(start, middle - 1);
        return __<U>(middle + 1, end);
    }
    return __();
}
export default bisect;
export { bisect }; 