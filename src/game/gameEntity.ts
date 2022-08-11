abstract class GameEntity {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  fillStyle: string;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    dx: number,
    dy: number,
    speed: number,
    fillStyle: string
  ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
    this.fillStyle = fillStyle;
  }

  abstract draw(): void;
  abstract update(deltaSecond: number): void;
}

class Circle extends GameEntity {
  radius: number;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
    speed: number,
    fillStyle: string
  ) {
    super(context, x, y, dx, dy, speed, fillStyle);
    this.radius = radius;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = this.fillStyle;
    this.context.fill();
    this.context.closePath();
  }

  update(deltaSecond: number) {
    this.x += this.dx * deltaSecond;
    this.y += this.dy * deltaSecond;
  }
}

export { Circle, GameEntity };
