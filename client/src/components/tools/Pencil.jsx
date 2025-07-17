import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos';

export default function Pencil({canvasRef, contextRef,isActive}) {
   
  const [isDrawing, setIsDrawing] = useState(false)
  
  useEffect(() => {
   
    const canvas = canvasRef.current;
    const context = contextRef.current;
 
    if (!canvas || !context) return;

    const startDrawing = (e) => {
        const mousePos = getMousePos(canvas, e);
        context.beginPath()
        context.moveTo(mousePos.x, mousePos.y)
        setIsDrawing(true)
    }
    
    const finishDrawing = () => {
        setIsDrawing(false)
        context.closePath()
    }
            
    const move = (e) => {
        if(!isDrawing) return
        
        const mousePos = getMousePos(canvas, e);
        context.lineTo(mousePos.x, mousePos.y)
        context.stroke()
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseup", finishDrawing);
    canvas.addEventListener("mouseleave", finishDrawing);

    // Cleanup function
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseup", finishDrawing);
      canvas.removeEventListener("mouseleave", finishDrawing);
    };

    }, [isActive, canvasRef,contextRef,isDrawing])
    
  return null
}
