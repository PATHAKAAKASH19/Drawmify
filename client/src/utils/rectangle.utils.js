 const createRectangle = (context,mousePos, initialPos, shapeData) => {

     const {x1, y1, x2, y2} = shapeData
      const dx = mousePos?.x - initialPos?.x
      const dy = mousePos?.y - initialPos?.y
     
      const rectX1 = x1 + dx - 20
      const rectY1 = y1 + dy -20
      const rectX2 = x2 + dx +20
      const rectY2 = y2 + dy +20



      context.beginPath()
      context.rect(rectX1 , rectY1 , rectX2 - rectX1, rectY2 - rectY1);
      context.strokeStyle = "blue"
      context.stroke()
  }


 const isPointInRectangle = (x, y, initialPos, mousePos) => {
  
    const left = Math.min(initialPos?.x, mousePos?.x);
    const right = Math.max(initialPos?.x, mousePos?.x);
    const top = Math.min(initialPos?.y, mousePos?.y);
    const bottom = Math.max(initialPos?.y,mousePos?.y);
    
    return x >= left && x <= right && y >= top && y <= bottom;
  };
export {createRectangle, isPointInRectangle}