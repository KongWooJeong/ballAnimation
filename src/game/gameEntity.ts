abstract class GameEntity {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    dx: number,
    dy: number,
    speed: number
  ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
  }

  abstract draw(): void;
  abstract update(secondsPassed: number): void;
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
    speed: number
  ) {
    super(context, x, y, dx, dy, speed);
    this.radius = radius;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = "#0099b0";
    this.context.fill();
    this.context.closePath();
  }

  update(secondsPassed: number) {
    this.x += this.dx * secondsPassed;
    this.y += this.dy * secondsPassed;
  }
}

export { Circle, GameEntity };
