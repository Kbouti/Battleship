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
        if ((currentSpace == null) || (currentSpace.status !== "empty")) {
          moveAllowed = false;
          console.log(`Can't move here`);
          return false;
        } else {
            currentSpace = currentSpace.right
        }
      }
      console.log(`ship can move here`)
      return true;
      // make sure there are enough spaces to the right
      // make sure none of those spaces are occupied by another ship
      // this.startingSpace = startingSpace;
      // Update the appropriate space contents
    } else {
        //orientation is verticle
        for (let i = 0; i < shipLength; i++) {
            if ((currentSpace == null) || (currentSpace.status !== "empty")) {
              moveAllowed = false;
              console.log(`Can't move here`);
              return false;
            } else {
                currentSpace = currentSpace.down
            }
          }
          console.log(`ship can move here`)
          return true;
      }
  } 
}

module.exports = {
  subtract,
  Ship,
};
