import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos'

export default function Arrow({canvasRef, contextRef}) {

  const [isDrawing, setIsDrawing] = useState(false)
  const [initialPos, setInitialPos] = useState(null)
  const [arrows, setArrows] = useState([])


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

  useEffect(() => {

     const canvas = canvasRef.current
     const context = contextRef.current
     let arrowObj

     if(!canvas || ! context) return

     const startDrawing = (e) => {
        e.preventDefault()
        setIsDrawing(true)
        const mousePos = getMousePos(canvas, e)
        setInitialPos(mousePos)
      }

      const draw = (e) => {
        if(!isDrawing || !initialPos) return
         
        e.preventDefault()
        context.clearRect(0, 0, canvas.width, canvas.height);
        const mousePos = getMousePos(canvas, e)

        if(arrows.length){
         arrows.forEach(element => createArrow(context, element.mousePos, element.initialPos));
        }
        
        createArrow(context, mousePos, initialPos)
        
        arrowObj = {
          initialPos,
          mousePos
         }
     }

     const finishDrawing = (e) =>{
      e.preventDefault()  
      setArrows(prev=>[...prev, arrowObj])
      setIsDrawing(false)
     }

     // handle mouse event
     canvas.addEventListener("mousedown", startDrawing)
     canvas.addEventListener("mousemove", draw)
     canvas.addEventListener("mouseup", finishDrawing)
      
     // handle touch event
     canvas.addEventListener("touchstart", startDrawing)
     canvas.addEventListener("touchmove", draw, {passive: false})
     canvas.addEventListener("touchend", finishDrawing)


   return () => {
      // mouse event
      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", finishDrawing)
      
      // touch event
      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw, {passive: false})
      canvas.removeEventListener("touchend", finishDrawing)
   }

  }, [canvasRef, contextRef, isDrawing, initialPos,arrows])

  return null
}
