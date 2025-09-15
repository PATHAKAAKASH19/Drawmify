import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos.utils'
import useShapeStore from "../../stores/shapeStore";
import usePanningStore from '../../stores/panningStore';
import createShape from '../../utils/createShape.utils';
import rough from "roughjs"
import { createPencil } from '../../utils/pencil.utils';

export default function Ellipse({canvasRef, contextRef}) {
 
  const [isDrawing, setIsDrawing] =  useState(false)
  const [initialPos, setInitialPos] = useState(null)
  
  const addShapes = useShapeStore((state) => state.addShapes)
  const shapesData = useShapeStore((state) => state.shapesData)
  const  offset  = usePanningStore((state) =>  state.offset)

  useEffect(() => {

   const canvas = canvasRef.current
   const context = contextRef.current
   const roughCanvas = rough.canvas(canvas)
   let element

   if(!canvas || !context) return
   
  const startDrawing = (e) =>{
    e.preventDefault() 
    const mousePos = getMousePos(canvas, e)
    setInitialPos(mousePos)
    setIsDrawing(true)
  }

  const draw = (e) => {
       
      e.preventDefault() 
      if(!isDrawing || !initialPos) return
      
      const mousePos = getMousePos(canvas, e)
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(offset?.x, offset?.y); 
      
      
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

 
      element = createShape(
        initialPos.x -offset.x, 
        initialPos.y -offset.y,
        mousePos.x -  offset.x,
        mousePos.y - offset.y,
        "ellipse"
      )

      roughCanvas.draw(element.roughObj)
      context.restore();

   }

   const finishDrawing = (e) => {
      e.preventDefault() 
      addShapes(element)
      setIsDrawing(false)
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
    canvas.removeEventListener("mouseup" , finishDrawing)

    canvas.removeEventListener("touchstart", startDrawing)
    canvas.removeEventListener("touchmove", draw, {passive: false})
    canvas.removeEventListener("touchend", finishDrawing)
  }

 }, [canvasRef, contextRef, isDrawing, offset, initialPos, addShapes, shapesData])

  return null
}
