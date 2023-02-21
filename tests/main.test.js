const bisect = require('../cjs/index.js').bisect;

test('the bisect function is valid', () => {
    expect(typeof bisect)
        .toBe('function');
});
test('the function can find the item in the list', () => {
    const list = ['a', 'b', 'c', 'x', 'y', 'z'].sort();
    expect(bisect(list, 'c'))
        .toBe(2);
    expect(bisect(list, 'd'))
        .toBe(-1);
});