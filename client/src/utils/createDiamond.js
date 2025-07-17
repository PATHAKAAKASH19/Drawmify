  const createDiamond = (context, mousePos, initialPos) => {
      const height = 2*(mousePos.y - initialPos.y)
      const width = 2*(mousePos.x - initialPos.x)
      
      context.beginPath()
      context.lineTo(initialPos.x, initialPos.y - height/2)
      context.lineTo(initialPos.x + width/2, initialPos.y)
      context.lineTo(initialPos.x ,initialPos.y+ height/2)
      context.lineTo(initialPos.x - width/2 ,initialPos.y)
      context.closePath()
      context.stroke()
  }

  export default createDiamond