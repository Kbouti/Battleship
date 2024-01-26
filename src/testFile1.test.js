const testFile1 = require('./testFile1.js');
const testFile2 = require('./testFile2');

test('Sum adds 1 + 2 to equal 3', () =>{
    expect(testFile1.sum(1,2)).toBe(3);
})

test('Subtract 1 from 70 = 69', () =>{
    expect(testFile2.subtract(70,1)).toBe(69);
})