function testgameBoardFile(){
    const message = `gameBoard test success`;
    const newElement = document.createElement(`div`);
    newElement.innerHTML = message;
    document.body.appendChild(newElement);
    return 
}

function testTrue(){
    return true
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
    constructor(player,ships, turn, hits, misses){
        this.player = player;
        this.ships = ships;
        this.turn = turn;
        this.hits = hits;
        this.misses = misses;
    }
}












module.exports = {
  testgameBoardFile,
  testTrue
}