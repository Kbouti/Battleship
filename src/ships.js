const boardsJS = require("./boards.js");
const domElements = require("./domElements.js");

function subtract(a, b) {
  return a - b;
}

class Ship {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.hits = 0;
    this.isSunk = false;
    this.startingSpace = null;
    this.orientation = "Horizontal";
  }

  canShipMoveHere(startingSpace, orientation) {
    this.orientation = orientation;
    const shipLength = this.size;
    let currentSpace = startingSpace;
    let moveAllowed = true;
    if (this.orientation == "Horizontal") {
      for (let i = 0; i < shipLength; i++) {
        if (currentSpace == null || currentSpace.status !== "empty") {
          moveAllowed = false;
          return false;
        } else {
          currentSpace = currentSpace.right;
        }
      }
      return true;
    } else {
      for (let i = 0; i < shipLength; i++) {
        if (currentSpace == null || currentSpace.status !== "empty") {
          moveAllowed = false;
          return false;
        } else {
          currentSpace = currentSpace.down;
        }
      }
      return true;
    }
  }

  placeShipHere(startingSpace, orientation) {
    this.orientation = orientation;
    this.startingSpace = startingSpace;
    let size = this.size;
    let currentSpace = startingSpace;
    for (let i = 0; i < size; i++) {
      currentSpace.status = "occupied";
      currentSpace.occupant = this;
      if (orientation === "Horizontal") {
        currentSpace = currentSpace.right;
      } else {
        currentSpace = currentSpace.down;
      }
    }
    return;
  }


render(){

  const shipClass = ``

  const gameBoard = document.getElementById(`GameBoard`);
  const ship = domElements.createElement("div", gameBoard, null, ["ship", this.name])

  // So a ship has been created of the appropriate class
  // Now we have to move it onto the grid
}

}

module.exports = {
  subtract,
  Ship,
};
