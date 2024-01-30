const gamePlay = require("./gamePlay");
const boards = require("./boards");

function submitForm(event) {
  event.preventDefault();

  const newGameForm = document.getElementById(`newGameForm`);
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
  newGameForm.style.visibility = "hidden";

  // ***********************************************************************************************************************************************************
  // Ok, now we've created a game.
  // Now that we've created a game object we call game.renderGameBoard and game.renderScoreBoard

  // maybe:
  // renderGameBoard(newGame.player1Gameboard);
  // renderGameBoard(newGame.player2Gameboard);

  // ..? ahhhh but they don't want us writing more functions. So maybe it's gotta be game.player1GameBoard.render()?
  // or game.render(player1gameBoard)
  // ***********************************************************************************************************************************************************

  return;
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
