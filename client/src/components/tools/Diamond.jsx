import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos.utils'
import useShapeStore from "../../stores/shapeStore";
import usePanningStore from '../../stores/panningStore';
import rough from "roughjs"
import createShape from '../../utils/createShape.utils';

export default function Diamond({canvasRef, contextRef}) {

  const [isDrawing, setIsDrawing] = useState(false)
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

    const startDrawing = (e) => {
      e.preventDefault()  
      const mousePos = getMousePos(canvas, e)
      element = createShape(mousePos.x, mousePos.y, mousePos.x, mousePos.y, "diamond")
      roughCanvas.draw(element.roughObj)
      setInitialPos(mousePos)
      setIsDrawing(true)
    }

    const draw = (e) => {
      
      e.preventDefault()  
      if(!initialPos || !isDrawing) return

      const mousePos = getMousePos(canvas, e)
      context.clearRect(0, 0, canvas.width, canvas.height);
    
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
        }
           }
       }) 
 
      element = createShape(
        initialPos.x - offset?.x, 
        initialPos.y - offset?.y, 
        mousePos.x - offset?.x, 
        mousePos.y - offset?.y, 
        "diamond"
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
      canvas.removeEventListener("mouseup", finishDrawing)

      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw, {passive: false})
      canvas.removeEventListener("touchend", finishDrawing)
    }

  }, [canvasRef, contextRef, isDrawing, initialPos,offset,addShapes,shapesData])


  return null
}
