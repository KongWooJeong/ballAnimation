import { Circle, GameEntity } from "./gameEntity";
import { getPointToPointDistance } from "../../utils/calculate";

interface VectorInfo {
  x: number;
  y: number;
}

class GameWorld {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  deltaSecond: number;
  oldTimeStamp: number;
  gameEntities: GameEntity[];

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.deltaSecond = 0;
    this.oldTimeStamp = 0;
    this.gameEntities = [];
  }

  init(entities: GameEntity[]): void {
    this.updateGameEntites(entities);

    window.requestAnimationFrame((timeStamp) => {
      this.gameLoop(timeStamp);
    });
  }

  updateGameEntites(entities: GameEntity[]): void {
    this.gameEntities = entities;
  }

  gameLoop(timeStamp: number): void {
    this.deltaSecond = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;

    this.detectWallCollision();
    this.detectEntityCollision();

    this.gameEntities.forEach((entity) => {
      entity.update(this.deltaSecond);
    });

    this.clearCanvas();

    this.gameEntities.forEach((entity) => {
      entity.draw();
    });

    window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
  }

  detectWallCollision(): void {
    this.gameEntities.forEach((entity) => {
      if (entity instanceof Circle) {
        const isLeftRightWallCollition: boolean =
          entity.x + entity.dx * this.deltaSecond >
            this.canvas.width - entity.radius ||
          entity.x + entity.dx * this.deltaSecond < entity.radius;
        const isUpDownWallCollision: boolean =
          entity.y + entity.dy * this.deltaSecond >
            this.canvas.height - entity.radius ||
          entity.y + entity.dy * this.deltaSecond < entity.radius;

        if (isUpDownWallCollision || isLeftRightWallCollition) {
          this.resolveWallCollision(
            entity,
            isUpDownWallCollision,
            isLeftRightWallCollition
          );
        }
      }
    });
  }

  detectEntityCollision(): void {
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

  checkCircleIntersect(baseCircle: Circle, targetCircle: Circle): boolean {
    const collisionDistance: number = getPointToPointDistance(
      baseCircle,
      targetCircle
    );

    return collisionDistance <= baseCircle.radius + targetCircle.radius;
  }

  resolveWallCollision(
    entity: GameEntity,
    isUpDownWallCollision: boolean,
    isLeftRightWallCollition: boolean
  ): void {
    if (isUpDownWallCollision) {
      entity.dy = -entity.dy;
    }

    if (isLeftRightWallCollition) {
      entity.dx = -entity.dx;
    }
  }

  resolveCicleAndCircleCollision(
    baseCircle: Circle,
    targetCircle: Circle
  ): void {
    const collisionVectorInfo: VectorInfo = {
      x: targetCircle.x - baseCircle.x,
      y: targetCircle.y - baseCircle.y,
    };
    const collsisionVectorDistance: number = getPointToPointDistance(
      targetCircle,
      baseCircle
    );
    const collisionUnitVectorInfo: VectorInfo = {
      x: collisionVectorInfo.x / collsisionVectorDistance,
      y: collisionVectorInfo.y / collsisionVectorDistance,
    };

    baseCircle.dx = baseCircle.speed * -collisionUnitVectorInfo.x;
    baseCircle.dy = baseCircle.speed * -collisionUnitVectorInfo.y;
    targetCircle.dx = targetCircle.speed * collisionUnitVectorInfo.x;
    targetCircle.dy = targetCircle.speed * collisionUnitVectorInfo.y;
  }

  clearCanvas(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default GameWorld;
