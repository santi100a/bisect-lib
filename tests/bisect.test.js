const bisect = require('../cjs/index.js').bisect;

describe('bisect()', () => {
  test('the bisect function is valid', () => {
    expect(typeof bisect).toBe('function');
  });

  test('the function can find the item in the list', () => {
    const list = ['a', 'b', 'c', 'x', 'y', 'z'].sort();
    expect(bisect(list, 'c')).toBe(2);
    expect(bisect(list, 'd')).toBe(-1);
  });

  test('the function can use a custom comparator to compare items', () => {
    const list = ['bbb', 'aa', 'c', 'ddddd', 'eee'].sort();
    const target = 'c';
    const comparator = (a, b) => a.length - b.length;
    expect(bisect(list, target, { comparator })).toBe(2);
  });

  test('the function can handle arrays with a custom start and end index', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f'];
    const target = 'c';
    expect(bisect(list, target, { start: 1, end: 3 })).toBe(2);
  });

  test('the function can handle arrays with a custom epsilon value', () => {
    const list = [0.1, 0.2, 0.3, 0.4, 0.5];
    const target = 0.30000000000000004; // floating point imprecision
    expect(bisect(list, target, { epsilon: 1e-15 })).toBe(2);
  });
});
