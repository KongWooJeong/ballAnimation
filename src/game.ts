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
  context: CanvasRenderingContext2D;
  secondsPassed: number;
  oldTimeStamp: number;
  gameEntities: GameObject[];

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.secondsPassed = 0;
    this.oldTimeStamp = 0;
    this.gameEntities = [];

    this.init();
  }

  init() {
    this.createWorld();

    window.requestAnimationFrame((timeStamp) => {
      this.gameLoop(timeStamp);
    });
  }

  createWorld() {
    const angle = 113;
    const speed = 200;

    const x = Math.cos(angle) * speed;
    const y = Math.sin(angle) * speed;

    this.gameEntities = [
      new Circle(this.context, 40, 60, x, y, 20, 113),
      new Circle(this.context, 100, 200, x, y, 20, 113),
      new Circle(this.context, 200, 110, x, y, 20, 113),
      new Circle(this.context, 900, 300, x, y, 20, 113),
      new Circle(this.context, 350, 350, x, y, 20, 113),
      new Circle(this.context, 800, 90, x, y, 20, 113),
      new Circle(this.context, 390, 180, x, y, 20, 113),
      new Circle(this.context, 400, 80, x, y, 20, 113),
    ];
  }

  gameLoop(timeStamp: number) {
    this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;

    window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
  }
}

function circleIntersect(x1: number, y1: number, x2: number, y2: number) {
  const squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

  return squareDistance;
}

export { Circle, GameWorld, circleIntersect };
