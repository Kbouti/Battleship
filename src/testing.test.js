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
  const C4 = gameBoard.Player1Board.getSpaceAt(["C", 4]);
  const B4 = gameBoard.Player1Board.getSpaceAt(["B", 4]);
  expect(C4.up).toBe(B4);
});
