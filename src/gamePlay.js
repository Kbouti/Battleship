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

function getCoordinatesList() {
  let array = [];

  for (let i = 0; i < alphabet.length; i++) {
    for (let j = 1; j < 11; j++) {
      let nextEntry = [alphabet[i], j];
      array.push(nextEntry);
    }
  }
  return array;
}

// ************************************************************************************
// Classes:

class Game {
  constructor(player1Name, mode, player2Name) {
    this.mode = mode;
    this.turn = null;
    this.gameIsOver = false;
    this.winner = null;

    this.player1Name = player1Name;
    this.player1Gameboard = boardsJS.createGameboard(player1Name);
    this.player1Scoreboard = boardsJS.createScoreboard(player1Name);

    this.player2Name = player2Name;
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
    console.log(`********************************************`);
    console.log(`activatePlayer1 function triggered`);

    console.log(`game.turn: ${game.turn}`);
    game.turn = "player1";
    console.log(`game.turn: ${game.turn}`);

    // We'll need to indicate that the player can select a square in scoreBoard by clicking on it

    // OKKKKK
    // I think we need to add a UNIQUE event listener to each square. Each square will call strike on it's unique coordinates.

    const scoreBoard = document.getElementById(`${game.player1Name}ScoreBoard`);
    scoreBoard.classList.add("activeBoard");
    const scoreBoardBackground = scoreBoard.childNodes[0];
    const player2Gameboard = game.player2Gameboard;

    const gameSquares = scoreBoard.querySelectorAll(`.boardSpace`);

    console.log(`gameSquares.length: ${gameSquares.length}`);
    const coordinatesList = getCoordinatesList();

    for (let i = 0; i < gameSquares.length; i++) {
      console.log(gameSquares[i]);
      console.log(coordinatesList[i]);

      let targetLetter = coordinatesList[i][0];
      let targetNumber = coordinatesList[i][1];

      gameSquares[i].addEventListener("click", function () {
if (game.turn == "player2"){
  console.log(`player1 tried to go when it wasn't their turn`);
  return;
}

        let targetSpace = player2Gameboard.getSpaceAt(
          player2Gameboard,
          targetLetter,
          targetNumber
        );

        console.log(`targetSpace status: ${targetSpace.status}`);
      });
    }
  }

  //   squares[i].classList.add("activeSquare");
  //   squares[i].addEventListener("click", function () {
  //     console.log(this);

  //     let targetSquare = this.classList[3];
  //     console.log(`click activated, striking player2 ${targetSquare}`);
  //     targetSquareArray = targetSquare.split("");

  //     let targetSpace = player2Gameboard.getSpaceAt(
  //       player2Gameboard,
  //       targetSquareArray[0],
  //       targetSquareArray[1]
  //     );

  //     console.log(`targetSpace: ${targetSpace}`);
  //     console.log(`checking if space has been struck`);
  //     let status = targetSpace.status;
  //     console.log(`status: ${status}`);

  //     if (targetSpace.Status == "hit" || targetSpace.Status == "miss") {
  //       console.log(`player1 attempted a duplicate strike`);

  //       console.log(`targetSpace: ${targetSpace}`);
  //       console.log(`targetSpace.status: ${targetSpace.status}`);
  //       targetSquareArray = [];

  //       console.log(`targetSquareArray: ${targetSquareArray}`);

  //       return;
  //     }
  //     console.log(`targetSpace has not been struck`);
  //     console.log(`targetSpace.status: ${targetSpace.status}`);

  //     // Somehow targetSpace is already miss when call the second player 1 click
  //     // Some issue with the reference? It's logging "miss" then i ask if it's "miss" and it says it's not. Then when it gets called in Strike it's already "miss" before we change it from empty

  //     console.log(`targetSquareArray: ${targetSquareArray}`);
  //     // This is getting the format it wants for target square. Lets change format here to match strike function
  //     let result = player2Gameboard.strike(
  //       player2Gameboard,
  //       targetSquareArray[0],
  //       targetSquareArray[1]
  //     );
  //     console.log(`result: ${result}`);
  //     if (result == "hit") {
  //       console.log(`caught a hit`);
  //       game.player1Scoreboard.paintHit(targetSquare);
  //     } else if (result == "miss") {
  //       console.log(`caught a miss`);
  //       game.player1Scoreboard.paintMiss(targetSquare);
  //     } else if (result == "sunk") {
  //       console.log(`Sunk a ship!`);
  //       game.player1Scoreboard.paintHit(targetSquare);

  //       // Check if the game is over, message the player to let them know they sunk a ship
  //     } else {
  //       throw new Error(
  //         `Could not determine results of player1 strike. result: ${result}`
  //       );
  //     }
  //     game.activatePlayer2(game);
  //     return;
  //   });
  // }

  // targetSquareArray = [];

  // return;
  // }

  activatePlayer2(game) {
    console.log(`********************************************`);
    console.log(`activatePlayer2 function triggered`);

    console.log(`game.turn: ${game.turn}`);
    game.turn = "player2";
    console.log(`game.turn: ${game.turn}`);

    // Maybe we need a variable to store all of player2's moves? We can use that to make sure computer doesn't attempt to duplicate a move

    const randomA = Math.floor(Math.random() * 10);
    const randomB = Math.floor(Math.random() * 10) + 1;
    const randomSquare = [];
    randomSquare.push(alphabet[randomA]);
    randomSquare.push(randomB);

    console.log(`random targetSquare: ${randomSquare}`);

    // I might need a fix here to accomodate the 10th column
    let targetSquare = game.player1Gameboard.getSpaceAt(
      this.player1Gameboard,
      randomSquare[0],
      randomSquare[1]
    );

    let targetSquareStatus = targetSquare.status;

    console.log(`targetSquare: ${targetSquare}`);
    console.log(`targetSquareStatus: ${targetSquareStatus}`);

    while (targetSquareStatus == "hit" || targetSquareStatus == "miss") {
      console.log(`Computer tried to duplicate a move`);
      randomA = Math.floor(Math.random() * 10);
      randomB = Math.floor(Math.random() * 10) + 1;
      randomSquare = [];
      randomSquare.push(alphabet[randomA]);
      randomSquare.push(randomB);
    }

    let result = game.player1Gameboard.strike(
      game.player1Gameboard,
      randomSquare[0],
      randomSquare[1]
    );
    console.log(`result of strike: ${result}`);

    if (result == "hit") {
      console.log(`caught a hit`);
      game.player1Gameboard.paintHit(randomSquare);
    } else if (result == "miss") {
      console.log(`caught a miss`);
      game.player1Gameboard.paintMiss(randomSquare);
    } else if (result == "sunk") {
      console.log(`Sunk a ship`);
      game.player1Gameboard.paintHit(randomSquare);
      // Report sunken ship and check for win
    } else {
      throw new Error(`Could not determine strike result. result: ${result}`);
    }

    console.log(`targetSquare: ${targetSquare}`);
    console.log(`targetSquareStatus: ${targetSquareStatus}`);

    targetSquare = null;
    targetSquareStatus = null;

    console.log(`targetSquare: ${targetSquare}`);
    console.log(`targetSquareStatus: ${targetSquareStatus}`);

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

        game.player2Gameboard.placeShipsRandomly();

        game.coinFlip();

        if (game.turn === "player1") {
          game.activatePlayer1(game);
        } else if (game.turn === "player2") {
          game.activatePlayer2(game);
        } else {
          throw new Error(`Could not determine current player`);
        }

        game.messageFirstTurn();
      });
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
  }
}

module.exports = {
  Game,
};
