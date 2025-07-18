  const createLine = (context, mousePos, initialPos) => {
      context.beginPath()
      context.moveTo(initialPos?.x, initialPos?.y )
      context.lineTo(mousePos?.x,mousePos?.y)
      context.stroke()
  }


export default createLine