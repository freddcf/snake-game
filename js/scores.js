let score = 0;

const LOCAL_STORAGE_SCORES = JSON.parse(localStorage.getItem("high_score"));

let high_score =
  localStorage.getItem("high_score") !== null ? LOCAL_STORAGE_SCORES : [0];

const updadeLocalStorage = () => {
  localStorage.setItem("high_score", JSON.stringify(score));
};

export function updateScore() {
  const scoreTable = document.querySelector(".score");
  scoreTable.innerHTML = `Score:${score}`;

  const highScoreTable = document.querySelector(".highscore");
  highScoreTable.innerHTML = `Highscore:${high_score}`;

  if (score > high_score) updadeLocalStorage();
}

export function setAdicionalScore(addScore) {
  score += addScore;
}
