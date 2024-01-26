import _ from "lodash";
import "./style.css";
import Dice from "./images/dice.png";
import { boardLogicReportToDom, boardLogicReportToConsole } from "./testFile1";


function component() {
  const element = document.createElement("div");
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add(`hello`);
  const myIcon = new Image();
  myIcon.src = Dice;
  element.appendChild(myIcon);
  return element;
}
document.body.appendChild(component());

boardLogicReportToDom();
boardLogicReportToConsole();

// Fantastic wepack tutorial: https://www.youtube.com/watch?v=IZGNcSuwBZs

// ************************************************************************************
// npm run watch  (to begin watching project)
// ^+C            (to quit)
// ************************************************************************************
