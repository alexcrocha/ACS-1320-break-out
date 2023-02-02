import Sprite from './Sprite';

class Brick extends Sprite {
  points: number;
  status: number;

  constructor(x: number, y: number, width = 75, height = 20, points = 1, color = '#0095DD') {
    super(x, y, width, height, color);
    this.points = points;
    this.status = 1;
  }
}

export default Brick;
