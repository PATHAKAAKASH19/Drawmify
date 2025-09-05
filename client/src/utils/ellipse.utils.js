  const createEllipse = (context, mousePos, initialPos) => {
      
      const radiusX = Math.abs(mousePos?.x - initialPos?.x)/2
      const radiusY = Math.abs(mousePos?.y - initialPos?.y)/2
      context.beginPath()
      context.ellipse(initialPos?.x, initialPos?.y,  radiusX,radiusY,(Math.PI/180),0, Math.PI*2)
      context.stroke()
}


 const isPointInEllipse = (x, y, initialPos, mousePos) => {
  
    const h = initialPos?.x ; // Center X
    const k = initialPos?.y ; // Center Y
    const a = Math.abs(mousePos?.x - initialPos?.x)/2 ; // Semi-major axis (width)
    const b = Math.abs(mousePos?.y - initialPos?.y)/2 // Semi-minor axis (height)
 
    
    if (a === 0 || b === 0) return false;
    const distance =
    Math.pow((x - h) / a, 2) + Math.pow((y - k) / b, 2);
            
    return distance <=1
  
  }


export  {createEllipse, isPointInEllipse}