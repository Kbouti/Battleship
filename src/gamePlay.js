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
      this.winner = `player2`;
      return true;
    } else if (this.player2Gameboard.allShipsSunk() === true) {
      this.gameIsOver = true;
      this.winner = `player1`;
      return true;
    }
    return false;
  }
  //  We'll still need a function to handle what happens when winning conditions are met.
  // Currently player can continue clicking squares after the game is won

  startPlayer1Turn(game) {
    console.log(`********************************************`);
    console.log(`player1 turn started`);

    if (game.checkForWin()) {
      console.log(`game is over.`);
      domElements.setSubTitle(`Game is Over`);
      return;
    }

    domElements.setSubTitle(`${game.player1Name}, your turn`);
    game.turn = "player1";
    const scoreBoard = document.getElementById(`${game.player1Name}ScoreBoard`);
    scoreBoard.classList.add("activeBoard");
    const gameSquares = scoreBoard.querySelectorAll(`.boardSpace`);
    for (let i = 0; i < gameSquares.length; i++) {
      gameSquares[i].classList.add("activeSquare");
    }
  }

  player1MovePieces(game) {
    console.log(`player1MovePieces function called`);
    const body = document.body;
    const player1GameBoardDiv = document.getElementById(
      `${game.player1Name}GameBoard`
    );
    const shipDivs = player1GameBoardDiv.getElementsByClassName("ship");
    const player1Gameboard = game.player1Gameboard;

    // Ok at this point we've accessed all the ships. We can give them a unique class to indicate they can be moved
    // And we give them each an eventListener telling them if clicked to "selectShip()"

    for (let i = 0; i < shipDivs.length; i++) {
      shipDivs[i].classList.add("moveableShip");
      shipDivs[i].addEventListener("click", selectShip);
    }

    function selectShip() {
      // The event that's triggered when you click a ship
      console.log(`ShipDiv clicked.`);

      let thisShipDiv = this;
      let shipName = thisShipDiv.classList[2];
      let shipClass = thisShipDiv.classList[1];
      let startingSquare = thisShipDiv.parentElement.classList[2];

      console.log(`shipName: ${shipName}`);
      console.log(`shipClass: ${shipClass}`);
      console.log(`ships starting square: ${startingSquare}`);

      if (thisShipDiv.classList.contains("selectedShip")) {
        // This removes the selected class on second click. But we still gotta take away the key listeners
        console.log(`Caught a ship that was clicked and already selected`);
        thisShipDiv.classList.remove("selectedShip");
        thisShipDiv.classList.add("moveableShip");
        thisShipDiv = null;
        document.onkeydown = null;
        return;
      }
      for (let i = 0; i < shipDivs.length; i++) {
        console.log(`Loop ${i}`);

        if (shipDivs[i].classList.contains("selectedShip")) {
          // If a ship is already active...
          thisShipDiv = this;
          shipName = thisShipDiv.classList[2];
          shipClass = thisShipDiv.classList[1];
          startingSquare = thisShipDiv.parentElement.classList[2];
          shipDivs[i].classList.remove("selectedShip");
          shipDivs[i].classList.add("moveableShip");
        }
      }
      thisShipDiv.classList.remove("moveableShip");
      thisShipDiv.classList.add("selectedShip");
      console.log(`ship selected`);

      function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == "38") {
          console.log("hit the up arrow");
          // So This should attempt to move the ship up one space. If the ship can move up one space, do it and update the dom.
          let startingArray = startingSquare.split("");
          let startingLetter = startingArray.shift();
          let startingNumber = startingArray.join("");
          if (startingLetter == "A") {
            console.log(`Can't move any further up`);
            return;
          }
          let targetLetter = getPreviousLetter(startingLetter);
          let newCoordinates = [targetLetter, startingNumber];
          let ships = player1Gameboard.ships;
          let targetShip;
          for (let i = 0; i < ships.length; i++) {
            if (ships[i].name == shipName) {
              targetShip = ships[i];
            }
          }
          let startingSpace = targetShip.startingSpace;
          let targetNumber = newCoordinates[1];
          let targetSpace = player1Gameboard.getSpaceAt(
            player1Gameboard,
            targetLetter,
            targetNumber
          );
          let orientation = targetShip.orientation;
          targetShip.remove(player1Gameboard);
          let canWeMove = targetShip.canShipMoveHere(targetSpace, orientation);
          if (canWeMove == false) {
            console.log(`We can't make the attempted move`);
            console.log(`startingSpace: ${startingSpace}`);
            targetShip.placeShipHere(startingSpace, targetShip.orientation);
            player1Gameboard.render();
            game.player1MovePieces(game);
            return;
          }
          console.log(`We can make the intended move`);
          targetShip.placeShipHere(targetSpace, targetShip.orientation);
          player1Gameboard.render();
          game.player1MovePieces(game);
          let ourShipDiv;
          let shipDivs = player1GameBoardDiv.getElementsByClassName("ship");
          for (let i = 0; i < shipDivs.length; i++) {
            if (shipDivs[i].classList.contains(shipName)) {
              console.log(`Found our shipDiv`);
              ourShipDiv = shipDivs[i];
            } else {
              console.log(`couldn't find our shipDiv`);
            }
          }
          ourShipDiv.classList.remove("selectedShip");
          document.onkeydown = null;

          // ourShipDiv.click();
          // console.log(`ourShipDiv: ${ourShipDiv}`);
          // console.log(`ourShipDiv.classList: ${ourShipDiv.classList}`);

          return;
        } else if (e.keyCode == "40") {
          console.log("hit the down arrow");
          let startingArray = startingSquare.split("");
          let startingLetter = startingArray.shift();
          let startingNumber = startingArray.join("");
          if (startingLetter == "J") {
            console.log(`Can't move any further down`);
            return;
          }
          let targetLetter = getNextLetter(startingLetter);
          let newCoordinates = [targetLetter, startingNumber];
          let ships = player1Gameboard.ships;
          let targetShip;
          for (let i = 0; i < ships.length; i++) {
            if (ships[i].name == shipName) {
              targetShip = ships[i];
            }
          }
          let startingSpace = targetShip.startingSpace;
          let targetNumber = newCoordinates[1];
          let targetSpace = player1Gameboard.getSpaceAt(
            player1Gameboard,
            targetLetter,
            targetNumber
          );
          let orientation = targetShip.orientation;
          targetShip.remove(player1Gameboard);
          let canWeMove = targetShip.canShipMoveHere(targetSpace, orientation);
          if (canWeMove == false) {
            console.log(`We can't make the attempted move`);
            console.log(`startingSpace: ${startingSpace}`);
            targetShip.placeShipHere(startingSpace, targetShip.orientation);
            player1Gameboard.render();
            game.player1MovePieces(game);
            return;
          }
          console.log(`We can make the intended move`);
          targetShip.placeShipHere(targetSpace, targetShip.orientation);
          player1Gameboard.render();
          game.player1MovePieces(game);
          let ourShipDiv;
          let shipDivs = player1GameBoardDiv.getElementsByClassName("ship");
          for (let i = 0; i < shipDivs.length; i++) {
            if (shipDivs[i].classList.contains(shipName)) {
              console.log(`Found our shipDiv`);
              ourShipDiv = shipDivs[i];
            } else {
              console.log(`couldn't find our shipDiv`);
            }
          }
          ourShipDiv.classList.remove("selectedShip");
          document.onkeydown = null;

          // ourShipDiv.click();
          // console.log(`ourShipDiv: ${ourShipDiv}`);
          // console.log(`ourShipDiv.classList: ${ourShipDiv.classList}`);

          return;
        } else if (e.keyCode == "37") {
          console.log("hit the left arrow");
          let startingArray = startingSquare.split("");
          let targetLetter = startingArray.shift();
          let startingNumber = startingArray.join("");
          if (startingNumber === 1) {
            console.log(`Can't move any further left`);
            return;
          }
          let newCoordinates = [targetLetter, Number(startingNumber) - 1];
          let ships = player1Gameboard.ships;
          let targetShip;
          for (let i = 0; i < ships.length; i++) {
            if (ships[i].name == shipName) {
              targetShip = ships[i];
            }
          }
          let startingSpace = targetShip.startingSpace;
          targetLetter = newCoordinates[0];
          let targetNumber = newCoordinates[1];
          let targetSpace = player1Gameboard.getSpaceAt(
            player1Gameboard,
            targetLetter,
            targetNumber
          );
          let orientation = targetShip.orientation;
          targetShip.remove(player1Gameboard);
          let canWeMove = targetShip.canShipMoveHere(targetSpace, orientation);
          if (canWeMove == false) {
            console.log(`We can't make the attempted move`);
            console.log(`startingSpace: ${startingSpace}`);
            targetShip.placeShipHere(startingSpace, targetShip.orientation);
            player1Gameboard.render();
            game.player1MovePieces(game);
            return;
          }
          console.log(`We can make the intended move`);
          targetShip.placeShipHere(targetSpace, targetShip.orientation);
          player1Gameboard.render();
          game.player1MovePieces(game);
          let ourShipDiv;
          let shipDivs = player1GameBoardDiv.getElementsByClassName("ship");
          for (let i = 0; i < shipDivs.length; i++) {
            if (shipDivs[i].classList.contains(shipName)) {
              console.log(`Found our shipDiv`);
              ourShipDiv = shipDivs[i];
            } else {
              console.log(`couldn't find our shipDiv`);
            }
          }
          ourShipDiv.classList.remove("selectedShip");
          document.onkeydown = null;

          // ourShipDiv.click();
          return;
        } else if (e.keyCode == "39") {
          console.log("hit the right arrow");
          let startingArray = startingSquare.split("");
          let targetLetter = startingArray.shift();
          let startingNumber = startingArray.join("");
          if (startingNumber === 10) {
            console.log(`Can't move any further right`);
            return;
          }
          let newCoordinates = [targetLetter, Number(startingNumber) + 1];
          let ships = player1Gameboard.ships;
          let targetShip;
          for (let i = 0; i < ships.length; i++) {
            if (ships[i].name == shipName) {
              targetShip = ships[i];
            }
          }
          let startingSpace = targetShip.startingSpace;
          targetLetter = newCoordinates[0];
          let targetNumber = newCoordinates[1];
          let targetSpace = player1Gameboard.getSpaceAt(
            player1Gameboard,
            targetLetter,
            targetNumber
          );
          let orientation = targetShip.orientation;
          targetShip.remove(player1Gameboard);
          let canWeMove = targetShip.canShipMoveHere(targetSpace, orientation);
          if (canWeMove == false) {
            console.log(`We can't make the attempted move`);
            console.log(`startingSpace: ${startingSpace}`);
            targetShip.placeShipHere(startingSpace, targetShip.orientation);
            player1Gameboard.render();
            game.player1MovePieces(game);
            return;
          }
          console.log(`We can make the intended move`);
          targetShip.placeShipHere(targetSpace, targetShip.orientation);
          player1Gameboard.render();
          game.player1MovePieces(game);
          let ourShipDiv;
          let shipDivs = player1GameBoardDiv.getElementsByClassName("ship");
          for (let i = 0; i < shipDivs.length; i++) {
            if (shipDivs[i].classList.contains(shipName)) {
              console.log(`Found our shipDiv`);
              ourShipDiv = shipDivs[i];
            } else {
              console.log(`couldn't find our shipDiv`);
            }
          }
          ourShipDiv.classList.remove("selectedShip");
          document.onkeydown = null;

          // ourShipDiv.click();
          return;
        } else if (e.keyCode == "16") {
          console.log("hit the shift key, rotating ship");
          let startingArray = startingSquare.split("");
          let startingLetter = startingArray.shift();
          let startingNumber = startingArray.join("");
          let targetShip;
          for (let i = 0; i < player1Gameboard.ships.length; i++) {
            if (player1Gameboard.ships[i].name == shipName) {
              targetShip = player1Gameboard.ships[i];
            }
          }
          let startingOrientation = targetShip.orientation;
          let intendedOrientation;
          if (startingOrientation == "Verticle") {
            intendedOrientation = "Horizontal";
          } else if (startingOrientation == "Horizontal") {
            intendedOrientation = "Verticle";
          } else {
            console.log(
              `Can't get startingOrientation: ${startingOrientation}`
            );
          }
          let targetSpace = player1Gameboard.getSpaceAt(
            player1Gameboard,
            startingLetter,
            startingNumber
          );
          targetShip.remove(player1Gameboard);
          let canWeMakeFirstMove = targetShip.canShipMoveHere(
            targetSpace,
            intendedOrientation
          );
          if (canWeMakeFirstMove == true) {
            targetShip.placeShipHere(targetSpace, intendedOrientation);
          } else {
            console.log(`Can't rotate ship, move it first`);
            targetShip.placeShipHere(targetSpace, startingOrientation);
          }
          player1Gameboard.render();
          game.player1MovePieces(game);
          return;
        }
      }
      document.onkeydown = checkKey;
    }
  }

  activatePlayer1(game) {
    console.log(`activatePlayer1 called`);
    const scoreBoard = document.getElementById(`${game.player1Name}ScoreBoard`);
    const gameSquares = scoreBoard.querySelectorAll(`.boardSpace`);
    const coordinatesList = getCoordinatesList();
    const player2Gameboard = game.player2Gameboard;
    for (let i = 0; i < gameSquares.length; i++) {
      gameSquares[i].addEventListener("click", function () {
        console.log(`player1 click event triggered`);
        if (game.turn == "player2") {
          console.log(`player1 tried to go when it wasn't their turn`);
          return;
        }
        if (game.gameIsOver == true) {
          console.log(`Clicked after game is over`);
          return;
        }
        let targetLetter = coordinatesList[i][0];
        let targetNumber = coordinatesList[i][1];
        let targetSpace = player2Gameboard.getSpaceAt(
          player2Gameboard,
          targetLetter,
          targetNumber
        );
        let targetSpaceStatus = targetSpace.status;
        if (targetSpaceStatus == "hit" || targetSpaceStatus == "miss") {
          console.log(`Player1 attempting a duplicate strike, not allowing`);
          // We could add a message here like "You've already tried to strike this square"
          return;
        }
        let result = player2Gameboard.strike(
          player2Gameboard,
          targetLetter,
          targetNumber
        );
        let targetSquare = [];
        targetSquare.push(targetLetter);
        targetSquare.push(targetNumber);
        if (result == "hit") {
          game.player1Scoreboard.paintHit(targetSquare);
        } else if (result == "miss") {
          game.player1Scoreboard.paintMiss(targetSquare);
        } else if (result == "sunk") {
          game.player1Scoreboard.paintHit(targetSquare);
          console.log(`checking for win`);
          game.checkForWin();
          console.log(`game.gameIsOver: ${game.gameIsOver}`);

          if (game.gameIsOver === true) {
            console.log(`game is over. winner is: ${game.winner}`);
            scoreBoard.classList.remove("activeBoard");
            game.gameIsOver = true;
            for (let i = 0; i < gameSquares.length; i++) {
              gameSquares[i].classList.remove("activeSquare");
            }
            if (game.winner == "player1") {
              domElements.setSubTitle(
                `Congratulations ${game.player1Name}, you win! `
              );
              return;
            }
            if (game.winner == "player2") {
              domElements.setSubTitle(
                `You lose.... ${game.player2Name} sunk all your ships!`
              );
              return;
            } else {
              console.log(`game is over but winner couldn't be determined`);
              throw new Error(`Game over but winner not determined`);
            }
          } else {
            console.log(`Game is not over, continuing`);
          }
        } else {
          throw new Error(
            `Could not determine results of player1 strike. result: ${result}`
          );
        }
        console.log(
          `player1 turn result: ${result} on square ${targetLetter}, ${targetNumber}`
        );
        scoreBoard.classList.remove("activeBoard");
        for (let i = 0; i < gameSquares.length; i++) {
          gameSquares[i].classList.remove("activeSquare");
        }
        game.turn = "player2";
        console.log(`setting timeout for activatePlayer2`);
        domElements.setSubTitle(`${game.player2Name} Turn`);
        setTimeout(() => {
          game.startPlayer2Turn(game);
        }, 1500);
        return;
      });
    }

    // ***********************************************************************************************
    //ISSUE::
    // The .active class is still present on ships after the game has started.
    // We need to remove the .active class so the ships don't glow yellow when hovered
    // ***********************************************************************************************
  }

  startPlayer2Turn(game) {
    console.log(`********************************************`);
    console.log(`starting player2 Turn`);
    if (game.checkForWin()) {
      console.log(`game is over.`);
      domElements.setSubTitle(`Game is Over`);
      return;
    }
    game.turn = "player2";
    let player2Scoreboard = game.player2Scoreboard;
    let player1Gameboard = game.player1Gameboard;
    let scoreBoardSpaces = player2Scoreboard.spaces;
    let hitsList = [];
    let advisedTarget = null;

    for (let i = 0; i < scoreBoardSpaces.length; i++) {
      // console.log(`scoreBoardSpaces[${i}].status: ${scoreBoardSpaces[i].status}`);
      if (scoreBoardSpaces[i].status == "hit") {
        hitsList.push(scoreBoardSpaces[i]);
      }
    }

    if (hitsList.length > 0) {
      //If there's a hit on the board.....
      for (let i = 0; i < hitsList.length; i++) {
        // For each hit....
        if (advisedTarget == null){
          // If we haven't established an andvised target yet..... 
          let square = hitsList[i];
          console.log(`hitsList[${i}]: [${square.verticleCoordinate}, ${square.horizontalCoordinate}]`);
          if (square.up !== null && square.up.status == "empty") {
            // If there is an empty adjacent square, target it
            console.log(`This hit element has an empty space up we could strike`)
            advisedTarget = square.up;
          } else if (square.right !== null && square.right.status == "empty") {
            console.log(`This hit element has an empty space right we could strike`)
            advisedTarget = square.right;
          } else if (square.down !== null && square.down.status == "empty") {
            console.log(`This hit element has an empty space down we could strike`)
            advisedTarget = square.down;
          } else if (square.left !== null && square.left.status == "empty") {
            console.log(`This hit element has an empty space left we could strike`)
            advisedTarget = square.left;
          }
        }
        // If we've found a strike with an unchecked adjacent square, it is advisedTarget.
      }

      console.log(`advisedTarget: ${advisedTarget}`);
    }
    let targetSquare;
    if (advisedTarget == null) {
      let randomA = Math.floor(Math.random() * 10);
      let randomB = Math.floor(Math.random() * 10) + 1;
      let randomSquare = [];
      randomSquare.push(alphabet[randomA]);
      randomSquare.push(randomB);
      console.log(`random targetSquare: ${randomSquare}`);
      targetSquare = player1Gameboard.getSpaceAt(
        player1Gameboard,
        randomSquare[0],
        randomSquare[1]
      );
    } else {
      console.log(`advisedTarget: [${advisedTarget.verticleCoordinate}, ${advisedTarget.horizontalCoordinate}]`);

      targetSquare = player1Gameboard.getSpaceAt(
        player1Gameboard,
        advisedTarget.verticleCoordinate,
        advisedTarget.horizontalCoordinate
      );
    }

    while (targetSquare.status == "hit" || targetSquare.status == "miss") {
      console.log(`Computer tried to duplicate a move`);
      let randomA = Math.floor(Math.random() * 10);
      let randomB = Math.floor(Math.random() * 10) + 1;
      let randomSquare = [];
      randomSquare.push(alphabet[randomA]);
      randomSquare.push(randomB);
      targetSquare = game.player1Gameboard.getSpaceAt(
        this.player1Gameboard,
        randomSquare[0],
        randomSquare[1]
      );
    }
    let result = game.player1Gameboard.strike(
      game.player1Gameboard,
      targetSquare.verticleCoordinate,
      targetSquare.horizontalCoordinate
    );

    let scoreBoardSpace = player2Scoreboard.getSpaceAt(
      player2Scoreboard,
      targetSquare.verticleCoordinate,
      targetSquare.horizontalCoordinate
    );

    if (result == "hit") {
      game.player1Gameboard.paintHit([
        targetSquare.verticleCoordinate,
        targetSquare.horizontalCoordinate,
      ]);
      scoreBoardSpace.status = "hit";
    } else if (result == "miss") {
      game.player1Gameboard.paintMiss([
        targetSquare.verticleCoordinate,
        targetSquare.horizontalCoordinate,
      ]);
      scoreBoardSpace.status = "miss";
    } else if (result == "sunk") {
      console.log(`Sunk a ship`);
      game.player1Gameboard.paintHit([
        targetSquare.verticleCoordinate,
        targetSquare.horizontalCoordinate,
      ]);
      scoreBoardSpace.status = "hit";
      console.log(`checking for win`);
      game.checkForWin();
      if (game.gameIsOver === true) {
        console.log(`game is over. winner is: ${game.winner}`);
        if (game.winner == "player1") {
          domElements.setSubTitle(
            `Congratulations ${game.player1Name}, you win! `
          );
          return;
        }
        if (game.winner == "player2") {
          domElements.setSubTitle(
            `You lose.... ${game.player2Name} sunk all your ships!`
          );
          return;
        } else {
          console.log(`game is over but winner couldn't be determined`);
          throw new Error(`Game over but winner not determined`);
        }
      }
    } else {
      throw new Error(`Could not determine strike result. result: ${result}`);
    }
    console.log(
      `player2 turn result: ${result} on square ${targetSquare.verticleCoordinate}, ${targetSquare.horizontalCoordinate}`
    );
    game.turn = "player1";
    game.startPlayer1Turn(game);
    return;
  }

  beginMatch(game) {
    // domElements.setSubTitle(game.player1Name);
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

    domElements.setSubTitle(`Approve your board`);

    // ****************************************************************************
    // This is where we call the function that allows player1 to move their pieces
    game.player1MovePieces(game);
    // ****************************************************************************

    if (game.mode === "pVc") {
      // Player vs computer...
      // Player has selected their board and computer oponent places ships randomly
      acceptBoardButton.addEventListener("click", () => {
        player1GameBoard.classList.remove("setMode");
        player1ScoreBoard.classList.remove("hidden");
        player1GameBoard.classList.add("playMode");
        player1ScoreBoard.classList.add("playMode");
        acceptBoardButton.remove();
        game.player2Gameboard.placeShipsRandomly();
        game.coinFlip();
        game.activatePlayer1(game);

        if (game.turn === "player1") {
          game.startPlayer1Turn(game);
        } else if (game.turn === "player2") {
          domElements.setSubTitle(`${game.player2Name} Turn`);
          setTimeout(() => {
            game.startPlayer2Turn(game);
          }, 2250);
        } else {
          throw new Error(`Could not determine current player`);
        }

        game.messageFirstTurn();
      });
    } else if (game.mode === "pVp") {
      // Player vs Player....   We'll come back to this later
      // Player1 has approved their board, next we need to let player2 approve their board
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
    setTimeout(messageDisolve, 1500);
  }
}

module.exports = {
  Game,
};
