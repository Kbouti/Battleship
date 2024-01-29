// ************************************************************************************
// npm run watch  (to begin watching project)
// ^+C            (to quit)
// ************************************************************************************

import _, { create } from "lodash";
import "./style.css";
import { Gameboard, Scoreboard, createScoreboard, Space, createGameboard } from "./boards";
import { Ship, subtract } from "./ships";

const player1Board = createGameboard(`player1`);
// First we create a board

// Next, we place a ship on the board
const carrier = player1Board.ships[0];
console.log(carrier);

const spaceG5 = player1Board.getSpaceAt("G", 6);
console.log(carrier.canShipMoveHere(spaceG5, "horizontal"));
// should ships be an object or an array?
// maybe we want it to be an object....
// We could just loop over the array. .

player1Board.placeShipsRandomly();
player1Board.strike("A", 1);
player1Board.strike("A", 2);
player1Board.strike("A", 3);
player1Board.strike("A", 4);
player1Board.strike("A", 5);
player1Board.strike("A", 6);
player1Board.strike("A", 7);
player1Board.strike("A", 8);
player1Board.strike("A", 9);
player1Board.strike("A", 10);

player1Board.strike("B", 1);
player1Board.strike("B", 2);
player1Board.strike("B", 3);
player1Board.strike("B", 4);
player1Board.strike("B", 5);
player1Board.strike("B", 6);
player1Board.strike("B", 7);
player1Board.strike("B", 8);
player1Board.strike("B", 9);
player1Board.strike("B", 10);

player1Board.strike("C", 1);
player1Board.strike("C", 2);
player1Board.strike("C", 3);
player1Board.strike("C", 4);
player1Board.strike("C", 5);
player1Board.strike("C", 6);
player1Board.strike("C", 7);
player1Board.strike("C", 8);
player1Board.strike("C", 9);
player1Board.strike("C", 10);

// When game begins:
// Select how many players
// Name players
// Create gameboard and watcherBoard
// Each player places their ships on the board
// Assign a player to take the first turn
//

// On each turn:
// Ask the player for their target
// Strike the other board
// Check if the game is over
// Check if a ship is sunk
// Report results of turn
// Change player turn
