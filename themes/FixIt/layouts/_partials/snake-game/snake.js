// 贪吃蛇游戏实现
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const gameContainer = document.getElementById('snake-game');
gameContainer.appendChild(canvas);

canvas.width = 400;
canvas.height = 400;

const blockSize = 20;
let snake = [
  { x: 10 * blockSize, y: 10 * blockSize }
];
let food = {
  x: Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize,
  y: Math.floor(Math.random() * (canvas.height / blockSize)) * blockSize
};
let direction = 'right';
let score = 0;

function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, blockSize, blockSize);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, blockSize, blockSize);
}

function moveSnake() {
  let head = { ...snake[0] };
  switch (direction) {
    case 'right':
      head.x += blockSize;
      break;
    case 'left':
      head.x -= blockSize;
      break;
    case 'up':
      head.y -= blockSize;
      break;
    case 'down':
      head.y += blockSize;
      break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize,
      y: Math.floor(Math.random() * (canvas.height / blockSize)) * blockSize
    };
  } else {
    snake.pop();
  }
}

function checkCollision() {
  let head = snake[0];
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSnake();
  drawFood();
  moveSnake();
  drawScore();

  if (checkCollision()) {
    alert('Game Over! Your score is: ' + score);
    snake = [
      { x: 10 * blockSize, y: 10 * blockSize }
    ];
    direction = 'right';
    score = 0;
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
  }
});

gameLoop();