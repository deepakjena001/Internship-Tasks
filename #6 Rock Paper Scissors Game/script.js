const userScoreEl =
  document.getElementById("userScore");

const computerScoreEl =
  document.getElementById("computerScore");

const userChoiceEl =
  document.getElementById("userChoice");

const computerChoiceEl =
  document.getElementById("computerChoice");

const resultEl =
  document.getElementById("result");

const restartBtn =
  document.getElementById("restartBtn");

let userScore = 0;

let computerScore = 0;

const choices = [
  "Rock",
  "Paper",
  "Scissors"
];

restartBtn.addEventListener(
  "click",
  restartGame
);

function playGame(userChoice) {

  let randomIndex =
    Math.floor(Math.random() * choices.length);

  let computerChoice =
    choices[randomIndex];

  userChoiceEl.innerText =
    "Your Choice: " + userChoice;

  computerChoiceEl.innerText =
    "Computer Choice: " + computerChoice;

  let result = "";

  if (userChoice === computerChoice) {

    result = "It's a Draw!";

  } else if (

    (userChoice === "Rock" &&
      computerChoice === "Scissors") ||

    (userChoice === "Paper" &&
      computerChoice === "Rock") ||

    (userChoice === "Scissors" &&
      computerChoice === "Paper")

  ) {

    result = "You Win!";

    userScore++;

  } else {

    result = "Computer Wins!";

    computerScore++;
  }

  resultEl.innerText = result;

  userScoreEl.innerText = userScore;

  computerScoreEl.innerText =
    computerScore;
}

function restartGame() {

  userScore = 0;

  computerScore = 0;

  userScoreEl.innerText = 0;

  computerScoreEl.innerText = 0;

  userChoiceEl.innerText =
    "Your Choice:";

  computerChoiceEl.innerText =
    "Computer Choice:";

  resultEl.innerText =
    "Start Playing!";
}