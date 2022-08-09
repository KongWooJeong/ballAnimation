import { Circle } from "./game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const ball = new Circle(ctx, 40, 60, 10, 10, 10);

function gameLoop() {
  ball.update();
  ball.clear();
  ball.draw();

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
