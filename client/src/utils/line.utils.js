  const createLine = (context, mousePos, initialPos) => {
      context.beginPath()
      context.moveTo(initialPos?.x, initialPos?.y )
      context.lineTo(mousePos?.x,mousePos?.y)
      context.stroke()
  }

  const isPointInLine = (x, y, initialPos, mousePos) => {

  }


export {createLine, isPointInLine}