// eslint-disable-next-line import/extensions
import Sprite from './Sprite.js';

class Ball extends Sprite {
  constructor(x = 0, y = 0, radius = 10, color = '#0095DD') {
    super(x, y, 0, 0, color);
    this.radius = radius;
    this.dx = 2;
    this.dy = -2;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx, canvasWidth, canvasHeight, paddle, lives, score) { // Overrides
    if (this.x + this.dx > canvasWidth - this.radius || this.x + this.dx < this.radius) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy < this.radius) {
      this.dy = -this.dy;
    } else if (this.y + this.dy > canvasHeight - this.radius) {
      if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
        this.dy = -this.dy - 0.5;
      } else if (this.y + this.dy === canvasHeight) {
        lives.value -= 1;
        if (!lives.value) {
          alert(`GAME OVER! Your score is ${score.value}`);
          document.location.reload();
        } else {
          this.x = canvasWidth / 2;
          this.y = canvasHeight - 30;
          this.dx = 2;
          this.dy = -2;
          paddle.x = (canvasWidth - paddle.width) / 2;
        }
      }
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
