import React, { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos.utils'
import useShapeStore from '../../stores/shapeStore'
import usePanningStore from '../../stores/panningStore'
import rough from "roughjs"
import { createPencil } from '../../utils/pencil.utils';

export default function Panning({canvasRef, contextRef}) {
 
  const [isPanning , setIsPanning] = useState(false)
  const [start, setStart] = useState(null)
 
  const shapesData = useShapeStore((state) => state.shapesData)
  const addOffset = usePanningStore((state) =>  state.addOffset)
  const  offset  = usePanningStore((state) =>  state.offset)


  useEffect(() => {

    const canvas = canvasRef.current
    const context = contextRef.current
    const roughCanvas = rough.canvas(canvas)
    let offsetObj = null

   
    if(!canvas || !context) return
   
    const startPanning = (e) => {
       e.preventDefault()  
       const mousePos = getMousePos(canvas,e)
       const startX = mousePos?.x - offset?.x
       const startY = mousePos?.y - offset?.y
       setStart({x:startX, y:startY})
       setIsPanning(true)
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

        
      shapesData.forEach((shape) =>{
           if(shape.roughObj){
          
        if(shape.shapeName === "arrow"){
          const { arrowline,arrowhead1, arrowhead2} = shape.roughObj
          roughCanvas.draw(arrowline)
          roughCanvas.draw(arrowhead1)
          roughCanvas.draw(arrowhead2)
        }else {
           roughCanvas.draw(shape.roughObj)
        }}
    
        if(shape.shapeName === "pencil"){
          createPencil(shape.points, context)
        }})


        context.restore();
   
    }

    const endPanning = (e) => {
       e.preventDefault()  
       setIsPanning(false)
     
       if(offsetObj !== null){
         addOffset({x:offsetObj?.x,y:offsetObj?.y })
       }
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
