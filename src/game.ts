class GameObject {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isColliding: boolean;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    vx: number,
    vy: number
  ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this.isColliding = false;
  }
}

class Circle extends GameObject {
  radius: number;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    vx: number,
    vy: number,
    radius: number
  ) {
    super(context, x, y, vx, vy);
    this.radius = radius;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = "black";
    this.context.fill();
    this.context.closePath();
  }

  update(secondsPassed: number) {
    this.x += this.vx * secondsPassed;
    this.y += this.vy * secondsPassed;
  }

  clear() {
    this.context.clearRect(0, 0, 1000, 500);
  }
}

export { Circle };
