import Sprite from './Sprite';

class Paddle extends Sprite {
  x: number;
  width: number;
  dx: number;

  constructor(x: number, y: number, width = 75, height = 10, color = '#0095DD') {
    super(x, y, width, height, color);
    this.dx = 7;
  }

  moveRight(canvasWidth: number) {
    this.x = Math.min(this.x + this.dx, canvasWidth - this.width);
  }

  moveLeft() {
    this.x = Math.max(this.x - this.dx, 0);
  }
}

export default Paddle;
