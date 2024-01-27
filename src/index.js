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
carrier.canShipMoveHere(spaceG5,"horizontal");
// should ships be an object or an array?
// maybe we want it to be an object....
// We could just loop over the array. .






// The first thing the game needs to do is esatblish 2 boards (one for each player)
// We'll focus on logic to do it once, then repeat. 

