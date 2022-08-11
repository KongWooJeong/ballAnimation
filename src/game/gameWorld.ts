import { Circle, GameEntity } from "./gameEntity";

interface VectorInfo {
  x: number;
  y: number;
}

class GameWorld {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  secondsPassed: number;
  oldTimeStamp: number;
  gameEntities: GameEntity[];

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.secondsPassed = 0;
    this.oldTimeStamp = 0;
    this.gameEntities = [];
  }

  init(entities: GameEntity[]) {
    this.gameEntities = [...entities];

    window.requestAnimationFrame((timeStamp) => {
      this.gameLoop(timeStamp);
    });
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
      if (entity instanceof Circle) {
        const isUpDownWallCollision: boolean =
          entity.x + entity.vx * this.secondsPassed >
            this.canvas.width - entity.radius ||
          entity.x + entity.vx * this.secondsPassed < entity.radius;
        const isLeftRightWallCollition: boolean =
          entity.y + entity.vy * this.secondsPassed >
            this.canvas.height - entity.radius ||
          entity.y + entity.vy * this.secondsPassed < entity.radius;

        this.resolveCircleAndWallCollision(
          entity,
          isUpDownWallCollision,
          isLeftRightWallCollition
        );
      }
    });
  }

  detectEntityCollision() {
    for (let i = 0; i < this.gameEntities.length; i++) {
      for (let j = i + 1; j < this.gameEntities.length; j++) {
        if (
          this.gameEntities[i] instanceof Circle &&
          this.gameEntities[j] instanceof Circle
        ) {
          const baseEntity = this.gameEntities[i] as Circle;
          const targetEntity = this.gameEntities[j] as Circle;

          const isCollision: boolean = this.checkCircleIntersect(
            baseEntity,
            targetEntity
          );

          if (isCollision) {
            this.resolveCicleAndCircleCollision(baseEntity, targetEntity);
          }
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

  resolveCircleAndWallCollision(
    baseCircle: Circle,
    isUpDownWallCollision: boolean,
    isLeftRightWallCollition: boolean
  ) {
    if (isUpDownWallCollision) {
      baseCircle.vx = -baseCircle.vx;
    }

    if (isLeftRightWallCollition) {
      baseCircle.vy = -baseCircle.vy;
    }
  }

  resolveCicleAndCircleCollision(baseCircle: Circle, targetCircle: Circle) {
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
