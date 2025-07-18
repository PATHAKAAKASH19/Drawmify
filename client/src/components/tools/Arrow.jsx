import { useEffect, useState } from 'react'
import getMousePos from '../../utils/getMousePos'
import createArrow from '../../utils/createArrow'
import useShapeStore from "../../stores/shapeStore";
import renderAllShapes from "../../utils/renderAllShapes";

export default function Arrow({canvasRef, contextRef}) {

  const [isDrawing, setIsDrawing] = useState(false)
  const [initialPos, setInitialPos] = useState(null)
  const [arrows, setArrows] = useState([])


  const addShapes = useShapeStore((state) => state.addShapes)
  const shapesData = useShapeStore((state) => state.shapesData)



  useEffect(() => {

     const canvas = canvasRef.current
     const context = contextRef.current
     let arrowObj

     if(!canvas || ! context) return

     const startDrawing = (e) => {
        e.preventDefault()
        setIsDrawing(true)
        const mousePos = getMousePos(canvas, e)
        setInitialPos(mousePos)
      }

      const draw = (e) => {
        if(!isDrawing || !initialPos) return
         
        e.preventDefault()
        context.clearRect(0, 0, canvas.width, canvas.height);
        const mousePos = getMousePos(canvas, e)

        if(arrows.length){
         arrows.forEach(element => createArrow(context, element.mousePos, element.initialPos));
        }


        renderAllShapes(context, shapesData)  
        createArrow(context, mousePos, initialPos)
        
        arrowObj = {
          initialPos,
          mousePos
         }
     }

     const finishDrawing = (e) =>{
      e.preventDefault()  
      setArrows(prev=>[...prev, arrowObj])
      addShapes({ shapeName:"arrow",...arrowObj})
      setIsDrawing(false)
     }

     // handle mouse event
     canvas.addEventListener("mousedown", startDrawing)
     canvas.addEventListener("mousemove", draw)
     canvas.addEventListener("mouseup", finishDrawing)
      
     // handle touch event
     canvas.addEventListener("touchstart", startDrawing)
     canvas.addEventListener("touchmove", draw, {passive: false})
     canvas.addEventListener("touchend", finishDrawing)


   return () => {
      // mouse event
      canvas.removeEventListener("mousedown", startDrawing)
      canvas.removeEventListener("mousemove", draw)
      canvas.removeEventListener("mouseup", finishDrawing)
      
      // touch event
      canvas.removeEventListener("touchstart", startDrawing)
      canvas.removeEventListener("touchmove", draw, {passive: false})
      canvas.removeEventListener("touchend", finishDrawing)
   }

  }, [canvasRef, contextRef, isDrawing, initialPos,arrows, addShapes,shapesData])

  return null
}
