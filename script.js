const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;
let ballColour = "#0095DD";

function newRGBNumber() {
  return Math.floor(Math.random() * 255)
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
    ballColour = changeColour();
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
    ballColour = changeColour();
  }


  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColour;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;
}

setInterval(draw, 10);
