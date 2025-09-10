import React, { useEffect, useState } from 'react'
import useShapeStore from '../../stores/shapeStore';
import getMousePos from '../../utils/getMousePos.utils';
import isPointInShape from '../../utils/isPointInShape';
import usePanningStore from '../../stores/panningStore';
import rough from "roughjs"

export default function Eraser({canvasRef, contextRef}) {


  const [isEraser, setIsEraser] = useState(false)

  const shapesData = useShapeStore((state) => state.shapesData)
  const removeShape = useShapeStore((state) => state.removeShape)
  const offset  = usePanningStore((state) =>  state.offset)


  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = contextRef.current
    const roughCanvas = rough.canvas(canvas)

    if(!canvas || !context) return




  const checkShapeCollision = (x, y) => {
    // Check shapes in reverse order (top to bottom in z-index)
    for (let i = shapesData.length - 1; i >= 0; i--) {
      const shape = shapesData[i];
     
      if (isPointInShape(x, y, shape)) {
        return shape.id;
      }
    }
    return null;
  };


    const startEraser = (e) => {

      e.preventDefault()
      const mousePos = getMousePos(canvas, e)
     
      
      const shapeId = checkShapeCollision(mousePos.x - offset?.x, mousePos.y - offset?.y);

      if (shapeId) removeShape(shapeId);
                          
      setIsEraser(true)
    }

    const moveEraser = (e) => {
    
      e.preventDefault()
      if(!isEraser) return

      const mousePos = getMousePos(canvas, e)
      const shapeId = checkShapeCollision(mousePos.x - offset?.x, mousePos.y - offset?.y);
    
     
      if(shapeId){
          removeShape(shapeId);
      }

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.save();
      context.translate(offset?.x, offset?.y);
      shapesData.forEach((shape) => {
         if(shape.roughObj){
            roughCanvas.draw(shape.roughObj)
         }
      })
      context.restore();
    }

    const stopEraser = (e) => {
       e.preventDefault()
       setIsEraser(false)
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

  }, [canvasRef, contextRef,isEraser,shapesData,removeShape,offset])
  return null
}
