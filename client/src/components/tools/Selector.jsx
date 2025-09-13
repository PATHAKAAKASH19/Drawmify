import React, { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos.utils'
import checkShapeCollision from '../../utils/checkShapeCollision.utils'
import useShapeStore from '../../stores/shapeStore'
import usePanningStore from '../../stores/panningStore'
import createShape from '../../utils/createShape.utils'
import rough from "roughjs"
import { createRectangle } from '../../utils/rectangle.utils'

export default function Selector({canvasRef, contextRef}) {

   
   const [isSelected, setIsSelected] = useState(false)
   const [seletedShape, setSelectedShape] = useState(null)
  
  const [initialPos, setInitialPos] = useState(null)
   const shapesData = useShapeStore(state =>  state.shapesData)
   const  offset  = usePanningStore((state) =>  state.offset)
   const updateShape = useShapeStore(state =>  state.updateShape)
 
    
    
   useEffect(() => {

     const canvas = canvasRef.current
     const context = contextRef.current
     const roughCanvas = rough.canvas(canvas)
   
     if(!canvas || ! context) return


     const startDrawing = (e) => {
        e.preventDefault()
        const mousePos = getMousePos(canvas, e)
        const element = checkShapeCollision(mousePos.x- offset.x, mousePos.y - offset.y , shapesData)
        if(element){
          setSelectedShape(element)
          setIsSelected(true)
          e.target.style.cursor = "move"
          setInitialPos(mousePos) 
        }
      }

     const draw = (e) => {
      
      e.preventDefault()
      if(!isSelected || !seletedShape || !initialPos) return
      
      
      const mousePos = getMousePos(canvas, e)
   
   

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.save();
      context.translate(offset?.x, offset?.y); 

      shapesData.forEach((shape) => {

      if(shape.roughObj){
          const {arrowline, arrowhead1, arrowhead2} = shape.roughObj


        if(arrowline && arrowhead1 && arrowhead2){
          roughCanvas.draw(arrowline)
          roughCanvas.draw(arrowhead1)
          roughCanvas.draw(arrowhead2)
        }else{
          roughCanvas.draw(shape.roughObj)
      }}}) 


      
    
     
      context.restore();

         const {id, x1, y1, x2, y2, shapeName} = seletedShape
   
      const dx = (mousePos.x - offset?.x) - (initialPos.x - offset?.x)
      const dy = (mousePos.y - offset?.y) - (initialPos.y - offset?.y)       
     
      const element = createShape(
        x1 + dx ,
        y1 + dy , 
        x2 + dx , 
        y2 + dy , 
        shapeName
      )  
       
      // createRectangle(context, mousePos, initialPos, seletedShape)

      updateShape({id ,...element})
     
  
     
     }

     const finishDrawing = (e) => {
      e.preventDefault()   
      setIsSelected(false)
      setSelectedShape(null)
      e.target.style.cursor = "default"
     }



    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", finishDrawing)

    canvas.addEventListener("touchstart", startDrawing)
    canvas.addEventListener("touchmove", draw, {passive: false})
    canvas.addEventListener("touchend", finishDrawing)

    return () => {

      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", finishDrawing)

      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw, {passive: false})
      canvas.removeEventListener("touchend", finishDrawing)
    }


   }, [canvasRef, contextRef,offset,seletedShape, updateShape,shapesData,isSelected, initialPos])


  return null
}
