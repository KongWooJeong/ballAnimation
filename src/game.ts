class GameObject {
  context: CanvasRenderingContext2D;
  angle: number;
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    vx: number,
    vy: number,
    angle: number
  ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.angle = angle;
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
    radius: number,
    angle: number
  ) {
    super(context, x, y, vx, vy, angle);
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

  clear() {
    this.context.clearRect(0, 0, 1000, 500);
  }
}

class GameWorld {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  secondsPassed: number;
  oldTimeStamp: number;
  gameEntities: [];

  constructor(canvasId: string) {
    this.canvas = null;
    this.context = null;
    this.secondsPassed = 0;
    this.oldTimeStamp = 0;
    this.gameEntities = [];

    this.init(canvasId);
  }

  init(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d");
  }
}

function circleIntersect(x1: number, y1: number, x2: number, y2: number) {
  const squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

  return squareDistance;
}

export { Circle, GameWorld, circleIntersect };
