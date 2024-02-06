const { createElement } = require("./domElements.js");
const Ship = require("./ships.js");

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

class Gameboard {
  constructor(playerName) {
    this.playerName = playerName;
    this.ships = this.generateShips(this);
    this.isMyTurn = false;
    this.spaces = this.generateEmptySpaces(this);
  }
  generateShips() {
    let ships = [];
    const carrier = new Ship.Ship("Carrier", 5);
    const battleship = new Ship.Ship("Battleship", 4);
    const submarine = new Ship.Ship("Submarine", 3);
    const cruiser = new Ship.Ship("Cruiser", 3);
    const destroyer = new Ship.Ship("Destroyer", 2);
    ships.push(carrier);
    ships.push(battleship);
    ships.push(submarine);
    ships.push(cruiser);
    ships.push(destroyer);
    return ships;
  }

  paintHit(target) {
    console.log(`paintHit called on target: ${target}`);
    const board = document.getElementById(`${this.playerName}GameBoard`);
    const boardChildren = board.childNodes;
    const targetString = `${target[0]}${target[1]}`;
    for (let i = 0; i < boardChildren.length; i++) {
      if (boardChildren[i].classList.contains("gameGridContainer")) {
        const gameGridContainer = boardChildren[i];
        let spaces = gameGridContainer.childNodes;
        for (let j = 0; j < spaces.length; j++) {
          if (spaces[j].classList.contains(targetString)) {
            const pin = createElement("div", spaces[j], null, ["pin", "hit"]);
          }
        }
      }
    }
    return;
  }

  paintMiss(target) {
    console.log(`paintMiss called on target: ${target}`);
    const board = document.getElementById(`${this.playerName}GameBoard`);
    const boardChildren = board.childNodes;
    const targetString = `${target[0]}${target[1]}`;
    for (let i = 0; i < boardChildren.length; i++) {
      if (boardChildren[i].classList.contains("gameGridContainer")) {
        const gameGridContainer = boardChildren[i];
        let spaces = gameGridContainer.childNodes;
        for (let j = 0; j < spaces.length; j++) {
          if (spaces[j].classList.contains(targetString)) {
            const pin = createElement("div", spaces[j], null, ["pin", "miss"]);
          }
        }
      }
    }
    return;
  }

  generateEmptySpaces(board) {
    let spaces = [];
    for (let i = 0; i < alphabet.length; i++) {
      for (let j = 1; j < 11; j++) {
        const newSpace = new Space(board, alphabet[i], j);
        spaces.push(newSpace);
      }
    }
    return spaces;
  }
  getSpaceAt(board, verticleCoordinate, horizontalCoordinate) {
    // Returns a space object for the given coordinates
    for (let i = 0; i < board.spaces.length; i++) {
      if (
        board.spaces[i].verticleCoordinate == verticleCoordinate &&
        board.spaces[i].horizontalCoordinate == horizontalCoordinate
      ) {
        return this.spaces[i];
      }
    }
    throw new Error(`getSpaceAt did not find the target space`);
  }

  linkSpaces(board) {
    // This function establishes left/right and up/down references between all squares. It should be run immedietely after generating squares
    for (let i = 0; i < this.spaces.length; i++) {
      if (this.spaces[i].verticleCoordinate === "A") {
        this.spaces[i].up = null;
      } else {
        this.spaces[i].up = board.getSpaceAt(
          board,
          getPreviousLetter(this.spaces[i].verticleCoordinate),
          this.spaces[i].horizontalCoordinate
        );
      }
      if (this.spaces[i].verticleCoordinate === "J") {
        this.spaces[i].down = null;
      } else {
        this.spaces[i].down = board.getSpaceAt(
          board,
          getNextLetter(this.spaces[i].verticleCoordinate),
          this.spaces[i].horizontalCoordinate
        );
      }
      if (this.spaces[i].horizontalCoordinate === 1) {
        this.spaces[i].left = null;
      } else {
        this.spaces[i].left = board.getSpaceAt(
          board,
          this.spaces[i].verticleCoordinate,
          this.spaces[i].horizontalCoordinate - 1
        );
      }
      if (this.spaces[i].horizontalCoordinate === 10) {
        this.spaces[i].right = null;
      } else {
        this.spaces[i].right = board.getSpaceAt(
          board,
          this.spaces[i].verticleCoordinate,
          this.spaces[i].horizontalCoordinate + 1
        );
      }
    }
    return;
  }

  getRandomOrientation() {
    let orientation = "Horizontal";
    if (Math.floor(Math.random() * 10) > 4) {
      orientation = "Verticle";
    }
    return orientation;
  }

  getRandomSpace() {
    let randomSpace = this.spaces[Math.floor(Math.random() * 1000)];
    return randomSpace;
  }

  placeShipsRandomly() {
    for (let i = 0; i < this.ships.length; i++) {
      let ship = this.ships[i];
      let randomSpace = this.getRandomSpace();
      let randomOrientation = this.getRandomOrientation();
      while (ship.canShipMoveHere(randomSpace, randomOrientation) === false) {
        randomSpace = this.getRandomSpace();
        randomOrientation = this.getRandomOrientation();
      }
      console.log(
        `placing ${
          ship.name
        } at ${randomSpace.coordinates()} ${randomOrientation}`
      );
      ship.placeShipHere(randomSpace, randomOrientation);
    }
    console.log(`Done placing ships for: ${this.playerName}`);
  }

  strike(board, letter, number) {
    console.log(`Strike activated for ${letter},${number}`);

    if (!alphabet.includes(letter) || number > 10 || number < 1) {
      throw new Error(`Attempted to strike an invalid space`);
    }
    let targetSpace = board.getSpaceAt(board, letter, number);
    console.log(`targetSpace: ${targetSpace}`);

    if (targetSpace.status === "empty") {
      console.log(`[${letter},${number}] Miss`);
      return "miss";
    } else if (targetSpace.status === "occupied") {
      targetSpace.status = "hit";
      let ship = targetSpace.occupant;
      ship.hits++;
      if (ship.hits === ship.size) {
        ship.isSunk = true;
        console.log(
          `[${letter},${number}] Hit, you've sunk the enemy's ${ship.name}`
        );
        return "sunk";
      }
      console.log(`[${letter},${number}] Hit`);
      return "hit";
    } else {
      throw new Error(
        `targetSpace.status neither empty or occupied. targetSpace.status: ${targetSpace.status}`
      );
    }
  }

  render() {
    // Check if a GameBoard already exists, if so remove it
    if (document.getElementById(`${this.playerName}GameBoard`) !== null) {
      const GameBoard = document.getElementById(`${this.playerName}GameBoard`);
      GameBoard.remove();
    }

    // Create GameBoard (parent container for background and grid)
    const body = document.body;
    const GameBoard = createElement(
      "div",
      body,
      `${this.playerName}GameBoard`,
      ["GameBoard", "setMode"]
    );

    // Create backgroundContainer and populate with colored squares
    const backgroundContainer = createElement("div", GameBoard, null, [
      "backgroundContainer",
    ]);
    for (let i = 0; i < 121; i++) {
      let newSpace = createElement("div", backgroundContainer, null, [
        "oceanSpace",
      ]);
      let randomNum = Math.floor(Math.random() * 10);
      let remainder = randomNum % 6;
      if (remainder == 0) {
        newSpace.classList.add(`oceanBlue1`);
      }
      if (remainder == 1) {
        newSpace.classList.add(`oceanBlue2`);
      }
      if (remainder == 2) {
        newSpace.classList.add(`oceanBlue3`);
      }
      if (remainder == 3) {
        newSpace.classList.add(`oceanBlue4`);
      }
      if (remainder == 4) {
        newSpace.classList.add(`oceanBlue5`);
      }
      if (remainder == 5) {
        newSpace.classList.add(`oceanBlue5`);
      }
    }

    // Create gridContainer for legend and game squares
    const gameGridContainer = createElement("div", GameBoard, null, [
      "gameGridContainer",
    ]);
    for (let i = 0; i < 121; i++) {
      const newSquare = createElement("div", gameGridContainer, null, [
        "gridSquare",
      ]);
    }
    const squares = gameGridContainer.childNodes;

    // Assign legend squares
    for (let i = 1; i < 11; i++) {
      let thisSquare = squares[i];
      thisSquare.classList.add("boardLegend");
      thisSquare.innerHTML = i;
    }
    let index = 0;
    for (let i = 11; i < 111; i += 11) {
      let thisSquare = squares[i];
      thisSquare.classList.add("boardLegend");
      thisSquare.innerHTML = alphabet[index];
      index++;
    }

    // Assign unique classnames to each square
    let squareNamesArray = [];
    for (let i = 0; i < alphabet.length; i++) {
      let letter = alphabet[i];
      for (let j = 1; j < 11; j++) {
        squareNamesArray.push(`${letter}${j}`);
      }
    }
    for (let i = 12; i < 121; i++) {
      let square = squares[i];
      if (square.classList.contains("boardLegend") == false) {
        const coordinate = squareNamesArray[0];
        square.classList.add("boardSpace");
        square.classList.add(coordinate);
        squareNamesArray.shift();
      }
    }

    //Render each ship:
    for (let i = 0; i < this.ships.length; i++) {
      this.ships[i].render(this.playerName);
    }
  }

  allShipsSunk() {
    let sunkCount = 0;
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk === true) {
        sunkCount++;
      }
      if (sunkCount === 5) {
        return true;
      }
      return false;
      {
      }
    }
  }
}

class Scoreboard {
  constructor(playerName) {
    this.playerName = playerName;
    this.spaces = this.generateEmptySpaces();
  }

  paintHit(target) {
    console.log(`paintHit called on target: ${target}`);
    const board = document.getElementById(`${this.playerName}ScoreBoard`);
    const boardChildren = board.childNodes;
    const targetString = `${target[0]}${target[1]}`;

// ***************************************************************************
// Gotta make sure this is handling spaces with 2-digit coordinate
// (it's not)
// ***************************************************************************


    for (let i = 0; i < boardChildren.length; i++) {
      if (boardChildren[i].classList.contains("backgroundContainer")) {
        const scoreboard = boardChildren[i];
        let spaces = scoreboard.childNodes;
        for (let j = 0; j < spaces.length; j++) {
          if (spaces[j].classList.contains(targetString)) {
            const pin = createElement("div", spaces[j], null, ["pin", "hit"]);
          }
        }
      }
    }
    return;
  }

  paintMiss(target) {
    console.log(`paintMiss called on target: ${target}`);
    const board = document.getElementById(`${this.playerName}ScoreBoard`);
    const boardChildren = board.childNodes;
    const targetString = `${target[0]}${target[1]}`;

// ***************************************************************************
// Gotta make sure this is handling spaces with 2-digit coordinate
// (it's not)
// ***************************************************************************


    for (let i = 0; i < boardChildren.length; i++) {
      if (boardChildren[i].classList.contains("backgroundContainer")) {
        const scoreboard = boardChildren[i];
        let spaces = scoreboard.childNodes;
        for (let j = 0; j < spaces.length; j++) {
          if (spaces[j].classList.contains(targetString)) {
            const pin = createElement("div", spaces[j], null, ["pin", "miss"]);
          }
        }
      }
    }
    return;
  }

  generateEmptySpaces() {
    let spaces = [];
    for (let i = 0; i < alphabet.length; i++) {
      for (let j = 1; j < 11; j++) {
        const newSpace = new ScoreboardSpace(alphabet[i], j);
        spaces.push(newSpace);
      }
    }
    return spaces;
  }

  getSpaceAt(board, verticleCoordinate, horizontalCoordinate) {
    // Returns a space object for the given coordinates
    for (let i = 0; i < board.spaces.length; i++) {
      if (
        board.spaces[i].verticleCoordinate == verticleCoordinate &&
        board.spaces[i].horizontalCoordinate == horizontalCoordinate
      ) {
        return this.spaces[i];
      }
    }
    throw new Error(`getSpaceAt did not find the target space`);
  }

  render() {
    // Create ScoreBoard (parent container for background and grid)
    const body = document.body;
    const ScoreBoard = createElement(
      "div",
      body,
      `${this.playerName}ScoreBoard`,
      ["ScoreBoard", "hidden"]
    );

    // Create backgroundContainer and populate with colored squares
    const backgroundContainer = createElement("div", ScoreBoard, null, [
      "backgroundContainer",
    ]);
    for (let i = 0; i < 121; i++) {
      let newSpace = createElement("div", backgroundContainer, null, [
        "oceanSpace",
      ]);
      let randomNum = Math.floor(Math.random() * 10);
      let remainder = randomNum % 6;
      if (remainder == 0) {
        newSpace.classList.add(`oceanBlue1`);
      }
      if (remainder == 1) {
        newSpace.classList.add(`oceanBlue2`);
      }
      if (remainder == 2) {
        newSpace.classList.add(`oceanBlue3`);
      }
      if (remainder == 3) {
        newSpace.classList.add(`oceanBlue4`);
      }
      if (remainder == 4) {
        newSpace.classList.add(`oceanBlue5`);
      }
      if (remainder == 5) {
        newSpace.classList.add(`oceanBlue5`);
      }
    }

    const squares = backgroundContainer.childNodes;

    // Assign legend squares
    for (let i = 1; i < 11; i++) {
      let thisSquare = squares[i];
      thisSquare.classList.add("boardLegend");
      thisSquare.innerHTML = i;
    }
    let index = 0;
    for (let i = 11; i < 111; i += 11) {
      let thisSquare = squares[i];
      thisSquare.classList.add("boardLegend");
      thisSquare.innerHTML = alphabet[index];
      index++;
    }

    // Assign unique classnames to each square
    let squareNamesArray = [];
    for (let i = 0; i < alphabet.length; i++) {
      let letter = alphabet[i];
      for (let j = 1; j < 11; j++) {
        squareNamesArray.push(`${letter}${j}`);
      }
    }
    for (let i = 12; i < 121; i++) {
      let square = squares[i];
      if (square.classList.contains("boardLegend") == false) {
        const coordinate = squareNamesArray[0];
        square.classList.add("boardSpace");
        square.classList.add(coordinate);
        squareNamesArray.shift();
      }
    }
  }
}

class Space {
  constructor(board, verticleCoordinate, horizontalCoordinate) {
    this.board = board;
    this.verticleCoordinate = verticleCoordinate;
    this.horizontalCoordinate = horizontalCoordinate;
    this.status = "empty";
    this.occupant = null;
    this.up = null;
    this.down = null;
    this.right = null;
    this.left = null;
  }
  coordinates() {
    return [this.verticleCoordinate, this.horizontalCoordinate];
  }
}

class ScoreboardSpace {
  constructor(verticleCoordinate, horizontalCoordinate) {
    this.verticleCoordinate = verticleCoordinate;
    this.horizontalCoordinate = horizontalCoordinate;
    this.status = "empty";
  }
}

// ************************************************************************************
// Export functions:

// (These could maybe have been written as methods)

function createGameboard(playerName) {
  let newBoard = new Gameboard(playerName);
  newBoard.linkSpaces(newBoard);
  return newBoard;
}

function createScoreboard(playerName) {
  let newScoreboard = new Scoreboard(playerName);
  return newScoreboard;
}

module.exports = {
  // createGameBoard is the only export that's really necessary, the rest are exported to be tested
  Gameboard,
  Scoreboard,
  alphabet,
  getPreviousLetter,
  getNextLetter,
  createGameboard,
  createScoreboard,
};
