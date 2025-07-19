import React, { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos'
import renderAllShapes from '../../utils/renderAllShapes'
import useShapeStore from '../../stores/shapeStore'

export default function Panning({canvasRef, contextRef}) {


 
  const [isPanning , setIsPanning] = useState(false)
  const [offSet, setOffSet] = useState({x:0, y:0})
  const [start, setStart] = useState(null)
 
  const addShapes = useShapeStore((state) => state.addShapes)
  const shapesData = useShapeStore((state) => state.shapesData)

  useEffect(() => {

    const canvas = canvasRef.current
    const context = contextRef.current
    let offsetObj 

    if(!canvas || !context) return


    const startPanning = (e) => {
       setIsPanning(true)
       const mousePos = getMousePos(canvas,e)

       const startX = mousePos?.x - offSet?.x
       const startY = mousePos?.y - offSet?.y
       setStart({x:startX, y:startY})

       
    }

    const panning = (e) => {
        
       if(!isPanning) return

        const mousePos = getMousePos(canvas,e)
     
        const offsetX = mousePos?.x - start?.x
        const offsetY = mousePos?.y - start?.y
        offsetObj = {
          x:offsetX,
          y:offsetY
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(offsetX, offsetY); 
        renderAllShapes(context, shapesData);
        context.restore();
   
    }

    const endPanning = (e) => {
       setIsPanning(false)
       addShapes({shapeName:"panning", ...offsetObj})
       setOffSet(offsetObj)
    }


    canvas.addEventListener("mousedown", startPanning)
    canvas.addEventListener("mousemove", panning)
    canvas.addEventListener("mouseup", endPanning)

    return () => {
      canvas.removeEventListener("mousedown", startPanning)
      canvas.removeEventListener("mousemove", panning)
      canvas.removeEventListener("mouseup", endPanning)
    }
  }, [canvasRef, contextRef,isPanning,addShapes,offSet?.x, offSet?.y,start?.x, start?.y, shapesData])
  return null
}
