import { moveSound } from "./game.js";

// Direction states
let direction = {
  atual: { x: 0, y: 0 },
  last: { x: 0, y: 0 },
};

// Check which of the allowed keys was pressed
window.addEventListener("keydown", (move) => {
  switch (move.key) {
    case "ArrowUp":
    case "W":
    case "w":
      if (direction.last.y !== 0) break;
      direction.atual = { x: 0, y: -1 };
      moveSound.play();
      break;
    case "ArrowDown":
    case "S":
    case "s":
      if (direction.last.y !== 0) break;
      direction.atual = { x: 0, y: 1 };
      moveSound.play();
      break;
    case "ArrowLeft":
    case "A":
    case "a":
      if (direction.last.x !== 0) break;
      direction.atual = { x: -1, y: 0 };
      moveSound.play();
      break;
    case "ArrowRight":
    case "D":
    case "d":
      if (direction.last.x !== 0) break;
      direction.atual = { x: 1, y: 0 };
      moveSound.play();
      break;
  }
});

export function getInputDirection() {
  direction.last = direction.atual;
  return direction.atual;
}
