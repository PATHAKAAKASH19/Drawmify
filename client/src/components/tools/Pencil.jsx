import React, { useEffect, useState } from 'react'

export default function Pencil({canvasRef, contextRef,isActive}) {


    const [isDrawing, setIsDrawing] = useState(false)


     const getMousePos = (canvas, evt) => {
        const rect = canvas.getBoundingClientRect();
    
        if(evt.touches){
           return {
            x: (evt.touches?.[0]?.clientX- rect.left) * (canvas.width / rect.width),
            y:(evt.touches?.[0]?.clientY- rect.top) * (canvas.height / rect.height),
           }
        }
    
          return {
          x: (evt.clientX  - rect.left) * (canvas.width / rect.width),
          y: (evt.clientY - rect.top) * (canvas.height / rect.height)
        };
      
      };
    
    useEffect(() => {


       

    const canvas = canvasRef.current;
    const context = contextRef.current;
 
   

    if (!canvas || !context) {
      console.log('Canvas or context not available');
      return;
    }

    console.log('Setting up pencil event listeners');

      
     const startDrawing = (e) => {
         console.log('Start drawing');
   
        const mousePos = getMousePos(canvas, e);
        context.beginPath()
        context.moveTo(mousePos.x, mousePos.y)
        setIsDrawing(true)
    }
    
    
    const finishDrawing = () => {
          console.log('Finish drawing');
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
      console.log('Cleaning up pencil event listeners');
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseup", finishDrawing);
      canvas.removeEventListener("mouseleave", finishDrawing);
    };

    }, [isActive, canvasRef,contextRef,isDrawing])
    
  return null
}
