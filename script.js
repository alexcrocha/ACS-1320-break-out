const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 4;
const brickColumnCount = 7;
const brickWidth = 50;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballColour = "#0095DD";
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let maxScore = 0;
let lives = 3;

const bricks = [];
const rowColour = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    rowColour[r] == undefined ? rowColour[r] = changeColour() : rowColour[r];
    bricks[c][r] = { x: 0, y: 0, status: 1, points: brickRowCount - r, colour: rowColour[r] };
    maxScore += bricks[c][r].points;
  }
}

function newRGBNumber() {
  return Math.floor(Math.random() * 256)
}

function changeColour() {
  const red = newRGBNumber()
  const green = newRGBNumber()
  const blue = newRGBNumber()
  return `rgb(${red},${green},${blue})`
}

function drawBall() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius - paddleHeight) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      dx = dx + 1;
      dy = dy - 1;
    } else if (y + dy > canvas.height - ballRadius) {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColour;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        brickX = r % 2 == 0 ? brickX : brickX + brickWidth / 4;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = bricks[c][r].colour;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBackground() {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 4 * 3,
    0,
    canvas.width / 2,
    canvas.height / 4 * 3,
    canvas.width / 16
  );
  gradient.addColorStop(0, ballColour);
  gradient.addColorStop(0.2, "white");
  gradient.addColorStop(0.4, ballColour);
  gradient.addColorStop(0.6, "white");
  gradient.addColorStop(.8, ballColour);
  gradient.addColorStop(1, '#f1f1f1');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawBall();
  x += dx;
  y += dy;
  if (rightPressed) {
    paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 7, 0);
  }
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();
  drawLives();
  requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score += b.points;
          ballColour = b.colour;
          if (score === maxScore) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

draw();
