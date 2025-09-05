  const createLine = (context, mousePos, initialPos) => {
      context.beginPath()
      context.moveTo(initialPos?.x, initialPos?.y )
      context.lineTo(mousePos?.x,mousePos?.y)
      context.stroke()
  }

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
            Math.sqrt(Math.pow(x - initialPos.x, 2) + Math.pow(y - initialPos.y, 2)) <= tolerance
        );
    }
    
    // Calculate the distance from point to the line using the formula for distance from point to line segment
    const distance = Math.abs(
        (mousePos.y - initialPos.y) * x - 
        (mousePos.x - initialPos.x) * y + 
        mousePos.x * initialPos.y - 
        mousePos.y * initialPos.x
    ) / lineLength;
    
    // If distance is greater than tolerance, point is not on the line
    if (distance > tolerance) return false;
    
    // Check if the point is within the bounds of the line segment (not just the infinite line)
    // Using dot products to check if point is between the endpoints
    const dotProduct1 = (
        (x - initialPos.x) * (mousePos.x - initialPos.x) + 
        (y - initialPos.y) * (mousePos.y - initialPos.y)
    );
    
    const dotProduct2 = (
        (x - mousePos.x) * (initialPos.x - mousePos.x) + 
        (y - mousePos.y) * (initialPos.y - mousePos.y)
    );
    
    return dotProduct1 >= 0 && dotProduct2 >= 0;
};
export {createLine, isPointInLine}