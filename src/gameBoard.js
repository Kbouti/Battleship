// import {Ship} from './ships'
// ^ This import statement triggered an error message but seemed to work..
// but this below got rid of the error statement (woohoo!)

const Ship = require("./ships.js");

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

function testgameBoardFile() {
  const message = `gameBoard test success`;
  const newElement = document.createElement(`div`);
  newElement.innerHTML = message;
  document.body.appendChild(newElement);
  return;
}

function testTrue() {
  return true;
}


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

  generateEmptySpaces(board) {
    let spaces = [];
    // const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (let i = 0; i < alphabet.length; i++) {
      for (let j = 1; j < 11; j++) {
        const newSpace = new Space(board, alphabet[i], j, "empty");
        spaces.push(newSpace);
      }
    }
    return spaces;
  }

  getOccupiedSpaces() {}

  getPossibleLocations(size) {
    // This takes the size of a ship and outputs all possible positions that that piece can go, taking into account the edges of the board and other pieces on the board
    // Returns a starting space coordinates and either horizontal or verticle orientation
  }

  getSpaceAt(verticleCoordinate, horizontalCoordinate) {
    // Returns a space object for the given coordinates
    for (let i = 0; i < this.spaces.length; i++) {
      if (
        this.spaces[i].verticleCoordinate === verticleCoordinate &&
        this.spaces[i].horizontalCoordinate === horizontalCoordinate
      ) {
        return this.spaces[i];
      }
    }
  }

  linkSpaces() {
    // This function establishes left/right and up/down references between all squares. It should be run immedietely after generating squares
    for (let i = 0; i < this.spaces.length; i++) {
      if (this.spaces[i].verticleCoordinate === "A") {
        this.spaces[i].up = null;
      } else {
        this.spaces[i].up = this.getSpaceAt(
          getPreviousLetter(this.spaces[i].verticleCoordinate),
          this.spaces[i].horizontalCoordinate
        );
      }
      if (this.spaces[i].verticleCoordinate === "J") {
        this.spaces[i].down = null;
      } else {
        this.spaces[i].down = this.getSpaceAt(
          getNextLetter(this.spaces[i].verticleCoordinate),
          this.spaces[i].horizontalCoordinate
        );
      }
      if (this.spaces[i].horizontalCoordinate === 1) {
        this.spaces[i].left = null;
      } else {
        this.spaces[i].left = this.getSpaceAt(
          this.spaces[i].verticleCoordinate,
          this.spaces[i].horizontalCoordinate - 1
        );
      }
      if (this.spaces[i].horizontalCoordinate === 10) {
        this.spaces[i].right = null;
      } else {
        this.spaces[i].right = this.getSpaceAt(
          this.spaces[i].verticleCoordinate,
          this.spaces[i].horizontalCoordinate + 1
        );
      }
    }
    return;
  }
}

class Space {
  constructor(board, verticleCoordinate, horizontalCoordinate) {
    this.board = board;
    this.verticleCoordinate = verticleCoordinate;
    this.horizontalCoordinate = horizontalCoordinate;
    this.status = "empty";
    this.up = null;
    this.down = null;
    this.right = null;
    this.left = null;
  }

  coordinates() {
    return [this.verticleCoordinate, this.horizontalCoordinate];
  }
}

let Player1Board = new Gameboard("Kevin");
Player1Board.linkSpaces();

// So we've created an empty gameboard and assigned a name to it.
// We've created all the ship objects
// After creating the board we've linked all the squares together
// Now we need to figure out how to put the pieces on the board
// Including determining what spaces are eligible and what spaces aren't


module.exports = {
  testgameBoardFile,
  testTrue,
  Gameboard,
  Player1Board,
  alphabet,
  getPreviousLetter,
  getNextLetter,
};
