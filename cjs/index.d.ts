/**
 * Searches through `array` with a recursive binary-search algorithm (better for sorted arrays).
 * @param array The array to look through. It's highly recommended to sort it before passing it to this function, in order to make it faster.
 * @param target The item to look for.
 * @returns The index of the first ocurrence of `target`, or -1 if it's not present.
 */
declare function bisect<T = unknown>(array: T[], target: T): number;
export default bisect;
export { bisect };
