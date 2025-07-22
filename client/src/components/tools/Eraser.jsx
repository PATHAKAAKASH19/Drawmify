import React, { useEffect, useState } from 'react'
import useShapeStore from '../../stores/shapeStore';
import renderAllShapes from '../../utils/renderAllShapes.utils';
import getMousePos from '../../utils/getMousePos.utils';

export default function Eraser({canvasRef, contextRef}) {


  const [isEraser, setIsEraser] = useState(false)

  const shapesData = useShapeStore((state) => state.shapesData)




  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = contextRef.current

    if(!canvas || !context) return


  function pointInRect(x, y, initialPos, mousePos) {

    console.log(initialPos)
    console.log(mousePos)
    console.log(x, y)
  // Calculate width and height (can be positive or negative)
  const width = mousePos.x - initialPos.x;
  const height = mousePos.y - initialPos.y;
  
  // Determine the actual boundaries of the rectangle
  const left = Math.min(initialPos.x, initialPos.x + width);
  const right = Math.max(initialPos.x, initialPos.x + width);
  const top = Math.min(initialPos.y, initialPos.y + height);
  const bottom = Math.max(initialPos.y, initialPos.y + height);
  
  // Check if point is within boundaries
  return x >= left || x <= right || y >= top || y <= bottom;
}

  const checkShapeCollision = (x, y, context) => {

    for (let index = 0; index < shapesData.length; index++) {
      console.log(index)
       const shapes = shapesData[index]
        let isHit =false

        if(shapes.shapeName === "rectangle"){
          isHit = pointInRect(x, y , shapes.initialPos, shapes.mousePos)
          console.log(isHit)
        }
      
         
      if (isHit) {
         console.log(shapesData.splice(index, 1)); // Remove shape from array
         console.log(shapesData)  
          context.clearRect(0, 0 , canvas.width, canvas.height)
         renderAllShapes(context, shapesData)
         break; // Remove just one shape per check (or remove this to erase multiple)
      }
    }

  }


    const startEraser = (e) => {

      e.preventDefault()
      const mousePos = getMousePos(canvas, e)
      setIsEraser(true)
      checkShapeCollision(mousePos.x, mousePos.y, context)

    }

    const moveEraser = (e) => {
       e.preventDefault()
       if(!isEraser) return

       const mousePos = getMousePos(canvas, e)
       checkShapeCollision(mousePos.x, mousePos.y, context)
    }

    const stopEraser = (e) => {
       e.preventDefault()
       setIsEraser(true)
    }

    canvas.addEventListener("mousedown" , startEraser)
    canvas.addEventListener("mousemove", moveEraser)
    canvas.addEventListener("mouseup" , stopEraser)

     canvas.addEventListener("touchstart", startEraser)
    canvas.addEventListener("touchmove", moveEraser, {passive: false})
    canvas.addEventListener("touchend", startEraser)

    return () => {
     canvas.removeEventListener("mousedown" , startEraser)
     canvas.removeEventListener("mousemove", moveEraser)
     canvas.removeEventListener("mouseup" , stopEraser)

     canvas.removeEventListener("touchstart", startEraser)
     canvas.removeEventListener("touchmove", moveEraser, {passive: false})
     canvas.removeEventListener("touchend", startEraser)
    }

  }, [canvasRef, contextRef,isEraser,shapesData])
  return null
}
