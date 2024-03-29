const { createHtmlTagObject } = require("html-webpack-plugin");
const gameBoard = require("./boards.js");
const ships = require("./ships.js");

test("subtract from ships file", () => {
  expect(ships.subtract(70, 1)).toBe(69);
});

test(`expect spaces[0].getCoordinates to return [A,1]`, () => {
  const testGameBoard = gameBoard.createGameboard("testBoard");
  expect(testGameBoard.spaces[0].coordinates()).toStrictEqual(["A", 1]);
});

test(`findPreviousLetter returns B if given C`, () => {
  expect(gameBoard.getPreviousLetter("C")).toBe("B");
});

test('get square above ["C", 4]', () => {
  const testGameBoard = gameBoard.createGameboard("testBoard");
  const C4 = testGameBoard.getSpaceAt("C", 4);
  const A4 = testGameBoard.getSpaceAt("A", 4);
  expect(C4.up).toEqual(A4.down);
});

test(`Can carrier move to A1, horizontal`, () => {
  const testGameBoard = gameBoard.createGameboard("testBoard");
  const carrier = testGameBoard.ships[0];
  const spaceA1 = testGameBoard.getSpaceAt("A", 1);
  expect(carrier.canShipMoveHere(spaceA1, "horizontal")).toBe(true);
});

test(`Can carrier move to A1, verticle`, () => {
  const testGameBoard = gameBoard.createGameboard("testBoard");
  const carrier = testGameBoard.ships[0];
  const spaceA1 = testGameBoard.getSpaceAt("A", 1);
  expect(carrier.canShipMoveHere(spaceA1, "verticle")).toBe(true);
});

test(`Can carrier move to I9, horizontal`, () => {
  const testGameBoard = gameBoard.createGameboard("testBoard");
  const carrier = testGameBoard.ships[0];
  const spaceA1 = testGameBoard.getSpaceAt("I", 9);
  expect(carrier.canShipMoveHere(spaceA1, "horizontal")).toBe(false);
});

test(`Can carrier move to I9, verticle`, () => {
  const testGameBoard = gameBoard.createGameboard("testBoard");
  const carrier = testGameBoard.ships[0];
  const spaceA1 = testGameBoard.getSpaceAt("I", 9);
  expect(carrier.canShipMoveHere(spaceA1, "verticle")).toBe(false);
});

test(`Can destroyer move to I9, verticle`, () => {
  const testGameBoard = gameBoard.createGameboard("testBoard");
  const carrier = testGameBoard.ships[4];
  const spaceA1 = testGameBoard.getSpaceAt("I", 9);
  expect(carrier.canShipMoveHere(spaceA1, "verticle")).toBe(true);
});

test("places a ship on the board", () => {
  const testGameBoard = gameBoard.createGameboard("testBoard");
  const carrier = testGameBoard.ships[0];
  const spaceA1 = testGameBoard.getSpaceAt("A", 1);
  const spaceA4 = testGameBoard.getSpaceAt("A", 4);
  carrier.placeShipHere(spaceA1, "horizontal");
  expect(spaceA4.status).toBe("occupied");
});

test("places a ship on the board", () => {
  const testGameBoard = gameBoard.createGameboard("testBoard");
  const carrier = testGameBoard.ships[0];
  const spaceA1 = testGameBoard.getSpaceAt("A", 1);
  const spaceA6 = testGameBoard.getSpaceAt("A", 6);
  carrier.placeShipHere(spaceA1, "horizontal");
  expect(spaceA6.status).toBe("empty");
});

test(`Test if canShipMoveHere notices a conflict when a space is occupied`, () => {
  const testGameBoard = gameBoard.createGameboard("testBoard");
  const carrier = testGameBoard.ships[0];
  const destroyer = testGameBoard.ships[4];
  const spaceA1 = testGameBoard.getSpaceAt("A", 1);
  const spaceA2 = testGameBoard.getSpaceAt("A", 2);
  carrier.placeShipHere(spaceA2, "horizontal");
  let canGoA1Vert = destroyer.canShipMoveHere(spaceA1, "verticle");
  expect(canGoA1Vert).toBe(true);
});
