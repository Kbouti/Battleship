const boardsJS = require("./boards.js");
const shipsJS = require("./ships.js");
const domElements = require("./domElements.js");

// ************************************************************************************
// Helper functions:

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
function getPreviousLetter(letter) {
  for (let i = 0; i < alphabet.length; i++) {
    if (alphabet[i] === letter) {
      return alphabet[i - 1];
    }
  }
}
function getNextLetter(letter) {
  for (let i = 0; i < alphabet.length; i++) {
    if (alphabet[i] === letter) {
      return alphabet[i + 1];
    }
  }
}

// ************************************************************************************
// Classes:

class Game {
  constructor(player1Name, mode, player2Name) {
    this.player1Name = player1Name;
    this.mode = mode;
    // Mode will be either Player.v.Computer or Player.v.Player, but regardless we know the name of our two players and so we can create our boards:
    this.player1Gameboard = boardsJS.createGameboard(player1Name);
    this.player1Scoreboard = boardsJS.createScoreboard(player1Name);

    this.player2Gameboard = boardsJS.createGameboard(player2Name);
    this.player2Scoreboard = boardsJS.createScoreboard(player2Name);
  }

  beginMatch() {
domElements.playerLabel(this.player1Name);



    this.player1Gameboard.placeShipsRandomly();
    this.player1Scoreboard.render();
    this.player1Gameboard.render();

    const body = document.body;
    const acceptBoardButton = domElements.createElement(
      "button",
      body,
      "acceptBoardButton",
      ["button"]
    );
    acceptBoardButton.innerHTML = "Begin";

    const player1GameBoard = document.getElementById(`${this.player1Name}GameBoard`);
    const player1ScoreBoard = document.getElementById(`${this.player1Name}ScoreBoard`);


if (this.mode === "pVc"){
  // Player vs computer...
    acceptBoardButton.addEventListener("click", () => {
      player1GameBoard.classList.remove("setMode");
      player1ScoreBoard.classList.remove("hidden");
      player1GameBoard.classList.add("playMode");
      player1ScoreBoard.classList.add("playMode");
      acceptBoardButton.remove();
    });







  } else if (this.mode === "pVp"){
    // Player vs Player....
  } else {
    throw new Error("Game mode is neither pVc or pVp")
  }
  }
}

module.exports = {
  Game,
};
