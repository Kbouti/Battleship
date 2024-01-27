const gameBoard = require("./gameBoard.js");
const ships = require("./ships.js");

test("testTrue is true", () => {
  expect(gameBoard.testTrue()).toBe(true);
});

test("subtract from ships file", () => {
  expect(ships.subtract(70, 1)).toBe(69);
});

test(`player1Board.spaces[0].getCoordinates to return [A,1]`, () => {
  expect(gameBoard.Player1Board.spaces[0].coordinates()).toStrictEqual([
    "A",
    1,
  ]);
});

test(`findPreviousLetter returns B if given C`, () => {
  expect(gameBoard.getPreviousLetter("C")).toBe("B");
});

test('get square above ["C", 4]', () => {
  const testGameBoard = new gameBoard.Gameboard("Testies");
  testGameBoard.linkSpaces();
  const C4 = testGameBoard.getSpaceAt("C", 4);
  const A4 = testGameBoard.getSpaceAt("A", 4);
  expect(C4.up).toEqual(A4.down);
});
