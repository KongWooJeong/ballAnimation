/**
 * @jest-environment jsdom
 */

import "jest-canvas-mock";
import { Circle } from "../game/gameEntity";

interface CircleInfo {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  speed: number;
  fillStyle: string;
}

describe("Circle Entity", () => {
  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  let circleInfo: CircleInfo;
  let circle: Circle;

  beforeEach(function () {
    canvas = document.createElement("canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d") as CanvasRenderingContext2D;

    circleInfo = {
      x: 10,
      y: 10,
      dx: 100,
      dy: 100,
      radius: 10,
      speed: 200,
      fillStyle: "#0099b0",
    };
    circle = new Circle(
      context,
      circleInfo.x,
      circleInfo.y,
      circleInfo.dx,
      circleInfo.dy,
      circleInfo.radius,
      circleInfo.speed,
      circleInfo.fillStyle
    );
  });

  test("Check Circle Entity constructor", () => {
    expect(circle.x).toBe(circleInfo.x);
    expect(circle.y).toBe(circleInfo.y);
    expect(circle.dx).toBe(circleInfo.dx);
    expect(circle.dy).toBe(circleInfo.dy);
    expect(circle.radius).toBe(circleInfo.radius);
    expect(circle.speed).toBe(circleInfo.speed);
  });

  test("Check Circle Entity draw method", () => {
    circle.draw();

    const path = context.__getPath();
    expect(path).toMatchSnapshot();
  });

  test("Check Circle Entity update method", () => {
    const deltaTime = 0.1;

    circle.update(deltaTime);

    expect(circle.x).toBe(circleInfo.x + circleInfo.dx * deltaTime);
    expect(circle.y).toBe(circleInfo.y + circleInfo.dy * deltaTime);
  });
});
