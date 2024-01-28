const gameBoard = require("./gameBoard.js");

function subtract(a, b) {
  return a - b;
}

class Ship {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.hits = null;
    this.isSunk = false;
    this.startingSpace = null;
    this.orientation = "horizontal";
    // I'm thinking location will be an array of squares
  }

  canShipMoveHere(startingSpace, orientation) {
    this.orientation = orientation;
    const shipLength = this.size;

    let currentSpace = startingSpace;
    let moveAllowed = true;

    if (this.orientation == "horizontal") {
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
      //orientation is verticle
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
    // Ok here should exist the logic to associate the ship with the appropriate spaces;
    this.orientation = orientation;
    this.startingSpace = startingSpace;
    let size = this.size;
    let currentSpace = startingSpace;
    for (let i = 0; i < size; i++) {
      currentSpace.status = "occupied";
      if (orientation === "horizontal") {
        currentSpace = currentSpace.right;
      } else {
        currentSpace = currentSpace.down;
      }
    }
    return;
  }
}

module.exports = {
  subtract,
  Ship,
};
