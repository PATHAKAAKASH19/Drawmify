import React, { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos'
import renderAllShapes from '../../utils/renderAllShapes'
import useShapeStore from '../../stores/shapeStore'
import usePanningStore from '../../stores/panningStore'

export default function Panning({canvasRef, contextRef}) {
 
  const [isPanning , setIsPanning] = useState(false)

  const [start, setStart] = useState(null)
 
  const shapesData = useShapeStore((state) => state.shapesData)
  const addOffset = usePanningStore((state) =>  state.addOffset)
  const  offset  = usePanningStore((state) =>  state.offset)


  useEffect(() => {

     
    const canvas = canvasRef.current
      const context = contextRef.current

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(offset?.x, offset?.y); 
      renderAllShapes(context, shapesData);
      context.restore();
   
      
  })



  useEffect(() => {

    const canvas = canvasRef.current
    const context = contextRef.current
    let offsetObj 

   
    if(!canvas || !context) return
   
    const startPanning = (e) => {
       e.preventDefault()  
       setIsPanning(true)
       const mousePos = getMousePos(canvas,e)

 
       const startX = mousePos?.x - offset?.x
       const startY = mousePos?.y - offset?.y
       setStart({x:startX, y:startY})
    }

    const panning = (e) => {
        
       e.preventDefault()  
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
       e.preventDefault()  
       setIsPanning(false)
       addOffset({x:offsetObj?.x,y:offsetObj?.y })
    
    }


    canvas.addEventListener("mousedown", startPanning)
    canvas.addEventListener("mousemove", panning)
    canvas.addEventListener("mouseup", endPanning)

    canvas.addEventListener("touchstart", startPanning)
    canvas.addEventListener("touchmove", panning, {passive: false})
    canvas.addEventListener("touchend", endPanning)
  

    return () => {
      canvas.removeEventListener("mousedown", startPanning)
      canvas.removeEventListener("mousemove", panning)
      canvas.removeEventListener("mouseup", endPanning)

      canvas.removeEventListener("touchstart", startPanning)
      canvas.removeEventListener("touchmove", panning, {passive: false})
      canvas.removeEventListener("touchend", endPanning)
    }
  }, [canvasRef, contextRef,isPanning,addOffset,offset?.x, offset?.y,start?.x, start?.y, shapesData])
  return null
}
