  const createArrow = (context, mousePos, initialPos) => {
        context.beginPath()
        context.moveTo(initialPos.x, initialPos.y)
        context.lineTo(mousePos.x, mousePos.y)
        context.stroke()

        const angle = Math.atan2(mousePos.y - initialPos.y, mousePos.x - initialPos.x);
        const headLength = 10;
    
        context.beginPath();
        context.moveTo(mousePos.x, mousePos.y);
        context.lineTo(
           mousePos.x - headLength * Math.cos(angle - Math.PI / 6),
           mousePos.y - headLength * Math.sin(angle - Math.PI / 6)
        );
        context.lineTo(
           mousePos.x -headLength * Math.cos(angle + Math.PI / 6),
           mousePos.y - headLength * Math.sin(angle + Math.PI / 6)
        );
        context.closePath()
        context.stroke()
  }

export default createArrow