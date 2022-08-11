/**
 * @jest-environment jsdom
 */

import "jest-canvas-mock";
import { Circle } from "../game/gameEntity";
import GameWorld from "../game/gameWorld";

interface CircleInfo {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  speed: number;
}

describe("GameWorld test", () => {
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  let baseCircleInfo: CircleInfo;
  let targetCircleInfo: CircleInfo;
  let baseCircle: Circle;
  let targetCircle: Circle;
  let gameWorld: GameWorld;

  beforeEach(function () {
    canvas = document.createElement("canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = 300;
    canvas.height = 300;

    gameWorld = new GameWorld(canvas, context);

    baseCircleInfo = {
      x: 10,
      y: 10,
      dx: 100,
      dy: 100,
      radius: 10,
      speed: 200,
    };
    targetCircleInfo = {
      x: 20,
      y: 20,
      dx: 10,
      dy: 10,
      radius: 10,
      speed: 200,
    };
    baseCircle = new Circle(
      context,
      baseCircleInfo.x,
      baseCircleInfo.y,
      baseCircleInfo.dx,
      baseCircleInfo.dy,
      baseCircleInfo.radius,
      baseCircleInfo.speed
    );
    targetCircle = new Circle(
      context,
      targetCircleInfo.x,
      targetCircleInfo.y,
      targetCircleInfo.dx,
      targetCircleInfo.dy,
      targetCircleInfo.radius,
      targetCircleInfo.speed
    );
  });

  test("check GameWorld constructor", () => {
    expect(gameWorld.canvas).toBe(canvas);
    expect(gameWorld.context).toBe(context);
    expect(gameWorld.secondsPassed).toBe(0);
    expect(gameWorld.oldTimeStamp).toBe(0);
    expect(gameWorld.gameEntities.length).toBe(0);
  });

  test("check GameWorld init method", () => {
    const spyFn = jest.spyOn(window, "requestAnimationFrame");

    gameWorld.init([baseCircle]);

    expect(spyFn).toBeCalledTimes(1);
    expect(gameWorld.gameEntities.length).toBe(1);
  });

  test("check detected collision wall and circle entity", () => {
    baseCircleInfo = {
      x: 200,
      y: 10,
      dx: 100,
      dy: 100,
      radius: 10,
      speed: 200,
    };

    baseCircle = new Circle(
      context,
      baseCircleInfo.x,
      baseCircleInfo.y,
      baseCircleInfo.dx,
      baseCircleInfo.dy,
      baseCircleInfo.radius,
      baseCircleInfo.speed
    );

    const mockresolveWallCollision = jest.fn();
    gameWorld.resolveWallCollision = mockresolveWallCollision;
    gameWorld.secondsPassed = 1;

    gameWorld.init([baseCircle]);
    gameWorld.detectWallCollision();

    expect(mockresolveWallCollision).toBeCalledTimes(1);
  });

  test("check detected collision entity", () => {
    const mockResolveCicleAndCircleCollision = jest.fn();
    const mockCheckCircleIntersect = jest.fn();

    gameWorld.resolveCicleAndCircleCollision =
      mockResolveCicleAndCircleCollision;
    gameWorld.checkCircleIntersect = mockCheckCircleIntersect;
    gameWorld.secondsPassed = 1;

    gameWorld.init([baseCircle, targetCircle]);
    gameWorld.detectEntityCollision();

    expect(mockCheckCircleIntersect).toBeCalledTimes(1);
  });

  test("check circle intersect", () => {
    const isCircleIntersect = gameWorld.checkCircleIntersect(
      baseCircle,
      targetCircle
    );

    expect(isCircleIntersect).toBeTruthy();
  });

  test("check resolveWallCollision method", () => {
    gameWorld.resolveWallCollision(baseCircle, false, false);

    expect(baseCircle.dx).toBe(baseCircleInfo.dx);
    expect(baseCircle.dy).toBe(baseCircleInfo.dy);

    gameWorld.resolveWallCollision(baseCircle, true, false);

    expect(baseCircle.dx).toBe(-baseCircleInfo.dx);

    gameWorld.resolveWallCollision(baseCircle, false, true);

    expect(baseCircle.dy).toBe(-baseCircleInfo.dy);
  });

  test("check resolveCicleAndCircleCollision method", () => {
    gameWorld.resolveCicleAndCircleCollision(baseCircle, targetCircle);

    const collisionVectorInfo = {
      x: targetCircleInfo.x - baseCircleInfo.x,
      y: targetCircleInfo.y - baseCircleInfo.y,
    };
    const collsisionVectorDistance: number = Math.sqrt(
      (targetCircleInfo.x - baseCircleInfo.x) *
        (targetCircleInfo.x - baseCircleInfo.x) +
        (targetCircleInfo.y - baseCircleInfo.y) *
          (targetCircleInfo.y - baseCircleInfo.y)
    );
    const collisionUnitVectorInfo = {
      x: collisionVectorInfo.x / collsisionVectorDistance,
      y: collisionVectorInfo.y / collsisionVectorDistance,
    };

    expect(baseCircle.dx).toBe(
      baseCircleInfo.speed * -collisionUnitVectorInfo.x
    );
    expect(baseCircle.dy).toBe(
      baseCircleInfo.speed * -collisionUnitVectorInfo.y
    );
    expect(targetCircle.dx).toBe(
      targetCircle.speed * collisionUnitVectorInfo.x
    );
    expect(targetCircle.dy).toBe(
      targetCircle.speed * collisionUnitVectorInfo.y
    );
  });
});
