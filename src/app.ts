import { GameWorld, Circle } from "./game";
import { getRandomIntInclusive } from "../utils/randomNumber";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const circleEntities: Circle[] = [];
const gameWorld = new GameWorld(ctx);

const entityCount = getRandomIntInclusive(10, 20);

const angle = 113;
const speed = 200;

const x = Math.cos(angle) * speed;
const y = Math.sin(angle) * speed;

for (let i = 1; i <= entityCount; i++) {
  const radius = getRandomIntInclusive(10, 20);
  const xPoint = getRandomIntInclusive(1 + radius, 1000 - radius);
  const yPoint = getRandomIntInclusive(1 + radius, 500 - radius);

  circleEntities.push(new Circle(ctx, xPoint, yPoint, x, y, radius, 113));
}

gameWorld.createWorld(circleEntities);
gameWorld.init();
