import React, { useEffect, useState } from 'react'

export default function Diamond({canvasRef, contextRef}) {

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
          (canvas.height / rect.height)
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

      if(!initialPos || !isDrawing) return

      const mousePos = getMousePos(canvas, e)



       context.clearRect(0, 0, canvas.width, canvas.height);
   
      
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

    const finishDrawing = (e) => {
    
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
