class GameEntity {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  vx: number;
  vy: number;

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
    speed: number
  ) {
    super(context, x, y, vx, vy);
    this.radius = radius;
    this.speed = speed;
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

class GameWorld {
  context: CanvasRenderingContext2D;
  secondsPassed: number;
  oldTimeStamp: number;
  gameEntities: Circle[];

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.secondsPassed = 0;
    this.oldTimeStamp = 0;
    this.gameEntities = [];
  }

  init() {
    window.requestAnimationFrame((timeStamp) => {
      this.gameLoop(timeStamp);
    });
  }

  createWorld(entities: Circle[]) {
    this.gameEntities = entities;
  }

  gameLoop(timeStamp: number) {
    this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;

    this.wallCollision();
    this.detectCollisions();

    for (let i = 0; i < this.gameEntities.length; i++) {
      this.gameEntities[i].update(this.secondsPassed);
    }

    this.clearCanvas();

    for (let i = 0; i < this.gameEntities.length; i++) {
      this.gameEntities[i].draw();
    }

    window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
  }

  wallCollision() {
    this.gameEntities.forEach((entity) => {
      if (
        entity.x + entity.vx * this.secondsPassed > 1000 - entity.radius ||
        entity.x + entity.vx * this.secondsPassed < entity.radius
      ) {
        entity.vx = -entity.vx;
      }

      if (
        entity.y + entity.vy * this.secondsPassed > 500 - entity.radius ||
        entity.y + entity.vy * this.secondsPassed < entity.radius
      ) {
        entity.vy = -entity.vy;
      }
    });
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

export { Circle, GameWorld, circleIntersect, GameEntity };
