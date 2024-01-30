// idk if we need to import any functions yet

const { create } = require("lodash");

// Need to create the homePage, a form that asks for the users name and how many players

function createElement(type, parentElement, id, classes) {
  const newElement = document.createElement(type);
  if (classes !== null) {
    for (let i = 0; i < classes.length; i++) {
      newElement.classList.add(classes[i]);
    }
  }
  if (id !== null) {
    newElement.setAttribute("id", id);
  }
  parentElement.appendChild(newElement);
  console.log(`done with createElement`);
  return newElement;
}

function buildPage() {
  const body = document.body;
  const header = createElement(`div`, body, "header", []);
  const title = createElement("H1", header, "title", ["title"]);
  title.innerHTML = "Battleship";
  // ******************************************************************************************
  // Form:
  const newGameForm = createElement("form", body, "newGameForm", []);
  const formHeader = createElement("div", newGameForm, "newGameFormHeader", []);
  const formTitle = createElement("H2", formHeader, "newGameTitle", ["form"]);
  formTitle.innerHTML = `New Game`;
  const formContent = createElement("div", newGameForm, "formContent", []);
  const formContentHalf1 = createElement(
    `div`,
    formContent,
    "formContentHalf1",
    ["formContentHalf"]
  );

  const player1Label = createElement(
    "label",
    formContentHalf1,
    "player1Label",
    ["formLabel"]
  );
  player1Label.innerHTML = `Player 1 Name:`;
  player1Label.setAttribute("for", "player1Input");

  const player1Input = createElement(
    "input",
    formContentHalf1,
    "player1Input",
    ["formInput"]
  );
  player1Input.setAttribute("type", "text");
  player1Input.setAttribute("placeholder", "What's your name?");

  const formContentHalf2 = createElement(
    `div`,
    formContent,
    "formContentHalf2",
    ["formContentHalf"]
  );

  const player2Label = createElement(
    "label",
    formContentHalf2,
    "player2Label",
    ["formLabel"]
  );
  player2Label.innerHTML = `Player 2 Name:`;
  player2Label.setAttribute("for", "player2Input");

  const player2Input = createElement(
    "input",
    formContentHalf2,
    "player2Input",
    ["formInput"]
  );
  player2Input.setAttribute("type", "text");
  player2Input.setAttribute("placeholder", "Admiral A.I.");

  const formFooter = createElement(`div`, newGameForm, "formFooter", []);
  const modeSelectContainer = createElement(
    "div",
    formFooter,
    "modeSelectContainer",
    []
  );
  const modeSelectLabel = createElement(
    "H3",
    modeSelectContainer,
    "modeSelectLabel",
    []
  );
  modeSelectLabel.innerHTML = `Select game mode:`;

  const pVcLabel = createElement("label", modeSelectContainer, "pVcLabel", [
    "radioLabel",
  ]);
  pVcLabel.setAttribute("for", "pVcRadio");
  pVcLabel.innerHTML = "Player V. Computer";

  const pVcRadio = createElement("input", modeSelectContainer, "pVcRadio", [
    "modeSelectRadio",
  ]);
  pVcRadio.setAttribute("type", "radio");
  pVcRadio.setAttribute("name", "pVcRadio");

  const pVpLabel = createElement("label", modeSelectContainer, "pVpLabel", [
    "radioLabel",
  ]);
  pVpLabel.setAttribute("for", "pVcRadio");
  pVpLabel.innerHTML = "Player V. Player";

  const pVpRadio = createElement("input", modeSelectContainer, "pVpRadio", [
    "modeSelectRadio",
  ]);
  pVpRadio.setAttribute("type", "radio");
  pVpRadio.setAttribute("name", "pVpRadio");


  const beginButton = createElement("button", formFooter, "beginButton", []);
  beginButton.innerHTML = 'Start Game'

  // End Form
  // ******************************************************************************************
}

// *************************************************************************************
module.exports = {
  createElement,
  buildPage,
};
