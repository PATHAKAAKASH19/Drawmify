  const createDiamond = (context, mousePos, initialPos) => {
      const height = 2*(mousePos?.y - initialPos?.y)
      const width = 2*(mousePos?.x - initialPos?.x)
      
      context.beginPath()
      context.lineTo(initialPos?.x, initialPos?.y - height/2)
      context.lineTo(initialPos?.x + width/2, initialPos?.y)
      context.lineTo(initialPos?.x ,initialPos?.y+ height/2)
      context.lineTo(initialPos?.x - width/2 ,initialPos?.y)
      context.closePath()
      context.stroke()
  }

  const isPointInDiamond = (x, y, initialPos, mousePos) => {

      const centerX = initialPos?.x 
      const centerY = initialPos?.y 
      const width = Math.abs(2*(mousePos?.x - initialPos?.x));
      const height = Math.abs(2 * (mousePos?.y - initialPos?.y));
                
      // Normalize coordinates to diamond's center
      const dx = Math.abs(x - centerX);
      const dy = Math.abs(y - centerY);
                
      // Check if point is inside the diamond using the diamond inequality
      return (dx / (width/2) + dy / (height/2)) <= 1.05;
}
  

  export  {createDiamond, isPointInDiamond}