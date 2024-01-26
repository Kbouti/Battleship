// import {Ship} from './ships'
// ^ This import statement triggered an error message but seemed to work..
// but this below got rid of the error statement (woohoo!)

const Ship = require("./ships.js");

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

// Gameboard will consist of a series of 10x10 grids. The verticle axis is labeled A-J, the horizontal is 1-10
// There are 5 pieces:
// (length) NAME
// (5) Carrier
// (4) BattleShip
// (3) Submarine
// (3) Cruiser
// (2) Destroyer

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
    let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
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

  getSpaceAt(verticleCoordinate, horizontalCoordinate){
    for (let i = 0; i< this.spaces.length;i++){
        if ((this.spaces[i].verticleCoordinate === verticleCoordinate) &&(this.spaces[i].horizontalCoordinate === horizontalCoordinate)){
            return this.spaces[i];
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
    this.up = this.getUp();
    this.down = this.getDown();
    this.right = this.getRight();
    this.left = this.getLeft();
  }

  coordinates() {
    return [this.verticleCoordinate, this.horizontalCoordinate];
  }

// ************************************************************************
// This is where I need to do some work. Gotta linnk all these squares up
// ***But first***** Write some tests! 


// Do we need a method that takes coordinates and returns the space object?
// ************************************************************************


  getUp() {
    if (this.verticleCoordinate === "A"){
        return null
    }
    return 
  }

  getDown() {
    // **giggity**
  }

  getRight() {}
  getLeft() {}

  // ************************************************************************
}

let Player1Board = new Gameboard("Kevin");
console.log(Player1Board);

console.log(Player1Board.ships[0]);

let space = Player1Board.getSpaceAt("A", 2);
console.log(space)


// So we've created an empty gameboard and assigned a name to it.
// We need to be able to put the pieces on the board next
// First we need to create the pieces.
// Then we need to decide where we can put them
// Then we need to decide where we want to put them
// Then we need to put them in place

module.exports = {
  testgameBoardFile,
  testTrue,
  Gameboard,
  Player1Board,
};
