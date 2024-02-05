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

  activatePlayer1(game) {
    console.log(`activatePlayer1 function triggered`);
    // We'll need to indicate that the player can select a square in scoreBoard by clicking on it
    const scoreBoard = document.getElementById(`${game.player1Name}ScoreBoard`);
    scoreBoard.classList.add("activeBoard");
    const scoreBoardBackground = scoreBoard.childNodes[0];
    const squares = scoreBoardBackground.childNodes;

const player2Gameboard = game.player2Gameboard;

    for (let i = 0; i < squares.length; i++) {
      squares[i].classList.add("activeSquare");
      squares[i].addEventListener("click", function(){
        const targetSquare = this.classList[3];
        console.log(`striking player2 ${targetSquare}`);
let targetSquareArray = targetSquare.split("");
console.log(`targetSquareArray: ${targetSquareArray}`);
        // This is getting the format it wants for target square. Lets change format here to match strike function
        let result = player2Gameboard.strike(player2Gameboard, targetSquareArray[0], targetSquareArray[1]);

        if (result == "hit"){
          console.log(`caught a hit`);
          game.player1Scoreboard.paintHit(targetSquare);
        } else if (result == "miss"){
          console.log(`caught a miss`);
          game.player1Scoreboard.paintMiss(targetSquare);
        } else if (result == "sunk"){
          console.log(`Sunk a ship!`);
          game.player1Scoreboard.paintHit(targetSquare);

// Check if the game is over, message the player to let them know they sunk a ship

        } else {
          throw new Error(`Could not determine results of player1 strike. result: ${result}`);
        }

game.activatePlayer2(game);
      })
    }
  }

  activatePlayer2(game) {
    console.log(`activatePlayer2 function triggered`);
    // We need to guess a random square and strike it on player 1's board
    const randomA = Math.floor(Math.random() * 10);
    const randomB = Math.floor(Math.random() * 10) + 1;
    const randomSquare = [];
    randomSquare.push(alphabet[randomA]);
    randomSquare.push(randomB);

    console.log(randomSquare);

    let result = game.player1Gameboard.strike(game.player1Gameboard, randomSquare[0], randomSquare[1]);
    console.log(`result of strike: ${result}`);

    if (result == "hit") {
      console.log(`caught a hit`);
      game.player1Gameboard.paintHit(randomSquare);
    }

    else if (result == "miss") {
      console.log(`caught a miss`);
      game.player1Gameboard.paintMiss(randomSquare);
    }

    else if (result == "sunk") {
      console.log(`Sunk a ship`);
      game.player1Gameboard.paintHit(randomSquare);
      // Report sunken ship and check for win

    } else {
      throw new Error(`Could not determine strike result. result: ${result}`);
    }

    game.activatePlayer1(game);
    return;
  }

  beginMatch(game) {
    domElements.playerLabel(game.player1Name);
    game.player1Gameboard.placeShipsRandomly();
    game.player1Scoreboard.render();
    game.player1Gameboard.render();

    const body = document.body;
    const acceptBoardButton = domElements.createElement(
      "button",
      body,
      "acceptBoardButton",
      ["button"]
    );
    acceptBoardButton.innerHTML = "Begin";

    const player1GameBoard = document.getElementById(
      `${game.player1Name}GameBoard`
    );
    const player1ScoreBoard = document.getElementById(
      `${game.player1Name}ScoreBoard`
    );

    if (game.mode === "pVc") {
      // Player vs computer...
      acceptBoardButton.addEventListener("click", () => {
        player1GameBoard.classList.remove("setMode");
        player1ScoreBoard.classList.remove("hidden");
        player1GameBoard.classList.add("playMode");
        player1ScoreBoard.classList.add("playMode");
        acceptBoardButton.remove();
        game.messageFirstTurn();
      });

      game.coinFlip();

      // I don't like the timing of the messageFirstTurn in compared with activating player 1 and 2.
      //  We'll need a set timeout so the player can see that the computer is going first, have the computer strike, and THEN let it be their turn>
      // As is the active class is set as soon as the player is told it's the computer's turn

      if (game.turn === "player1") {
        game.activatePlayer1(game);
      } else if (game.turn === "player2") {
        game.activatePlayer2(game);
      } else {
        throw new Error(`Could not determine current player`);
      }
    } else if (game.mode === "pVp") {
      // Player vs Player....   We'll come back to this later
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

    setTimeout(messageDisolve, 2000);
    // ******************************************************************************
    // We need to create a dom element to display this message. I'm kinda thinking that function can/should be written in domManipulation then we just call it here
    // ******************************************************************************
  }
}

module.exports = {
  Game,
};
