/* eslint-disable no-alert */
/* eslint-disable import/extensions */
import Ball from './Ball.js';
import Bricks from './Bricks.js';
import Paddle from './Paddle.js';
import GameLabel from './GameLabel.js';

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.ball = new Ball(
      this.canvas.width / 2,
      this.canvas.height - 30,
      10,
      '#0095DD',
    );
    this.paddle = new Paddle(
      (this.canvas.width - 75) / 2,
      this.canvas.height - 10,
      75,
      10,
      '#0095DD',
    );
    this.allBricks = new Bricks();
    this.scoreLabel = new GameLabel('Score: ', 8, 20, '#0095DD');
    this.livesLabel = new GameLabel('Lives: ', this.canvas.width - 65, 20, '#0095DD', 3);

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

  collisionsWithBricks() {
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
              alert(`YOU WIN, CONGRATULATIONS! Your score is ${this.scoreLabel.value}`);
              document.location.reload();
            }
          }
        }
      }
    }
  }

  collisionsWithCanvasAndPaddle() {
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy - 0.5;
      } else if (this.ball.y + this.ball.dy >= this.canvas.height) {
        this.livesLabel.value -= 1;
        if (this.livesLabel.value < 1) {
          alert(`GAME OVER! Your score is ${this.scoreLabel.value}`);
          document.location.reload();
        } else {
          this.ball.x = this.canvas.width / 2;
          this.ball.y = this.canvas.height - 30;
          this.ball.dx = 2;
          this.ball.dy = -2;
          this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
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
    this.ball.render(this.ctx);
    this.ball.move();
    this.paddle.render(this.ctx);
    this.movePaddle();
    this.collisionsWithBricks();
    this.collisionsWithCanvasAndPaddle();
    this.allBricks.render(this.ctx);
    this.scoreLabel.render(this.ctx);
    this.livesLabel.render(this.ctx);
    requestAnimationFrame(() => this.draw());
  }
}

export default Game;
