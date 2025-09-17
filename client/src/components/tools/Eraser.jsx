import React, { useEffect, useState } from 'react'
import useShapeStore from '../../stores/shapeStore';
import getMousePos from '../../utils/getMousePos.utils';
import usePanningStore from '../../stores/panningStore';
import checkShapeCollision from '../../utils/checkShapeCollision.utils';
import rough from "roughjs"
import { createPencil } from '../../utils/pencil.utils';
import useScalingStore from "../../stores/scalingStore";

export default function Eraser({canvasRef, contextRef}) {

  const [isEraser, setIsEraser] = useState(false)

  const shapesData = useShapeStore((state) => state.shapesData)
  const removeShape = useShapeStore((state) => state.removeShape)
  const offset = usePanningStore((state) => state.offset)
  const scale = useScalingStore((state) => state.scale);
  const scaleOffset = useScalingStore((state) => state.scaleOffset);
  useEffect(() => {
    
  const canvas = canvasRef.current
  const context = contextRef.current
  const roughCanvas = rough.canvas(canvas)

  if(!canvas || !context) return


    const startEraser = (e) => {
      
      e.preventDefault()
      const mousePos = getMousePos(canvas, e)
      const shape = checkShapeCollision(
        (mousePos.x - offset?.x * scale + scaleOffset.x) / scale,
        (mousePos.y - offset?.y  * scale + scaleOffset.y) / scale,
        shapesData
      );
      if (shape) removeShape(shape.id);
      setIsEraser(true)
    }

    const moveEraser = (e) => {
    
      e.preventDefault()
      if(!isEraser) return

      const mousePos = getMousePos(canvas, e)
      const shape = checkShapeCollision(
        (mousePos.x - offset?.x  * scale + scaleOffset.x) / scale,
        (mousePos.y - offset?.y  * scale + scaleOffset.y) / scale,
        shapesData
      );
    
      if(shape) removeShape(shape.id);
    
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.save();
      context.translate(
        offset?.x * scale - scaleOffset.x,
        offset?.y * scale - scaleOffset.y
      );
      context.scale(scale, scale);
      shapesData.forEach((shape) => {
        if (shape.roughObj) {
          if (shape.shapeName === "arrow") {
            const { arrowline, arrowhead1, arrowhead2 } = shape.roughObj;
            roughCanvas.draw(arrowline);
            roughCanvas.draw(arrowhead1);
            roughCanvas.draw(arrowhead2);
          } else {
            roughCanvas.draw(shape.roughObj);
          }
        }

        if (shape.shapeName === "pencil") {
          createPencil(shape.points, context);
        }
      });

    
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

  }, [canvasRef, contextRef,isEraser,shapesData,removeShape,offset,scale, scaleOffset])
  return null
}
