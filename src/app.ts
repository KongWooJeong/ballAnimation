import GameWorld from "./game/gameWorld";
import { Circle } from "./game/gameEntity";
import { getRandomIntInclusive } from "../utils/randomNumber";

const $canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = $canvas.getContext("2d") as CanvasRenderingContext2D;

const gameWorld: GameWorld = new GameWorld($canvas, context);
const entityQuantity: number = getRandomIntInclusive(10, 20);

function createRandomCircles(
  quantity: number,
  canvasWidth: number,
  canvasHeight: number,
  radiusRanges: number[],
  angleRanges: number[],
  speedRanges: number[]
): Circle[] {
  const circles: Circle[] = [];

  const [minRadius, maxRadius] = radiusRanges;
  const [minAngle, maxAngle] = angleRanges;
  const [minSpeed, maxSpeed] = speedRanges;

  for (let i = 1; i <= quantity; i++) {
    const radius: number = getRandomIntInclusive(minRadius, maxRadius);
    const pointX: number = getRandomIntInclusive(
      0 + radius,
      canvasWidth - radius
    );
    const pointY: number = getRandomIntInclusive(
      0 + radius,
      canvasHeight - radius
    );
    const angle: number = getRandomIntInclusive(minAngle, maxAngle);
    const speed: number = getRandomIntInclusive(minSpeed, maxSpeed);
    const directionX: number = Math.cos(angle) * speed;
    const directionY: number = Math.sin(angle) * speed;

    const circle = new Circle(
      context,
      pointX,
      pointY,
      directionX,
      directionY,
      radius,
      speed
    );

    circles.push(circle);
  }

  return circles;
}

const balls: Circle[] = createRandomCircles(
  entityQuantity,
  $canvas.width,
  $canvas.height,
  [10, 20],
  [0, 360],
  [200, 400]
);

gameWorld.init(balls);
