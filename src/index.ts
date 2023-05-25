import { deepEquality } from '@santi100/equal-lib';

const { EPSILON = 1.0000000000000002 - 1 } = Number;

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DEFAULT_ASCENDING_COMPARATOR(a: any, b: any) {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DEFAULT_DESCENDING_COMPARATOR(a: any, b: any) {
	if (a < b) return 1;
	if (a > b) return -1;
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
function bisect<T extends C, C = T>(
	array: T[],
	target: T,
	opts: BisectOptions<C> = {}
): number {
	if (!Array.isArray(array)) {
		throw new TypeError(
			`"array" must be an Array. Received "${String(array)}".`
		);
	}

	const {
		order = 'ascending', // Satisfies idea #3, see `ideas.md`
		comparator = order === 'ascending'
			? DEFAULT_ASCENDING_COMPARATOR
			: DEFAULT_DESCENDING_COMPARATOR, // Satisfies idea #1, see `ideas.md`
		epsilon = EPSILON, // Satisfies idea #5, see `ideas.md`
		start = 0, // Satisfies idea #4, see `ideas.md`
		end = array.length, // Satisfies idea #4, see `ideas.md`
	} = opts;
	let left = start;
	let right = end - 1;

	while (left <= right) {
		const middle = Math.floor((left + right) / 2);
		if (
			typeof array[middle] === 'number' &&
			Math.abs((array[middle] as number) - (target as number)) <= epsilon
		) {
			return middle;
		} else if (deepEquality(array[middle], target)) {
			return middle;
		} else if (comparator) {
			const cmp = comparator(target, array[middle]);
			if (typeof cmp !== 'number')
				throw new TypeError(
					`Comparator function is invalid. Got value "${cmp}" of type "${typeof cmp}".`
				);
			if (
				(order === 'ascending' && cmp < 0) ||
				(order === 'descending' && cmp > 0)
			) {
				right = middle - 1;
			} else {
				left = middle + 1;
			}
		} else if (array[middle] > target) {
			right = middle - 1;
		} else {
			left = middle + 1;
		}
	}

	return -1;
}

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
function bisectMultiple<T extends C, C = unknown>(
	array: T[],
	target: T,
	opts: BisectOptions<C> = {}
): number[] {
	const firstIndex = bisect(array, target, opts);
	const indices: number[] = firstIndex === -1 ? [] : [firstIndex];
	let i = firstIndex + 1;
	while (deepEquality(array[i], target) && i < array.length) {
		indices.push(i);
		i++;
	}
	
	return indices;
}

export default bisect;
export { bisect, bisectMultiple };
