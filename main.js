const gameSummary = {
  //stworzone zmienne, ktore przechowuja wyniki
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  //stworzone zmienne przechowuja to co wylosuje gracz lub komputer
  playerHand: "",
  aiHand: "",
};

const hands = [...document.querySelectorAll(".wrapTop img")];

function mySelection() {
  game.playerHand = this.dataset.option; //do playerhand zostaje przekazana informacja ktore opcje wybralem
  hands.forEach((hand) => (hand.style.boxShadow = "")); //resetuje obramowanie po kazdym nowym wyborze
  this.style.boxShadow = "0 0 0 4px yellow";
}

function aiChoice() {
  const choice = hands[Math.floor(Math.random() * hands.length)].dataset.option;
  return choice;
}

function checkResult(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "papier" && ai === "kamień") ||
    (player === "kamień" && ai === "nożyczki") ||
    (player === "nożyczki" && ai === "papier")
  ) {
    return "win";
  } else {
    return "loss";
  }
}

function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;
  if (result === "win") {
    document.querySelector("p.wins span").textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = "Wygrałeś";
    document.querySelector('[data-summary="who-win"]').style.color = "green";
  } else if (result === "loss") {
    document.querySelector("p.losses span").textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Przegrałeś";
    document.querySelector('[data-summary="who-win"]').style.color = "red";
  } else {
    document.querySelector("p.draws span").textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "Remis";
    document.querySelector('[data-summary="who-win"]').style.color = "gray";
  }
}

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow =
    "";
  game.playerHand = "";
  game.aiHand = "";
}

function startGame() {
  if (game.playerHand === "") {
    alert("Wybierz opcje");
  } else {
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
  }
}

document.querySelector(".start").addEventListener("click", startGame);
hands.forEach((hand) => hand.addEventListener("click", mySelection));
