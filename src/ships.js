function subtract (a, b){
    return (a - b);
}



class Ship {
    constructor(name, size){
        this.name = name;
        this.size = size;
        this.hits = null
        this.isSunk = false
        this.startingSpace = null;
        this.orientation = "horizontal";
        // I'm thinking location will be an array of squares
    }

    placeShip(){
    }
}



module.exports =  {
    subtract,
    Ship
}