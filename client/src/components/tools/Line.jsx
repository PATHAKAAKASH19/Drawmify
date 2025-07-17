import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos'

export default function Line({canvasRef, contextRef}) {
  
  const [isDrawing, setIsDrawing] = useState(false)
  const [initialPos, setInitialPos] = useState(null)
  const [lines, setLines] = useState([])


  const createLine = (context, mousePos, initialPos) => {
      context.beginPath()
      context.moveTo(initialPos.x, initialPos.y )
      context.lineTo(mousePos.x,mousePos.y)
      context.stroke()
  }

  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = contextRef.current
    let lineObj

    if(!canvas || !context) return

    const startDrawing = (e) => {
      e.preventDefault()    
      const mousePos = getMousePos(canvas, e)
      setInitialPos(mousePos)
      setIsDrawing(true)
    }

    const draw = (e) => {
      e.preventDefault() 
      if(!isDrawing || !initialPos) return

      const mousePos = getMousePos(canvas, e)
      context.clearRect(0, 0, canvas.width, canvas.height)

      if(lines.length){
        lines.forEach((line) => {
            createLine(context, line.mousePos, line.initialPos)    
        })
      }

      createLine(context, mousePos, initialPos)

      lineObj={
        initialPos,
        mousePos
      }
    }

    const finishDrawing = (e) => {
      e.preventDefault()
      setLines(prev => [...prev, lineObj]) 
      setIsDrawing(false)
    }

    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", finishDrawing)

    canvas.addEventListener("touchstart", startDrawing)
    canvas.addEventListener("touchmove", draw, {passive: false})
    canvas.addEventListener("touchend", finishDrawing)


    return () => {
      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", finishDrawing)

      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw, {passive: false})
      canvas.removeEventListener("touchend", finishDrawing)
    }
  }, [canvasRef, contextRef, isDrawing, initialPos, lines])
  
  return null
}
