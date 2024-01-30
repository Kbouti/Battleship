const gamePlay = require("./gamePlay");
const boards = require("./boards");

function submitForm(event) {
  event.preventDefault();

  const player1Input = document.getElementById("player1Input");
  const player2Input = document.getElementById("player2Input");
  const pVcRadio = document.getElementById("pVcRadio");

  let player1Name = null;
  let player2Name = null;
  let gameMode = null;

  if (player1Input.value == null) {
    player1Name = "Player 1";
  } else {
    player1Name = player1Input.value;
  }
  if (player2Input.value == null) {
    player2Name = "Player 2";
  } else {
    player2Name = player2Input.value;
  }
  if (pVcRadio.checked == true) {
    gameMode = "pVc";
  } else {
    gameMode = "pVp";
  }

  let newGame = new gamePlay.Game(player1Name, gameMode, player2Name);
  return newGame;

  // ***********************************************************************************************************************************************************
  // Our error occurs when we attempt to run this function, but I commented out everything in the function and it still errors.
  // So it has something to do with how we're finding or calling this function?
  // ***********************************************************************************************************************************************************
}

function addEventListeners() {
  const newGameForm = document.getElementById(`newGameForm`);
  console.log(`adding Event listeners`);
  newGameForm.addEventListener(`submit`, submitForm);
}

module.exports = {
  submitForm,
  addEventListeners,
};
