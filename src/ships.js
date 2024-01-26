function subtract (a, b){
    return (a - b);
}



class Ship {
    constructor(name, size){
        this.name = name;
        this.size = size;
        this.hits = null
        this.isSunk = false
        this.location = null;
        // I'm thinking location will be an array of squares
    }
}



module.exports =  {
    subtract,
    Ship
}