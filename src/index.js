// ************************************************************************************
// npm run watch  (to begin watching project)
// ^+C            (to quit)
// ************************************************************************************


import _, { create } from "lodash";
import "./style.css";
import { Gameboard, Space, createGameboard } from "./gameBoard";
import { Ship, subtract } from "./ships";





const player1Board = createGameboard(`player1`);
// First we create a board

// Next, we place a ship on the board
const carrier = player1Board.ships[0];
console.log(carrier);

const spaceG5 = player1Board.getSpaceAt("G",6)
console.log(carrier.canShipMoveHere(spaceG5,"horizontal"));
// should ships be an object or an array?
// maybe we want it to be an object....
// We could just loop over the array. .


player1Board.placeShipsRandomly();



// When game begins: 
// Select how many players
// Name players
// Create gameboard and watcherBoard
// Each player places their ships on the board
// Assign a player to take the first turn
//


// Ok, we've created a board and we've created pieces that we can put on the board. 
// We will need a function that randomly places all the pieces on the board - for when you're playing agains the computer or if you don't want to move your pieces
// We'll need to create a "watcherBoard" or something - so the player can keep track of their hits and misses
// We need to "strike" the board, which will either return hit or miss
// Then we need separate functions to record the hit or miss and move the game forward

