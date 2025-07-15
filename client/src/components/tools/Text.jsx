import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Text({canvasRef, contextRef}) {
  
  const [text, setText] = useState("")
  const [initialPos, setInitialPos] = useState(null)
 const inputRef = useRef(null)



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
  





  useEffect(() =>{
    
    const canvas = canvasRef.current
    const context = contextRef.current

    if(!canvas|| !context) return

  
     const handleText = (e) => {
      const mousePos = getMousePos(canvas, e)
      setInitialPos(mousePos)
      setText("")
      context.font = "24px sans-serif";
      context.fillText(text, initialPos?.x, initialPos?.y )
    }
     
     
     
     canvas.addEventListener("click" , handleText)
     return () => {
      canvas.removeEventListener("click", handleText)
     
    }
  }, [canvasRef,text, contextRef,initialPos])



   useEffect(() => {
    if (initialPos && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.border-0
    
    }
  }, [initialPos])
  return (
    <>
    {( initialPos !== null)&& 
    <input 
    ref={inputRef}
    type='text' 
    value={text} 
    onChange={(e) => {setText(e.target.value)}} 
    className={`absolute text-2xl px-4 font-sans`} 
    style={{
      top: `${initialPos?.y}px`,  
      left: `${initialPos?.x}px`,
      transform: 'translate(-10%, -50%)',
      border:`0px`,
      outline:"none",
      
    }}/>
    }
  </>
  )
}
