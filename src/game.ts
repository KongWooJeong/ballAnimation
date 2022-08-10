class GameEntity {
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

class Circle extends GameEntity {
  radius: number;
  speed: number;

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
    this.speed = 200;
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
  gameEntities: Array<Circle>;

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
      new Circle(this.context, 40, 60, x, y, 11, 113),
      new Circle(this.context, 100, 200, x, y, 12, 113),
      new Circle(this.context, 200, 110, x, y, 13, 113),
      new Circle(this.context, 900, 300, x, y, 14, 113),
      new Circle(this.context, 350, 350, x, y, 15, 113),
      new Circle(this.context, 800, 90, x, y, 16, 113),
      new Circle(this.context, 390, 180, x, y, 17, 113),
      new Circle(this.context, 400, 80, x, y, 18, 113),
      new Circle(this.context, 20, 21, x, y, 19, 113),
      new Circle(this.context, 40, 21, x, y, 20, 113),
      new Circle(this.context, 100, 21, x, y, 19, 113),
      new Circle(this.context, 200, 40, x, y, 18, 113),
      new Circle(this.context, 400, 100, x, y, 17, 113),
      new Circle(this.context, 800, 200, x, y, 15, 113),
      new Circle(this.context, 123, 210, x, y, 14, 113),
      new Circle(this.context, 777, 111, x, y, 13, 113),
      new Circle(this.context, 241, 233, x, y, 12, 113),
      new Circle(this.context, 190, 43, x, y, 11, 113),
    ];
  }

  gameLoop(timeStamp: number) {
    this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;

    for (let i = 0; i < this.gameEntities.length; i++) {
      this.gameEntities[i].update(this.secondsPassed);
      this.wallCollision(this.gameEntities[i], this.secondsPassed);
    }

    this.detectCollisions();
    this.clearCanvas();

    for (let i = 0; i < this.gameEntities.length; i++) {
      this.gameEntities[i].draw();
    }

    window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
  }

  wallCollision(entity: Circle, secondsPassed: number) {
    if (
      entity.x + entity.vx * secondsPassed > 1000 - entity.radius ||
      entity.x + entity.vx * secondsPassed < entity.radius
    ) {
      entity.vx = -entity.vx;
    }

    if (
      entity.y + entity.vy * secondsPassed > 500 - entity.radius ||
      entity.y + entity.vy * secondsPassed < entity.radius
    ) {
      entity.vy = -entity.vy;
    }
  }

  detectCollisions() {
    let entity1;
    let entity2;

    for (let i = 0; i < this.gameEntities.length; i++) {
      entity1 = this.gameEntities[i];

      for (let j = i + 1; j < this.gameEntities.length; j++) {
        entity2 = this.gameEntities[j];

        if (
          circleIntersect(entity1.x, entity1.y, entity2.x, entity2.y) <=
          (entity1.radius + entity2.radius) * (entity1.radius + entity2.radius)
        ) {
          const vCollision = {
            x: entity2.x - entity1.x,
            y: entity2.y - entity1.y,
          };

          const distance = Math.sqrt(
            (entity2.x - entity1.x) * (entity2.x - entity1.x) +
              (entity2.y - entity1.y) * (entity2.y - entity1.y)
          );

          const vCollisionNorm = {
            x: vCollision.x / distance,
            y: vCollision.y / distance,
          };

          entity1.vx = entity1.speed * -vCollisionNorm.x;
          entity1.vy = entity1.speed * -vCollisionNorm.y;
          entity2.vx = entity2.speed * vCollisionNorm.x;
          entity2.vy = entity2.speed * vCollisionNorm.y;
        }
      }
    }
  }

  clearCanvas() {
    this.context.clearRect(0, 0, 1000, 500);
  }
}

function circleIntersect(x1: number, y1: number, x2: number, y2: number) {
  const squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

  return squareDistance;
}

export { Circle, GameWorld, circleIntersect };
