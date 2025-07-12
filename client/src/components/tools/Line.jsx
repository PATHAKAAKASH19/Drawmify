import React, { useEffect, useState } from 'react'

export default function Line({canvasRef, contextRef}) {


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

    if(!canvas || !context) return

    const startDrawing = (e) => {
        
      const mousePos = getMousePos(canvas, e)
       
    
      setInitialPos(mousePos)
      setIsDrawing(true)


    }

    const draw = (e) => {
      
      if(!isDrawing || !initialPos) return
      console.log("aa")
      const mousePos = getMousePos(canvas, e)

      context.clearRect(0, 0, canvas.width, canvas.height)

       context.beginPath()
       context.moveTo(initialPos.x, initialPos.y )
   
      context.lineTo(mousePos.x,mousePos.y)
      context.stroke()
    }

    const finishDrawing = () => {
      console.log("akak")
       setIsDrawing(false)
    }

    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", finishDrawing)

    return () => {
      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", finishDrawing)
    }
  }, [canvasRef, contextRef, isDrawing, initialPos])
  
  return null
}
