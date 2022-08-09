import { Circle } from "./game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const ball = new Circle(ctx, 40, 60, 100, 100, 10);

let oldTimeStamp = 0;

function wallCollision(secondsPassed: number) {
  if (
    ball.x + ball.vx * secondsPassed > canvas.width - 10 ||
    ball.x + ball.vx * secondsPassed < 10
  ) {
    ball.vx = -ball.vx;
  }

  if (
    ball.y + ball.vy * secondsPassed > canvas.height - 10 ||
    ball.y + ball.vy * secondsPassed < 10
  ) {
    ball.vy = -ball.vy;
  }

  ball.x += ball.vx * secondsPassed;
  ball.y += ball.vy * secondsPassed;
}

function gameLoop(timeStamp: number) {
  const secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  ball.update(secondsPassed);
  wallCollision(secondsPassed);
  ball.clear();
  ball.draw();

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
