import { Circle, circleIntersect } from "./game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const ball1 = new Circle(ctx, 40, 60, 200, 200, 20);
const ball2 = new Circle(ctx, 100, 200, 200, 200, 20);
const ball3 = new Circle(ctx, 200, 110, 200, 200, 20);
const ball4 = new Circle(ctx, 900, 300, 200, 200, 20);
const ball5 = new Circle(ctx, 350, 350, 200, 200, 20);
const ball6 = new Circle(ctx, 800, 90, 200, 200, 20);
const ball7 = new Circle(ctx, 390, 180, 200, 200, 20);
const ball8 = new Circle(ctx, 400, 80, 200, 200, 20);

const balls = [ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8];

let oldTimeStamp = 0;

function wallCollision(ball: Circle, secondsPassed: number) {
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
}

function detectCollisions(gameObjects: Circle[]) {
  let obj1;
  let obj2;

  for (let i = 0; i < gameObjects.length; i++) {
    obj1 = gameObjects[i];

    for (let j = i + 1; j < gameObjects.length; j++) {
      obj2 = gameObjects[j];
      if (
        circleIntersect(obj1.x, obj1.y, obj2.x, obj2.y) <=
        (obj1.radius + obj2.radius) * (obj1.radius + obj2.radius)
      ) {
        const vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
        const distance = Math.sqrt(
          (obj2.x - obj1.x) * (obj2.x - obj1.x) +
            (obj2.y - obj1.y) * (obj2.y - obj1.y)
        );
        const vCollisionNorm = {
          x: vCollision.x / distance,
          y: vCollision.y / distance,
        };

        obj1.vx = 200 * -vCollisionNorm.x;
        obj1.vy = 200 * -vCollisionNorm.y;
        obj2.vx = 200 * vCollisionNorm.x;
        obj2.vy = 200 * vCollisionNorm.y;
      }
    }
  }
}

function gameLoop(timeStamp: number) {
  const secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  balls.forEach((ball) => {
    ball.update(secondsPassed);
    wallCollision(ball, secondsPassed);
  });

  detectCollisions(balls);
  ball1.clear();

  balls.forEach((ball) => {
    ball.draw();
  });

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
