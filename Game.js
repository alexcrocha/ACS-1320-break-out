/* eslint-disable import/extensions */
import Ball from './Ball.js';
import Bricks from './Bricks.js';
import Paddle from './Paddle.js';
import GameLabel from './GameLabel.js';

class Game {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.ball = new Ball(
      canvas.width / 2,
      canvas.height - 30,
      10,
      '#0095DD',
    );

    this.paddle = new Paddle(
      (canvas.width - 75) / 2,
      canvas.height - 10,
      75,
      10,
      '#0095DD',
    );

    this.allBricks = new Bricks();

    this.scoreLabel = new GameLabel('Score: ', 8, 20, '#0095DD');
    this.livesLabel = new GameLabel('Lives: ', canvas.width - 65, 20, '#0095DD', 3);

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();
    this.draw();
  }

  setup() {
    document.addEventListener('keydown', (e) => this.keyDownHandler(e), false);
    document.addEventListener('keyup', (e) => this.keyUpHandler(e), false);
    document.addEventListener('mousemove', (e) => this.mouseMoveHandler(e), false);
  }

  collisionDetection() {
    for (let c = 0; c < this.allBricks.brickColumnCount; c += 1) {
      for (let r = 0; r < this.allBricks.brickRowCount; r += 1) {
        const brick = this.allBricks.bricks[c][r];
        if (brick.status === 1) {
          if (
            this.ball.x > brick.x
            && this.ball.x < brick.x + this.allBricks.brickWidth
            && this.ball.y > brick.y
            && this.ball.y < brick.y + this.allBricks.brickHeight
          ) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            this.allBricks.activeBricks -= 1;
            this.ball.color = brick.color;
            this.scoreLabel.value += brick.points;
            if (this.allBricks.activeBricks === 0) {
              alert(`YOU WIN, CONGRATULATIONS! You scored: ${this.scoreLabel.value}`);
              document.location.reload();
            }
          }
        }
      }
    }
  }

  movePaddle() {
    if (this.rightPressed) {
      this.paddle.moveRight(this.canvas.width);
    } else if (this.leftPressed) {
      this.paddle.moveLeft();
    }
  }

  drawBackground() {
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2,
      (this.canvas.height / 4) * 3,
      0,
      this.canvas.width / 2,
      (this.canvas.height / 4) * 3,
      this.canvas.width / 16,
    );
    gradient.addColorStop(0, this.ball.color);
    gradient.addColorStop(0.2, 'white');
    gradient.addColorStop(0.4, this.ball.color);
    gradient.addColorStop(0.6, 'white');
    gradient.addColorStop(0.8, this.ball.color);
    gradient.addColorStop(1, '#f1f1f1');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > this.paddle.width / 2
      && relativeX < this.canvas.width - this.paddle.width / 2) {
      this.paddle.x = relativeX - this.paddle.width / 2;
    }
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'd') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft' || e.key === 'a') {
      this.leftPressed = false;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.ball.render(
      this.ctx,
      this.canvas.width,
      this.canvas.height,
      this.paddle,
      this.livesLabel,
      this.scoreLabel,
    );
    this.ball.move();
    this.movePaddle();
    this.paddle.render(this.ctx);
    this.allBricks.render(this.ctx);
    this.collisionDetection();
    this.scoreLabel.render(this.ctx);
    this.livesLabel.render(this.ctx);
    requestAnimationFrame(() => this.draw());
  }
}

export default Game;
