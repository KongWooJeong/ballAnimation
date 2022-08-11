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
    this.gameEntities = [...entities];
  }

  gameLoop(timeStamp: number) {
    this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;

    this.detectWallCollision();
    this.detectEntityCollisions();

    for (let i = 0; i < this.gameEntities.length; i++) {
      this.gameEntities[i].update(this.secondsPassed);
    }

    this.clearCanvas();

    for (let i = 0; i < this.gameEntities.length; i++) {
      this.gameEntities[i].draw();
    }

    window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
  }

  detectWallCollision() {
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

  detectEntityCollisions() {
    let baseCircle;
    let targetCircle;

    for (let i = 0; i < this.gameEntities.length; i++) {
      baseCircle = this.gameEntities[i];

      for (let j = i + 1; j < this.gameEntities.length; j++) {
        targetCircle = this.gameEntities[j];

        if (this.circleIntersect(baseCircle, targetCircle)) {
          this.resolveCicleCollision(baseCircle, targetCircle);
        }
      }
    }
  }

  circleIntersect(baseCircle: Circle, targetCircle: Circle) {
    const collisionDistance =
      (baseCircle.x - targetCircle.x) * (baseCircle.x - targetCircle.x) +
      (baseCircle.y - targetCircle.y) * (baseCircle.y - targetCircle.y);
    const isCollision =
      collisionDistance <=
      (baseCircle.radius + targetCircle.radius) *
        (baseCircle.radius + targetCircle.radius);

    return isCollision;
  }

  resolveCicleCollision(baseCircle: Circle, targetCircle: Circle) {
    const collisionVectorInfo = {
      x: targetCircle.x - baseCircle.x,
      y: targetCircle.y - baseCircle.y,
    };

    const collsitionVectorDistance = Math.sqrt(
      (targetCircle.x - baseCircle.x) * (targetCircle.x - baseCircle.x) +
        (targetCircle.y - baseCircle.y) * (targetCircle.y - baseCircle.y)
    );

    const collisionUnitVectorInfo = {
      x: collisionVectorInfo.x / collsitionVectorDistance,
      y: collisionVectorInfo.y / collsitionVectorDistance,
    };

    baseCircle.vx = baseCircle.speed * -collisionUnitVectorInfo.x;
    baseCircle.vy = baseCircle.speed * -collisionUnitVectorInfo.y;
    targetCircle.vx = targetCircle.speed * collisionUnitVectorInfo.x;
    targetCircle.vy = targetCircle.speed * collisionUnitVectorInfo.y;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, 1000, 500);
  }
}

export { Circle, GameWorld, GameEntity };
