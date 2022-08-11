interface PointInfo {
  x: number;
  y: number;
}

function getPointToPointDistance(
  firstPoint: PointInfo,
  secondPoint: PointInfo
): number {
  const result = Math.sqrt(
    (firstPoint.x - secondPoint.x) * (firstPoint.x - secondPoint.x) +
      (firstPoint.y - secondPoint.y) * (firstPoint.y - secondPoint.y)
  );

  return result;
}

export { getPointToPointDistance };
