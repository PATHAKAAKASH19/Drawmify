
// const createPencil = (context, pointArray) => {

//     context.beginPath()
//     context.moveTo(pointArray[0]?.x, pointArray[0]?.y)

//     let i = 1
//     while(i < pointArray.length){
//         context.lineTo(pointArray[i].x, pointArray[i].y)
//         i++
//     }
//     context.stroke()
    
// }



import {getStroke} from "perfect-freehand"
import getSvgPathFromStroke from './getSvgPathFromStroke';


  const createPencil = (newPoints, context) => {
       
        const outlinePoints = getStroke(newPoints, {
          size: 10,
          thinning: 0.65,
          smoothing: 0.99,
          streamline: 0.89,
          simulatePressure: true,
            start: {
            cap: true,
            taper: 0,
            easing: (t) => t,
          },
            end: {
            cap: true,
            taper: 50,
            easing: (t) => t,
          },
        })

        const pathData = getSvgPathFromStroke(outlinePoints)
        let myPath = new Path2D(pathData)
        context.fillStyle = "red";
        context.fill(myPath)
  }
  



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

  export {isPointInPencil, createPencil}
