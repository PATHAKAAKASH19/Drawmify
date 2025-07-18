import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos'
import createEllipse from '../../utils/createEllipse'
import useShapeStore from "../../stores/shapeStore";
import renderAllShapes from "../../utils/renderAllShapes";

export default function Ellipse({canvasRef, contextRef}) {
 
  const [isDrawing, setIsDrawing] =  useState(false)
  const [initialPos, setInitialPos] = useState(null)
  const [ellipses, setEllipses] = useState([])

  const addShapes = useShapeStore((state) => state.addShapes)
  const shapesData = useShapeStore((state) => state.shapesData)



  useEffect(() => {

   const canvas = canvasRef.current
   const context = contextRef.current

   if(!canvas || !context) return
   
  const startDrawing = (e) =>{
    e.preventDefault() 
    const mousePos = getMousePos(canvas, e)
    setInitialPos(mousePos)
    setIsDrawing(true)
  }
  
  let ellipseObj
   const draw = (e) => {
       
      e.preventDefault() 
      if(!isDrawing || !initialPos) return
      
      const mousePos = getMousePos(canvas, e)
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      if(ellipses.length){
       ellipses.forEach((ellipse) => {
          createEllipse(context, ellipse?.mousePos,ellipse?.initialPos)
       })}
    
     renderAllShapes(context, shapesData)  
     createEllipse(context, mousePos, initialPos)
     
     ellipseObj = {
        initialPos,
        mousePos
      }
    }

   const finishDrawing = (e) => {
      e.preventDefault() 
      setEllipses((prev) =>[...prev,ellipseObj])
      addShapes({ shapeName:"ellipse",...ellipseObj})
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

 }, [canvasRef, contextRef, isDrawing, initialPos,ellipses, addShapes, shapesData])

  return null
}
