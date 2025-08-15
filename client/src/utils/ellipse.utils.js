  const createEllipse = (context, mousePos, initialPos) => {
      
      const radiusX = Math.abs(mousePos?.x - initialPos?.x)/2
      const radiusY = Math.abs(mousePos?.y - initialPos?.y)/2
      context.beginPath()
      context.ellipse(initialPos?.x, initialPos?.y,  radiusX,radiusY,(Math.PI/180),0, Math.PI*2)
      context.stroke()
}


 const isPointInEllipse = (x, y, initialPos, mousePos) => {
    const h = (initialPos?.x + mousePos?.x) / 2; // Center X
    const k = (initialPos?.y + mousePos?.y) / 2; // Center Y
    const a = Math.abs(mousePos?.x - initialPos?.x) /2; // Semi-major axis (width)
    const b = Math.abs(mousePos?.y - initialPos?.y) /2; // Semi-minor axis (height)

    // Check if the point (x, y) is inside the ellipse
    const normalizedX = (x - h) / a;
    const normalizedY = (y - k) / b;
   
  
    return normalizedX * normalizedX + normalizedY * normalizedY <=1;
  }


export  {createEllipse, isPointInEllipse}