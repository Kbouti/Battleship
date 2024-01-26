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
// (5) Aircraft Carrier
// (4) BattleShip
// (3) Submarine
// (3) Cruiser
// (2) Destroyer

class Gameboard {
  constructor(player, ships, turn) {
    this.player = player;
    this.ships = ships;
    this.turn = turn;
    this.spaces = this.generateEmptySpaces();
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

let Player1Board = new Gameboard();
console.log(Player1Board)


module.exports = {
  testgameBoardFile,
  testTrue,
  Gameboard,
  Player1Board
};
