const boardsJS = require("./boards.js");
const { createElement } = require("./domElements.js");

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

  getShipClass() {
    let shipClass = this.name + this.orientation;
    return shipClass;
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

  render() {
    const GameBoard = document.getElementById("GameBoard");
    const targetCoordinates = this.startingSpace.coordinates();
    const targetClass = targetCoordinates.join("");
    const targetDiv = document.getElementsByClassName(targetClass);
// targetDiv actually returns a nodelist with one element, so if we're putting it in the square we'll actually use targetDiv[0] as the destination



    const ship = createElement("div", GameBoard, null, [
      "ship",
      this.getShipClass(),
    ]);

// Ok, we've put these in the grid container but since they don't want to overlap they end up underneatch the gridBoard
// So now we have to move them in the grid??

// I was using the coordinates to put the element into a given square
// Maybe instead I can use the coordinates to the grid area




    // Here we have successfully placed shipDivs on the board.
    // Each ship knows it's orientation and how many spaces it needs to span
    // They still need to be stretch to cover the appropriate number of spaces
    // The problem is how it's stacking the divs. Attempted  to use z index to solve it but it's not working
  }
}

module.exports = {
  subtract,
  Ship,
};
