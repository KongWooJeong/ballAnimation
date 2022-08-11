import { Circle } from "./gameEntity";

interface VectorInfo {
  x: number;
  y: number;
}

class GameWorld {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  secondsPassed: number;
  oldTimeStamp: number;
  gameEntities: Circle[];

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
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
    this.detectEntityCollision();

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

  detectEntityCollision() {
    let baseEntity: Circle;
    let targetEntity: Circle;

    for (let i = 0; i < this.gameEntities.length; i++) {
      baseEntity = this.gameEntities[i];

      for (let j = i + 1; j < this.gameEntities.length; j++) {
        targetEntity = this.gameEntities[j];

        const isCollision: boolean = this.checkCircleIntersect(
          baseEntity,
          targetEntity
        );

        if (isCollision) {
          this.resolveCicleCollision(baseEntity, targetEntity);
        }
      }
    }
  }

  checkCircleIntersect(baseCircle: Circle, targetCircle: Circle) {
    const collisionDistance: number = Math.sqrt(
      (baseCircle.x - targetCircle.x) * (baseCircle.x - targetCircle.x) +
        (baseCircle.y - targetCircle.y) * (baseCircle.y - targetCircle.y)
    );

    return collisionDistance <= baseCircle.radius + targetCircle.radius;
  }

  resolveCicleCollision(baseCircle: Circle, targetCircle: Circle) {
    const collisionVectorInfo: VectorInfo = {
      x: targetCircle.x - baseCircle.x,
      y: targetCircle.y - baseCircle.y,
    };
    const collsisionVectorDistance: number = Math.sqrt(
      (targetCircle.x - baseCircle.x) * (targetCircle.x - baseCircle.x) +
        (targetCircle.y - baseCircle.y) * (targetCircle.y - baseCircle.y)
    );
    const collisionUnitVectorInfo: VectorInfo = {
      x: collisionVectorInfo.x / collsisionVectorDistance,
      y: collisionVectorInfo.y / collsisionVectorDistance,
    };

    baseCircle.vx = baseCircle.speed * -collisionUnitVectorInfo.x;
    baseCircle.vy = baseCircle.speed * -collisionUnitVectorInfo.y;
    targetCircle.vx = targetCircle.speed * collisionUnitVectorInfo.x;
    targetCircle.vy = targetCircle.speed * collisionUnitVectorInfo.y;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default GameWorld;
