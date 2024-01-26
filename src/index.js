// ************************************************************************************
// npm run watch  (to begin watching project)
// ^+C            (to quit)
// ************************************************************************************


import _ from "lodash";
import "./style.css";
import { Gameboard, Space } from "./gameBoard";
import { Ship, subtract } from "./ships";




// The first thing the game needs to do is esatblish 2 boards (one for each player)
// We'll focus on logic to do it once, then repeat. 

