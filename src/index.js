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



// ******************************************************************************************
// Notes for revision:

// Consider adding some other kind of visual indicator to determine hit from miss. 
// A user suffering from colorblindness may struggle to understand.
// Ehhhh When I think about it again it's not really a color issue, there's enough contrast in hue

// Ship placement requires both mouse and keyboard, not great for accessibility
