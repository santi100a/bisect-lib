 const bisectMultiple = require('../cjs/index.js').bisectMultiple;

test('the function can return an array of indices for multiple occurrences of the target', () => {
    const list = [1, 2, 2, 3, 3, 3, 4];
    const target = 3;
  
    expect(bisectMultiple(list, target))
     .toEqual([3, 4, 5]);
  }); 