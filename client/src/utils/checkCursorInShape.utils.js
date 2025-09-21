const isPointInRectangle = (x, y, initialPos, mousePos) => {
  const left = Math.min(initialPos?.x, mousePos?.x);
  const right = Math.max(initialPos?.x, mousePos?.x);
  const top = Math.min(initialPos?.y, mousePos?.y);
  const bottom = Math.max(initialPos?.y, mousePos?.y);

  return x >= left && x <= right && y >= top && y <= bottom;
};

const isPointInPencil = (x, y, points, tolerance = 20) => {
  if (!points || points.length < 2) return false;

  const tolSq = tolerance * tolerance;

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    // Quick bounding-box check (cheap rejection)
    if (
      x < Math.min(p1.x, p2.x) - tolerance ||
      x > Math.max(p1.x, p2.x) + tolerance ||
      y < Math.min(p1.y, p2.y) - tolerance ||
      y > Math.max(p1.y, p2.y) + tolerance
    ) {
      continue;
    }

    // Distance from point to line segment
    if (pointToSegmentDistanceSq(x, y, p1, p2) <= tolSq) {
      return true;
    }
  }

  return false;
};

// Helper: squared distance from point to line segment
const pointToSegmentDistanceSq = (x, y, p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  if (dx === 0 && dy === 0) {
    // Segment is a point
    const dpx = x - p1.x;
    const dpy = y - p1.y;
    return dpx * dpx + dpy * dpy;
  }

  // Project point onto line [p1, p2], clamped to segment
  const t = Math.max(
    0,
    Math.min(1, ((x - p1.x) * dx + (y - p1.y) * dy) / (dx * dx + dy * dy))
  );

  const projX = p1.x + t * dx;
  const projY = p1.y + t * dy;

  const dpx = x - projX;
  const dpy = y - projY;
  return dpx * dpx + dpy * dpy;
};

const isPointInLine = (x, y, initialPos, mousePos, tolerance = 5) => {
  if (!initialPos || !mousePos) return false;

  // Calculate the distance from the point to the line
  const lineLength = Math.sqrt(
    Math.pow(mousePos.x - initialPos.x, 2) +
      Math.pow(mousePos.y - initialPos.y, 2)
  );

  // If line has zero length, check if point is near the single point
  if (lineLength === 0) {
    return (
      Math.sqrt(
        Math.pow(x - initialPos.x, 2) + Math.pow(y - initialPos.y, 2)
      ) <= tolerance
    );
  }

  // Calculate the distance from point to the line using the formula for distance from point to line segment
  const distance =
    Math.abs(
      (mousePos.y - initialPos.y) * x -
        (mousePos.x - initialPos.x) * y +
        mousePos.x * initialPos.y -
        mousePos.y * initialPos.x
    ) / lineLength;

  // If distance is greater than tolerance, point is not on the line
  if (distance > tolerance) return false;

  // Check if the point is within the bounds of the line segment (not just the infinite line)
  // Using dot products to check if point is between the endpoints
  const dotProduct1 =
    (x - initialPos.x) * (mousePos.x - initialPos.x) +
    (y - initialPos.y) * (mousePos.y - initialPos.y);

  const dotProduct2 =
    (x - mousePos.x) * (initialPos.x - mousePos.x) +
    (y - mousePos.y) * (initialPos.y - mousePos.y);

  return dotProduct1 >= 0 && dotProduct2 >= 0;
};

const isPointInImage = (x, y, initialPos, mousePos) => {
  const left = Math.min(initialPos?.x, mousePos?.x);
  const right = Math.max(initialPos?.x, mousePos?.x);
  const top = Math.min(initialPos?.y, mousePos?.y);
  const bottom = Math.max(initialPos?.y, mousePos?.y);

  return x >= left && x <= right && y >= top && y <= bottom;
};

const isPointInEllipse = (x, y, initialPos, mousePos) => {
  const h = initialPos?.x; // Center X
  const k = initialPos?.y; // Center Y
  const a = Math.abs(mousePos?.x - initialPos?.x) / 2; // Semi-major axis (width)
  const b = Math.abs(mousePos?.y - initialPos?.y) / 2; // Semi-minor axis (height)

  if (a === 0 || b === 0) return false;
  const distance = Math.pow((x - h) / a, 2) + Math.pow((y - k) / b, 2);

  return distance <= 1;
};

const isPointInDiamond = (x, y, initialPos, mousePos) => {
  const centerX = initialPos?.x;
  const centerY = initialPos?.y;
  const width = Math.abs(2 * (mousePos?.x - initialPos?.x));
  const height = Math.abs(2 * (mousePos?.y - initialPos?.y));

  // Normalize coordinates to diamond's center
  const dx = Math.abs(x - centerX);
  const dy = Math.abs(y - centerY);

  // Check if point is inside the diamond using the diamond inequality
  return dx / (width / 2) + dy / (height / 2) <= 1.05;
};

const isPointInArrow = (x, y, initialPos, mousePos) => {
  if (!initialPos || !mousePos) return false;

  const angle = Math.atan2(
    mousePos.y - initialPos.y,
    mousePos.x - initialPos.x
  );
  const headLength = 10;

  // Calculate the three points of the arrowhead
  const arrowTip = { x: mousePos.x, y: mousePos.y };
  const arrowLeft = {
    x: mousePos.x - headLength * Math.cos(angle - Math.PI / 6),
    y: mousePos.y - headLength * Math.sin(angle - Math.PI / 6),
  };
  const arrowRight = {
    x: mousePos.x - headLength * Math.cos(angle + Math.PI / 6),
    y: mousePos.y - headLength * Math.sin(angle + Math.PI / 6),
  };

  // Check if point is in the arrowhead (triangle)
  const isInArrowhead = isPointInTriangle(
    x,
    y,
    arrowTip,
    arrowLeft,
    arrowRight
  );

  // Check if point is on the arrow line (with some tolerance)
  const isOnLine = isPointOnLine(x, y, initialPos, mousePos, 5);

  return isInArrowhead || isOnLine;
};

// Helper function to check if point is inside a triangle
const isPointInTriangle = (px, py, p1, p2, p3) => {
  // Calculate barycentric coordinates
  const denominator =
    (p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y);
  if (denominator === 0) return false;

  const a =
    ((p2.y - p3.y) * (px - p3.x) + (p3.x - p2.x) * (py - p3.y)) / denominator;
  const b =
    ((p3.y - p1.y) * (px - p3.x) + (p1.x - p3.x) * (py - p3.y)) / denominator;
  const c = 1 - a - b;

  // Check if point is inside the triangle
  return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1;
};

// Helper function to check if point is on a line segment
const isPointOnLine = (px, py, lineStart, lineEnd, tolerance) => {
  // Calculate distance from point to line
  const lineLength = Math.sqrt(
    Math.pow(lineEnd.x - lineStart.x, 2) + Math.pow(lineEnd.y - lineStart.y, 2)
  );

  if (lineLength === 0) return false;

  // Calculate the distance
  const distance =
    Math.abs(
      (lineEnd.y - lineStart.y) * px -
        (lineEnd.x - lineStart.x) * py +
        lineEnd.x * lineStart.y -
        lineEnd.y * lineStart.x
    ) / lineLength;

  // Check if distance is within tolerance and point is between endpoints
  if (distance > tolerance) return false;

  // Check if point is within the line segment bounds
  const dotProduct =
    (px - lineStart.x) * (lineEnd.x - lineStart.x) +
    (py - lineStart.y) * (lineEnd.y - lineStart.y);

  return dotProduct >= 0 && dotProduct <= lineLength * lineLength;
};

const isPointInText = (x, y, initialPos) => {};

export {
  isPointInArrow,
  isPointInDiamond,
  isPointInEllipse,
  isPointInLine,
  isPointInPencil,
  isPointInRectangle,
  isPointInImage,
  isPointInText,
};
