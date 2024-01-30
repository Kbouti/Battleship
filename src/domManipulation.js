const newGameForm = document.getElementById(`newGameForm`);

newGameForm.addEventListener(`submit`, function (event) {
    event.preventDefault;
  const player1Input = document.getElementById("player1Input");
  const player2Input = document.getElementById("player2Input");

  const player1Name = null;
  const player2Name = null;

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

});
