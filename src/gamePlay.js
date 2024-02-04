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
    this.player2Name = player2Name;
    this.mode = mode;
    this.turn = null;
    this.gameIsOver = false;
    this.winner = null;
    // Mode will be either Player.v.Computer or Player.v.Player, but regardless we know the name of our two players and so we can create our boards:
    this.player1Gameboard = boardsJS.createGameboard(player1Name);
    this.player1Scoreboard = boardsJS.createScoreboard(player1Name);

    this.player2Gameboard = boardsJS.createGameboard(player2Name);
    this.player2Scoreboard = boardsJS.createScoreboard(player2Name);
  }

  checkForWin() {
    if (this.player1Gameboard.allShipsSunk() === true) {
      this.gameIsOver = true;
      this.winner = this.player2Name;
      return true;
    } else if (this.player2Gameboard.allShipsSunk() === true) {
      this.gameIsOver = true;
      this.winner = this.player1Name;
      return true;
    }
    return false;
  }
  //  We'll still need a function to handle what happens when winning conditions are met.

  activatePlayer1() {
    console.log(`activatePlayer1 function triggered`);
  }

  activatePlayer2() {
    console.log(`activatePlayer2 function triggered`);
    // We need to guess a random square and strike it on player 1's board
    const randomA = Math.floor(Math.random() * 10);
    const randomB = Math.floor(Math.random() * 10) + 1;

    const randomSquare = [];
    randomSquare.push(alphabet[randomA]);
    randomSquare.push(randomB);

    console.log(randomSquare);

    let result = this.player1Gameboard.strike(randomSquare[0], randomSquare[1]);


// At this point we've struck player1's board with a random space. 
// Result is either hit or miss. 
// We need a function that takes result and manipulates the dom accordingly



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
        this.messageFirstTurn();
      });

      // I think we need to strike next, and end the strike method with a check if game is comlpete. Then either swith turns or end the game

      if (this.turn === "player1") {
        this.activatePlayer1();
      } else if (this.turn === "player2") {
        this.activatePlayer2();
      } else {
        throw new Error(`Could not determine current player`);
      }

      // while (this.checkForWin() === false) {
      // This loop will run forever until we produce strike function that changes turns
      // }

      // ************************************************************************
      // While the game is not over {
      // if it's player1's turn, allow player 1 to strike.
      // If it's player2's turn, allow player 2 to strike
      // Make sure to toggle turn at the end of each strike function

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

    const messageBox = document.getElementById("messageBox");
    messageBox.classList.remove("hidden");
    messageBox.classList.add("flex");

    messageBox.innerHTML = message;

    function messageDisolve() {
      messageBox.classList.add("hidden");
      messageBox.classList.remove("flex");
    }

    setTimeout(messageDisolve, 3500);
    // ******************************************************************************
    // We need to create a dom element to display this message. I'm kinda thinking that function can/should be written in domManipulation then we just call it here
    // ******************************************************************************
  }
}

module.exports = {
  Game,
};
