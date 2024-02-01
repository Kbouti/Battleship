const boardsJS = require("./boards.js");
const {createElement} = require("./domElements.js");

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
    this.shipClass = this.name + this.orientation;
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

  const targetCoordinates = this.startingSpace.coordinates();
  const targetClass = targetCoordinates.join("");
  const targetDiv = document.getElementsByClassName(targetClass);
  const ship = createElement("div", targetDiv[0], null, ["ship", this.shipClass])

  // Here we have successfully placed shipDivs on the board. 
  // Each ship knows it's orientation and how many spaces it needs to span
  // They still need to be stretch to cover the appropriate number of spaces


// We're havving an issue with how we apply the class.
// Our carrier was set to verticle but got the horizontal class
// The problem is how it's stacking the divs. Attempted  to use z index to solve it but it's not working

}

}

module.exports = {
  subtract,
  Ship,
};
