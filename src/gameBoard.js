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


module.exports = {
  testgameBoardFile,
  testTrue
}