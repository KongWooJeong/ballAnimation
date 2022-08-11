import GameWorld from "./game/gameWorld";
import { Circle } from "./game/gameEntity";

import { getRandomIntInclusive } from "../utils/randomNumber";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const circleEntities: Circle[] = [];
const gameWorld = new GameWorld(canvas, ctx);

const entityCount = getRandomIntInclusive(10, 20);

for (let i = 1; i <= entityCount; i++) {
  const radius = getRandomIntInclusive(10, 20);
  const xPoint = getRandomIntInclusive(0 + radius, 1000 - radius);
  const yPoint = getRandomIntInclusive(0 + radius, 500 - radius);
  const angle = getRandomIntInclusive(0, 360);
  const speed = getRandomIntInclusive(200, 400);
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  circleEntities.push(new Circle(ctx, xPoint, yPoint, vx, vy, radius, speed));
}

gameWorld.createWorld(circleEntities);
gameWorld.init();
