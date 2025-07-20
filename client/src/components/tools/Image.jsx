import React, { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos'

export default function Image({canvasRef, contextRef}) {


 const [initialPos, setInitialPos] = useState(null)

  useEffect(() => {



    const canvas = canvasRef.current
    const context = contextRef.current

    if(!canvas || !context) return


    const startImage = (e) => {
       const mousePos = getMousePos(canvas, e)

       setInitialPos(mousePos)
    } 

    const image = (e) => {

    }

    const finishImage = (e) => {

    }

    canvas.addEventListener("mousedown" , startImage)
    canvas.addEventListener("mousemove", image)
    canvas.addEventListener("mouseup" , finishImage)

    canvas.addEventListener("touchstart", startImage)
    canvas.addEventListener("touchmove", image, {passive: false})
    canvas.addEventListener("touchend", finishImage)

    return () => {
       canvas.addEventListener("mousedown" , startImage)
       canvas.addEventListener("mousemove", image)
       canvas.addEventListener("mouseup" , finishImage)

       canvas.removeEventListener("touchstart", startImage)
       canvas.removeEventListener("touchmove", image, {passive: false})
       canvas.removeEventListener("touchend", finishImage)
    }
    

  }, [canvasRef, contextRef])
  return (
    <>
      <input type="file" accept="image/*"  />
    </>
  )
}
