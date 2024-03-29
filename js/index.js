// Game constants & Variables
let frame = window.requestAnimationFrame(main);
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/Bg-music.mp3");
let speed = 3;
let score = 0;
let hiscoreval = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

let hiscore = JSON.parse(localStorage.getItem("hiscore")) || 0;
hiscoreSpan.innerHTML = hiscore;

// Game Functions
function main(ctime) {
  frame = window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If snake bump into itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If snake bump into the wall
  if (
    snake[0].x >= 19 ||
    snake[0].x <= 0 ||
    snake[0].y >= 19 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Disply the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("snakeHead");
    } else if (index === snakeArr.length - 1) {
      snakeElement.classList.add("snakeTail");
    } else {
      snakeElement.classList.add("snakeBody");
    }
    board.appendChild(snakeElement);
  });

  // Disply the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

  // If snake eaten the food, increase snake length, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });

    score += 1;
    if (score > hiscore) {
      hiscore = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscore));
      hiscoreSpan.innerHTML = hiscore;
    }
    scoreSpan.innerHTML = score;

    let a = 2;
    let b = 18;
    let c = 2;
    let d = 18;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(c + (d - c) * Math.random()),
    };
  }

  // If snake collides
  if (isCollide(snakeArr)) {
    window.cancelAnimationFrame(frame);
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    message.style.display = "flex";
    score = 0;
    return;
  }
}

// Game Controls by Keyboard

window.addEventListener("keydown", (e) => {
  if (message.style.display === "flex") {
    if (e.key === "Enter") {
      window.location.reload();
    }
    return;
  } else if (
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight"
  ) {
    musicSound.play();
    moveSound.play();
    switch (e.key) {
      case "ArrowUp":
        inputDir.x = 0;
        inputDir.y = -1;
        break;

      case "ArrowDown":
        inputDir.x = 0;
        inputDir.y = 1;
        break;

      case "ArrowLeft":
        inputDir.x = -1;
        inputDir.y = 0;
        break;

      case "ArrowRight":
        inputDir.x = 1;
        inputDir.y = 0;
        break;

      default:
        break;
    }
  }
});

// On-Screen Game Controls

window.addEventListener("click", (e) => {
  if (message.style.display === "flex") {
    if (e.target.id === "playAgainBtn") {
      window.location.reload();
    }
  } else if (
    e.target.id === "up-key" ||
    e.target.id === "down-key" ||
    e.target.id === "left-key" ||
    e.target.id === "right-key"
  ) {
    musicSound.play();
    moveSound.play();
    switch (e.target.id) {
      case "up-key":
        inputDir.x = 0;
        inputDir.y = -1;
        break;

      case "down-key":
        inputDir.x = 0;
        inputDir.y = 1;
        break;

      case "left-key":
        inputDir.x = -1;
        inputDir.y = 0;
        break;

      case "right-key":
        inputDir.x = 1;
        inputDir.y = 0;
        break;

      default:
        break;
    }
  }
});
