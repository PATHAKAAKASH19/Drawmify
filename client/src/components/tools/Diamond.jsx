import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos'
import createDiamond from '../../utils/createDiamond'

export default function Diamond({canvasRef, contextRef}) {

  const [isDrawing, setIsDrawing] = useState(false)
  const [initialPos, setInitialPos] = useState(null)
  const [diamonds, setDiamonds] = useState([])



  useEffect(() => {
   
    const canvas = canvasRef.current
    const context = contextRef.current
    let diamondObj
    
    if(!canvas || !context) return

    const startDrawing = (e) => {
      e.preventDefault()  
      const mousePos = getMousePos(canvas, e)
      setInitialPos(mousePos)
      setIsDrawing(true)
    }

    const draw = (e) => {
      
      e.preventDefault()  
      if(!initialPos || !isDrawing) return

      const mousePos = getMousePos(canvas, e)
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      if(diamonds.length){
        diamonds.forEach((diamond) => {
          createDiamond(context, diamond.mousePos, diamond.initialPos)
        })
      }
      createDiamond(context, mousePos, initialPos)

      diamondObj = {
        initialPos,
        mousePos
    }}


    const finishDrawing = (e) => {
      e.preventDefault()  
      setDiamonds(prev => [...prev, diamondObj])
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

  }, [canvasRef, contextRef, isDrawing, initialPos,diamonds])


  return null
}
