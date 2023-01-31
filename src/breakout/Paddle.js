/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Paddle extends Sprite {
  constructor(x, y, width = 75, height = 10, color = '#0095DD') {
    super(x, y, width, height, color);
    this.dx = 7;
  }

  moveRight(canvasWidth) {
    this.x = Math.min(this.x + this.dx, canvasWidth - this.width);
  }

  moveLeft() {
    this.x = Math.max(this.x - this.dx, 0);
  }
}

export default Paddle;
