import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos.utils';

export default function Pencil({canvasRef, contextRef,isActive}) {
   
  const [isDrawing, setIsDrawing] = useState(false)
  
  useEffect(() => {
   
    const canvas = canvasRef.current;
    const context = contextRef.current;
 
    if (!canvas || !context) return;

    const startDrawing = (e) => {
        e.preventDefault()  
        const mousePos = getMousePos(canvas, e);
        context.beginPath()
        context.moveTo(mousePos.x, mousePos.y)
        setIsDrawing(true)
    }
    
    const finishDrawing = (e) => {
        e.preventDefault()  
        setIsDrawing(false)
        context.closePath()
    }
            
    const draw = (e) => {

      e.preventDefault()  
      if(!isDrawing) return
        
      const mousePos = getMousePos(canvas, e);
      context.lineTo(mousePos.x, mousePos.y)
      context.stroke()
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", finishDrawing);
    canvas.addEventListener("mouseleave", finishDrawing);


    canvas.addEventListener("touchstart", startDrawing)
    canvas.addEventListener("touchmove", draw, {passive: false})
    canvas.addEventListener("touchend", finishDrawing)

    // Cleanup function
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", finishDrawing);
      canvas.removeEventListener("mouseleave", finishDrawing);

      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw, {passive: false})
      canvas.removeEventListener("touchend", finishDrawing)
    };

    }, [isActive, canvasRef,contextRef,isDrawing])
    
  return null
}
