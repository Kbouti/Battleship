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
    this.turn = null;
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

    const player1GameBoard = document.getElementById(
      `${this.player1Name}GameBoard`
    );
    const player1ScoreBoard = document.getElementById(
      `${this.player1Name}ScoreBoard`
    );

    this.coinFlip();

    if (this.mode === "pVc") {
      // Player vs computer...
      acceptBoardButton.addEventListener("click", () => {
        player1GameBoard.classList.remove("setMode");
        player1ScoreBoard.classList.remove("hidden");
        player1GameBoard.classList.add("playMode");
        player1ScoreBoard.classList.add("playMode");
        acceptBoardButton.remove();
      });

      this.messageFirstTurn();
      // ************************************************************************
      // Ok, at this point we're prepared to start the game. We've determined who starts first.
      // We need to initiate a while loop so players will take turns striking until someone has won the game.





      // ************************************************************************
      // We'll come back to this later
    } else if (this.mode === "pVp") {
      // Player vs Player....
    } else {
      throw new Error("Game mode is neither pVc or pVp");
    }
  }

  coinFlip() {
    const num = Math.floor(Math.random() * 100);
    if (num > 49) {
      this.turn = "player1";
    } else if (num < 50) {
      this.turn = "player2";
    } else {
      throw new Error("Coin flip indeterminate");
    }
  }

  messageFirstTurn() {
    let message;
    if (this.turn == "player1") {
      message = `You won the coin flip! It's your turn first. Click a square to strike`;
    } else if (this.turn == "player2") {
      message = `You lost the coin flip. Your opponenet will strike first.`;
    }
    console.log(message);
// ******************************************************************************
// We need to create a dom element to display this message. I'm kinda thinking that function can/should be written in domManipulation then we just call it here
// ******************************************************************************
  }
}

module.exports = {
  Game,
};
