import {
  updateSnake,
  drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  collision,
  updateFood,
  drawFood,
} from "./gameFeats.js";
import { outsideGrid } from "./gridPosition.js";
import { updateScore } from "./scores.js";

/*---------- SOUNDS ----------*/
let speakerSound = true;
const deathSound = new Audio();
export const eatSound = new Audio();
export const moveSound = new Audio();

eatSound.src = "audio/eat.mp3";
deathSound.src = "audio/dead.mp3";
moveSound.src = "audio/move.mp3";

/*----------------------------*/

let lastRenderTime = 0;
const gameBoard = document.querySelector("#game-board");
const starter = document.querySelector(".starter");
const speaker = document.querySelector(".volume img");
let gameOver = false;
const gameOverScreen = document.querySelector(".gameover");

/* Rendering GAME BOARD */

function gameAnimationUpdate(curTime) {
  // GET GAME-OVER ALERT
  if (gameOver) {
    location.reload();
    alert("You lost the game...");
  }

  window.requestAnimationFrame(gameAnimationUpdate);
  // Get delay between rendered frames
  const secSinceLastRender = (curTime - lastRenderTime) / 1000;
  // Setting render time
  if (secSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = curTime;

  update();
  draw();
}

// ---------- Event listeners ----------

window.addEventListener("load", () => {
  updateScore();
  audioState();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    starter.classList.add("animate");
    window.requestAnimationFrame(gameAnimationUpdate);
  }
});

starter.addEventListener("animationend", (event) => {
  if (event.animationName === "fade") starter.style.display = "none";
});

speaker.addEventListener("click", () => {
  audioState();
});

/* State Functions */

function update() {
  updateSnake();
  updateFood();
  updateScore();
  checkFailure();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkFailure() {
  gameOver = outsideGrid(getSnakeHead()) || collision();
  if (gameOver) {
    deathSound.play();
    gameOverScreen.style.display = "flex";
  }
}

function audioState() {
  if (speakerSound) {
    speaker.src = "img/volume-mute.svg";
    speakerSound = false;
    eatSound.muted = true;
    deathSound.muted = true;
    moveSound.muted = true;
  } else {
    speaker.src = "img/volume-up.svg";
    speakerSound = true;
    eatSound.muted = false;
    deathSound.muted = false;
    moveSound.muted = false;
  }
}
