abstract class GameEntity {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    vx: number,
    vy: number,
    speed: number
  ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.speed = speed;
  }

  abstract draw(): void;
  abstract update(deltaTime: number): void;
}

class Circle extends GameEntity {
  radius: number;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    vx: number,
    vy: number,
    radius: number,
    speed: number
  ) {
    super(context, x, y, vx, vy, speed);
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
    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
  }
}

export { Circle, GameEntity };
