  const createEllipse = (context, mousePos, initialPos) => {
      
      const radiusX = Math.abs(mousePos.x - initialPos.x)/2
      const radiusY = Math.abs(mousePos.y - initialPos.y)/2
      context.beginPath()
      context.ellipse(initialPos.x, initialPos.y,  radiusX,radiusY,(Math.PI/180),0, Math.PI*2)
      context.stroke()
}


export default createEllipse