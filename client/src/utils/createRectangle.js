 const createRectangle = (context,mousePos, initialPos) => {
    const width = mousePos.x - initialPos.x
      const height = mousePos.y - initialPos.y

      context.beginPath()
      context.rect(initialPos.x, initialPos.y, width, height);
      context.stroke()
  }

export default createRectangle