function subtract (a, b){
    return (a - b);
}



class Ship {
    constructor(name, size, hits, isSunk, location){
        this.name = name;
        this.size = size;
        this.hits = hits;
        this.isSunk = isSunk;
        this.location = location;
        // I'm thinking location will be an array of squares
    }
}



module.exports = {
    subtract,
    Ship
}