/**
 * @jest-environment jsdom
 */

import "jest-canvas-mock";
import { Circle } from "../game/gameEntity";

describe("Circle Entity", () => {
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  beforeEach(function () {
    canvas = document.createElement("canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d") as CanvasRenderingContext2D;
  });

  test("Check Circle Entity constructor", () => {
    const circleInfo = {
      x: 10,
      y: 10,
      vx: 100,
      vy: 100,
      radius: 10,
      speed: 200,
    };

    const circle = new Circle(
      context,
      circleInfo.x,
      circleInfo.y,
      circleInfo.vx,
      circleInfo.vy,
      circleInfo.radius,
      circleInfo.speed
    );

    expect(circle.x).toBe(circleInfo.x);
    expect(circle.y).toBe(circleInfo.y);
    expect(circle.vx).toBe(circleInfo.vx);
    expect(circle.vy).toBe(circleInfo.vy);
    expect(circle.radius).toBe(circleInfo.radius);
    expect(circle.speed).toBe(circleInfo.speed);
  });

  test("Check Circle Entity draw method", () => {
    const circleInfo = {
      x: 10,
      y: 10,
      vx: 100,
      vy: 100,
      radius: 10,
      speed: 200,
    };

    const circle = new Circle(
      context,
      circleInfo.x,
      circleInfo.y,
      circleInfo.vx,
      circleInfo.vy,
      circleInfo.radius,
      circleInfo.speed
    );

    circle.draw();

    const path = context.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("Check Circle Entity update method", () => {
    const circleInfo = {
      x: 10,
      y: 10,
      vx: 100,
      vy: 100,
      radius: 10,
      speed: 200,
    };
    const deltaTime = 0.1;

    const circle: Circle = new Circle(
      context,
      circleInfo.x,
      circleInfo.y,
      circleInfo.vx,
      circleInfo.vy,
      circleInfo.radius,
      circleInfo.speed
    );

    circle.update(deltaTime);

    expect(circle.x).toBe(circleInfo.x + circleInfo.vx * deltaTime);
    expect(circle.y).toBe(circleInfo.y + circleInfo.vy * deltaTime);
  });
});
