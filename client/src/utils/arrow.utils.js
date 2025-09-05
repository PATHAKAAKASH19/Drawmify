  const createArrow = (context, mousePos, initialPos) => {
        context.beginPath()
        context.moveTo(initialPos?.x, initialPos?.y)
        context.lineTo(mousePos?.x, mousePos?.y)
        context.stroke()

        const angle = Math.atan2(mousePos?.y - initialPos?.y, mousePos?.x - initialPos?.x);
        const headLength = 10;
    
        context.beginPath();
        context.moveTo(mousePos?.x, mousePos?.y);
        context.lineTo(
           mousePos?.x - headLength * Math.cos(angle - Math.PI / 6),
           mousePos?.y - headLength * Math.sin(angle - Math.PI / 6)
        );
        context.lineTo(
           mousePos?.x -headLength * Math.cos(angle + Math.PI / 6),
           mousePos?.y - headLength * Math.sin(angle + Math.PI / 6)
        );
        context.closePath()
        context.stroke()
  }


  const isPointInArrow = (x, y, initialPos, mousePos) => {
    
    if (!initialPos || !mousePos) return false;
    
    const angle = Math.atan2(mousePos.y - initialPos.y, mousePos.x - initialPos.x);
    const headLength = 10;
    
    // Calculate the three points of the arrowhead
    const arrowTip = { x: mousePos.x, y: mousePos.y };
    const arrowLeft = {
        x: mousePos.x - headLength * Math.cos(angle - Math.PI / 6),
        y: mousePos.y - headLength * Math.sin(angle - Math.PI / 6)
    };
    const arrowRight = {
        x: mousePos.x - headLength * Math.cos(angle + Math.PI / 6),
        y: mousePos.y - headLength * Math.sin(angle + Math.PI / 6)
    };
    
    // Check if point is in the arrowhead (triangle)
    const isInArrowhead = isPointInTriangle(x, y, arrowTip, arrowLeft, arrowRight);
    
    // Check if point is on the arrow line (with some tolerance)
    const isOnLine = isPointOnLine(x, y, initialPos, mousePos, 5);
    
    return isInArrowhead || isOnLine;
};

// Helper function to check if point is inside a triangle
const isPointInTriangle = (px, py, p1, p2, p3) => {
    // Calculate barycentric coordinates
    const denominator = ((p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y));
    if (denominator === 0) return false;
    
    const a = ((p2.y - p3.y) * (px - p3.x) + (p3.x - p2.x) * (py - p3.y)) / denominator;
    const b = ((p3.y - p1.y) * (px - p3.x) + (p1.x - p3.x) * (py - p3.y)) / denominator;
    const c = 1 - a - b;
    
    // Check if point is inside the triangle
    return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1;
};

// Helper function to check if point is on a line segment
const isPointOnLine = (px, py, lineStart, lineEnd, tolerance) => {
    // Calculate distance from point to line
    const lineLength = Math.sqrt(
        Math.pow(lineEnd.x - lineStart.x, 2) + 
        Math.pow(lineEnd.y - lineStart.y, 2)
    );
    
    if (lineLength === 0) return false;
    
    // Calculate the distance
    const distance = Math.abs(
        (lineEnd.y - lineStart.y) * px - 
        (lineEnd.x - lineStart.x) * py + 
        lineEnd.x * lineStart.y - 
        lineEnd.y * lineStart.x
    ) / lineLength;
    
    // Check if distance is within tolerance and point is between endpoints
    if (distance > tolerance) return false;
    
    // Check if point is within the line segment bounds
    const dotProduct = (
        (px - lineStart.x) * (lineEnd.x - lineStart.x) + 
        (py - lineStart.y) * (lineEnd.y - lineStart.y)
    );
    
    return dotProduct >= 0 && dotProduct <= lineLength * lineLength;
};


export  {createArrow, isPointInArrow}