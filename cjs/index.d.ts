type Comparator<T = unknown> = (a: T, b: T) => number;
type Order = 'ascending' | 'descending';
/**
 * @since 0.0.3
 */
interface BisectOptions<C = unknown> {
    /**
     * Inclusive optional starting index. Defaults to 0.
     */
    start?: number;
    /**
     * Inclusive optional ending index. Defaults to the length of the array.
     */
    end?: number;
    /**
     * Optional epsilon for floating-point comparisons. Defaults to `Number.EPSILON`.
     */
    epsilon?: number;
    /**
     * Optional order. Defaults to 'ascending'.
     */
    order?: Order;
    /**
     * Optional custom comparator. Is compatible with {@link Array.prototype.sort}.
     */
    comparator?: Comparator<C>;
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
declare function bisect<T extends C, C = T>(array: T[], target: T, opts?: BisectOptions<C>): number;
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
declare function bisectMultiple<T extends C, C = unknown>(array: T[], target: T, opts?: BisectOptions<C>): number[];
export default bisect;
export { bisect, bisectMultiple };
