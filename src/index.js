// ************************************************************************************
// npm run watch  (to begin watching project)

// ^+C            (to quit)

// To push changes to gh-pages: 
// git subtree push --prefix dist origin gh-pages

// ************************************************************************************

import _, { create } from "lodash";
import "./style.css";
import { Gameboard, Scoreboard, createScoreboard, Space, createGameboard } from "./boards";
import { Ship, subtract } from "./ships";
import {Game} from "./gamePlay";
import { createElement, buildPage } from "./domElements";
import { submitForm, addEventListeners } from "./domManipulation";

console.log(`Begin`)


buildPage();
addEventListeners();





// When game begins:
// Select how many players
// Name players
// Make sure names aren't the same
// Create Game
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
