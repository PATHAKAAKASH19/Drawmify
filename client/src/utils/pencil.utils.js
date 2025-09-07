
const createPencil = (context, pointArray) => {

    context.beginPath()
    context.moveTo(pointArray[0]?.x, pointArray[0]?.y)

    let i = 1
    while(i < pointArray.length){
        context.lineTo(pointArray[i].x, pointArray[i].y)
        i++
    }
    context.stroke()
    
}



  const isPointInPencil = (x, y, pointArray, tolerance = 5) => {
    if (!pointArray || pointArray.length < 2) return false;
    
    // Check if point is near any line segment in the pencil path
    for (let i = 0; i < pointArray.length - 1; i++) {
        const p1 = pointArray[i];
        const p2 = pointArray[i + 1];
        
        if (isPointNearLine(x, y, p1, p2, tolerance)) {
            return true;
        }
    }
    
    // Also check if point is near the individual points (for very short strokes)
    for (let i = 0; i < pointArray.length; i++) {
        const p = pointArray[i];
        const distance = Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2));
        if (distance <= tolerance) {
            return true;
        }
    }
    
    return false;
};

// Helper function to check if point is near a line segment
const isPointNearLine = (x, y, p1, p2, tolerance) => {
    // Calculate the distance from point to line segment
    const lineLength = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    
    if (lineLength === 0) {
        // Line is actually a point
        return Math.sqrt(Math.pow(x - p1.x, 2) + Math.pow(y - p1.y, 2)) <= tolerance;
    }
    
    // Calculate the distance from point to the line
    const distance = Math.abs(
        (p2.y - p1.y) * x - 
        (p2.x - p1.x) * y + 
        p2.x * p1.y - 
        p2.y * p1.x
    ) / lineLength;
    
    // If distance is greater than tolerance, point is not near the line
    if (distance > tolerance) return false;
    
    // Check if the point is within the bounds of the line segment
    const dot1 = (x - p1.x) * (p2.x - p1.x) + (y - p1.y) * (p2.y - p1.y);
    const dot2 = (x - p2.x) * (p1.x - p2.x) + (y - p2.y) * (p1.y - p2.y);
    
    return dot1 >= 0 && dot2 >= 0;
};

  export {isPointInPencil, createPencil}
