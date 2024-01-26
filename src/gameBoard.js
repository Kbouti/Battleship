// import {Ship} from './ships'
// ^ This import statement triggered an error message but seemed to work..
// but this below got rid of the error statement (woohoo!)

const Ship = require('./ships.js');


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
  constructor(player, turn) {
    this.player = player;
    this.ships = this.generateShips();
    this.turn = turn;
    // turn will be true or false
    this.spaces = this.generateEmptySpaces();
  }

  generateShips(){
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

  generateEmptySpaces() {
    let spaces = [];
    let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    for (let i = 0;i<alphabet.length;i++){
        for (let j = 1; j<11; j++){
            const newSpace = new Space(alphabet[i], j, "empty");
            spaces.push(newSpace);
        }
    }
    return spaces;
  }
}

class Space {
  constructor(verticleCoordinate, horizontalCoordinate, status) {
    this.verticleCoordinate = verticleCoordinate;
    this.horizontalCoordinate = horizontalCoordinate;
    this.status = status;
  }

  coordinates() {
    return [this.verticleCoordinate, this.horizontalCoordinate];
  }
}

let Player1Board = new Gameboard('Kevin');
console.log(Player1Board)


// So we've created an empty gameboard and assigned a name to it. 
// We need to be able to put the pieces on the board next
// First we need to create the pieces. 
// Then we need to decide where to put them
// Then we need to put them in place





module.exports = {
  testgameBoardFile,
  testTrue,
  Gameboard,
  Player1Board
};
