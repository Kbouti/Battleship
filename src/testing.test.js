const gameBoard = require('./gameBoard.js');
const ships = require('./ships.js');

test('testTrue is true', () =>{
    expect(gameBoard.testTrue()).toBe(true);
})

test('subtract from ships file', () => {
    expect(ships.subtract(70,1)).toBe(69);
})