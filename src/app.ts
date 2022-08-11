import GameWorld from "./game/gameWorld";
import { Circle } from "./game/gameEntity";

import { getRandomIntInclusive } from "../utils/randomNumber";

const $canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = $canvas.getContext("2d") as CanvasRenderingContext2D;

const balls: Circle[] = [];
const entityCount = getRandomIntInclusive(10, 20);

const gameWorld = new GameWorld($canvas, context);

for (let i = 1; i <= entityCount; i++) {
  const radius = getRandomIntInclusive(10, 20);
  const xPoint = getRandomIntInclusive(0 + radius, 1000 - radius);
  const yPoint = getRandomIntInclusive(0 + radius, 500 - radius);
  const angle = getRandomIntInclusive(0, 360);
  const speed = getRandomIntInclusive(200, 400);
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  balls.push(new Circle(context, xPoint, yPoint, vx, vy, radius, speed));
}

gameWorld.init(balls);
