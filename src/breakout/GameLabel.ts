import Sprite from './Sprite';

class GameLabel extends Sprite {
  value: number;
  text: string;
  font: string;
  color: string;

  constructor(text: string, x: number, y: number, color: string, value = 0, font = '16px Arial') {
    super(x, y, 0, 0, color);
    this.text = text;
    this.value = value;
    this.font = font;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}

export default GameLabel;
