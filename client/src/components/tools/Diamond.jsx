import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos.utils'
import {createDiamond} from '../../utils/diamond.utils'
import useShapeStore from "../../stores/shapeStore";
import renderAllShapes from "../../utils/renderAllShapes.utils";
import usePanningStore from '../../stores/panningStore';


export default function Diamond({canvasRef, contextRef}) {

  const [isDrawing, setIsDrawing] = useState(false)
  const [initialPos, setInitialPos] = useState(null)


  const addShapes = useShapeStore((state) => state.addShapes)
  const shapesData = useShapeStore((state) => state.shapesData)
  const  offset  = usePanningStore((state) =>  state.offset)





  useEffect(() => {
   
    const canvas = canvasRef.current
    const context = contextRef.current
    let diamondObj
    
    if(!canvas || !context) return

    const startDrawing = (e) => {
      e.preventDefault()  
      const mousePos = getMousePos(canvas, e)
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
      renderAllShapes(context, shapesData)
      context.restore();
      createDiamond(context, mousePos, initialPos)
    
       if(offset){

      diamondObj = {
        initialPos:{
          x:initialPos.x - offset.x,
          y:initialPos.y - offset.y
        },
        mousePos:{
          x:mousePos.x - offset.x,
          y:mousePos.y - offset.y
        }
      }}else{
        diamondObj = {
          initialPos,
          mousePos
        }
       }
    }


    const finishDrawing = (e) => {
      e.preventDefault()  
      addShapes({ shapeName:"diamond",...diamondObj})
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
