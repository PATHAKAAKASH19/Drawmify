import React, { useEffect, useState } from 'react'

export default function Arrow({canvasRef, contextRef}) {

  const [isDrawing, setIsDrawing] = useState(false)
  const [initialPos, setInitialPos] = useState(null)


  const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();

    if (evt.touches) {
      return {
        x:
          (evt.touches?.[0]?.clientX - rect.left) * (canvas.width / rect.width),
        y:
          (evt.touches?.[0]?.clientY - rect.top) *
          (canvas.height / rect.height),
      };
    }

    return {
      x: (evt.clientX - rect.left) * (canvas.width / rect.width),
      y: (evt.clientY - rect.top) * (canvas.height / rect.height),
    };
  };
  
  
  useEffect(() => {

     const canvas = canvasRef.current
     const context = contextRef.current

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

     const finishDrawing = (e) =>{
      e.preventDefault()  
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

  }, [canvasRef, contextRef, isDrawing, initialPos])

  return null
}
