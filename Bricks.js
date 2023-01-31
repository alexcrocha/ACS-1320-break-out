// eslint-disable-next-line import/extensions
import Brick from './Brick.js';

function newRGBNumber() {
  return Math.floor(Math.random() * 256);
}

function changeColour() {
  const red = newRGBNumber();
  const green = newRGBNumber();
  const blue = newRGBNumber();
  return `rgb(${red},${green},${blue})`;
}

class Bricks {
  constructor() {
    this.bricks = [];
    this.brickWidth = 50;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.brickRowCount = 4;
    this.brickColumnCount = 7;
    this.activeBricks = 0;

    this.createBricks();
  }

  createBricks() {
    const rowColour = [];
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        rowColour[r] = rowColour[r] === undefined ? changeColour() : rowColour[r];
        this.bricks[c][r] = new Brick(
          0,
          0,
          this.brickWidth,
          this.brickHeight,
          this.brickRowCount - r,
          rowColour[r],
        );
        this.activeBricks += 1;
      }
    }
  }

  collisionDetection(ball, score) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          if (
            ball.x > brick.x
            && ball.x < brick.x + this.brickWidth
            && ball.y > brick.y
            && ball.y < brick.y + this.brickHeight
          ) {
            ball.dy = -ball.dy;
            brick.status = 0;
            this.activeBricks -= 1;
            ball.color = brick.color;
            score.value += brick.points;
            // maxScore += brick.points;
            if (this.activeBricks === 0) {
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        if (this.bricks[c][r].status === 1) {
          let brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          brickX = r % 2 === 0 ? brickX : brickX + this.brickWidth / 4;
          const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          this.bricks[c][r].render(ctx);
        }
      }
    }
  }
}

export default Bricks;
