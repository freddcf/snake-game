import { randomGridPosition } from "./gridPosition.js";
import { getInputDirection } from "./controls.js";
import { setAdicionalScore } from "./scores.js";
import { eatSound } from "./game.js";

export const SNAKE_SPEED = 6.5;
const SIZE_EXPANSION_RATE = 1;
const ADD_SCORE = 10;
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

/* -------------- SNAKE FEATURES -------------- */

export function updateSnake() {
  addSegments();
  const inputDirection = getInputDirection();
  // The child takes the place of the parent location
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
    console.log(snakeBody);
    console.log({ ...snakeBody[i] });
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function drawSnake(gameBoard) {
  snakeBody.forEach((snakeSegment, index) => {
    const snake = document.createElement("div");
    snake.style.gridRowStart = snakeSegment.y;
    snake.style.gridColumnStart = snakeSegment.x;
    snake.classList.add("snake");
    if (index == 0) snake.classList.add("head");
    gameBoard.appendChild(snake);
  });
}

function expandSnake(amount) {
  newSegments += amount;
}

// Check where the snake currently is
function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((snakeSegment, index) => {
    if (ignoreHead && index === 0) return false;
    return isSamePosition(snakeSegment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

// Look for head collisions
export function collision() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function isSamePosition(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    // Duplicating last element of the snake body
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}

/* ----------- FOOD POINTS FEATURES ----------- */

let foodLocation = getNewFoodPosition();

// Update food on eat
export function updateFood() {
  if (onSnake(foodLocation)) {
    eatSound.play();
    setAdicionalScore(ADD_SCORE);
    expandSnake(SIZE_EXPANSION_RATE);
    foodLocation = getNewFoodPosition();
  }
}

export function drawFood(gameBoard) {
  const food = document.createElement("div");
  food.style.gridRowStart = foodLocation.y;
  food.style.gridColumnStart = foodLocation.x;
  food.classList.add("food");
  gameBoard.appendChild(food);
}

function getNewFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
