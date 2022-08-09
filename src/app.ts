import { Circle, circleIntersect } from "./game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const ball1 = new Circle(ctx, 40, 60, 100, 100, 11);
const ball2 = new Circle(ctx, 100, 200, 100, 100, 4);
const ball3 = new Circle(ctx, 200, 110, -100, 100, 2);
const ball4 = new Circle(ctx, 900, 300, 100, 100, 1);
const ball5 = new Circle(ctx, 350, 350, -100, 100, 16);
const ball6 = new Circle(ctx, 800, 90, 100, 100, 5);
const ball7 = new Circle(ctx, 390, 180, 100, 100, 12);
const ball8 = new Circle(ctx, 400, 80, -100, 100, 20);

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

  ball.x += ball.vx * secondsPassed;
  ball.y += ball.vy * secondsPassed;
}

function detectCollisions(gameObjects: Circle[]) {
  let obj1;
  let obj2;

  for (let i = 0; i < gameObjects.length; i++) {
    gameObjects[i].isColliding = false;
  }

  for (let i = 0; i < gameObjects.length; i++) {
    obj1 = gameObjects[i];
    for (let j = i + 1; j < gameObjects.length; j++) {
      obj2 = gameObjects[j];

      console.log("radius", obj1.radius + obj2.radius);

      if (
        circleIntersect(obj1.x, obj1.y, obj2.x, obj2.y) <=
        (obj1.radius + obj2.radius) * (obj1.radius + obj2.radius)
      ) {
        obj1.isColliding = true;
        obj2.isColliding = true;
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
