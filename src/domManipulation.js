const gamePlay = require("./gamePlay");
const boards = require("./boards");

function submitForm(event) {
  // We could/should maybe add a conttrol on the form so it doesn't accept names with spaces

  event.preventDefault();

  const newGameForm = document.getElementById(`newGameForm`);
  const player1Input = document.getElementById("player1Input");
  const player2Input = document.getElementById("player2Input");
  const pVcRadio = document.getElementById("pVcRadio");

  let player1Name = null;
  let player2Name = null;
  let gameMode = null;

  if (player1Input.value == "") {
    player1Name = "Player_1";
  } else {
    player1Name = player1Input.value;
  }
  if (player2Input.value == "") {
    player2Name = "Player_2";
  } else {
    player2Name = player2Input.value;
  }

  if (player1Name == player2Name) {
    player1Name = "Player_1";
    player2Name = "Player_2";
  }

  if (pVcRadio.checked == true) {
    gameMode = "pVc";
  } else {
    gameMode = "pVp";
  }
  let newGame = new gamePlay.Game(player1Name, gameMode, player2Name);
  newGameForm.remove();
  newGame.beginMatch(newGame);
  return;
}

function addEventListeners() {
  const newGameForm = document.getElementById(`newGameForm`);
  console.log(`adding Event listeners`);
  newGameForm.addEventListener(`submit`, submitForm);
}

function paintMiss(board, space) {
  // board will be a reference to the gameboard or scoreboard object
  // space will come as an array ["A", 5]

// My mental confusion here is that this function handle both scoreBoard and gameBoard
// Maybe these should be methods on gameBoard and scoreBoard class


}

function paintHit(board, space) {}

module.exports = {
  submitForm,
  addEventListeners,
};
